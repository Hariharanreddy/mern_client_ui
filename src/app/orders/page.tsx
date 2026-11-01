'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Order } from '@/lib/types';
import { getMyOrders } from '@/lib/http/api';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';
import { Eye, Gift, ShoppingBag, Calendar, ArrowRight, Loader2, AlertCircle, RefreshCw } from 'lucide-react';

const Orders = () => {
    const {
        data: orders = [],
        isLoading,
        isError,
        error,
        refetch,
        isFetching,
    } = useQuery<Order[]>({
        queryKey: ['my-orders'],
        queryFn: async () => {
            const res = await getMyOrders();
            return res.data || [];
        },
        refetchInterval: 1000 * 15, // poll every 15 seconds to reflect latest changes
        refetchOnWindowFocus: true, // auto-sync when returning to tab
    });

    const getPaymentBadge = (status?: string) => {
        const normalized = (status || '').toUpperCase();
        if (normalized === 'PAID') {
            return (
                <Badge className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 hover:bg-emerald-500/15 transition-all rounded-full font-bold">
                    PAID
                </Badge>
            );
        } else if (normalized === 'PENDING') {
            return (
                <Badge className="bg-amber-500/10 text-amber-600 border border-amber-500/20 hover:bg-amber-500/15 transition-all rounded-full font-bold">
                    PENDING
                </Badge>
            );
        } else {
            return (
                <Badge className="bg-rose-500/10 text-rose-600 border border-rose-500/20 hover:bg-rose-500/15 transition-all rounded-full font-bold">
                    {normalized || 'UNKNOWN'}
                </Badge>
            );
        }
    };

    const getStatusBadge = (status?: string) => {
        const normalized = (status || '').toUpperCase();
        if (normalized === 'DELIVERED') {
            return (
                <Badge className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 hover:bg-emerald-500/15 transition-all rounded-full font-bold">
                    DELIVERED
                </Badge>
            );
        } else if (normalized === 'CONFIRMED') {
            return (
                <Badge className="bg-violet-500/10 text-violet-600 border border-violet-500/20 hover:bg-violet-500/15 transition-all rounded-full font-bold">
                    CONFIRMED
                </Badge>
            );
        } else if (
            normalized === 'PREPARING' ||
            normalized === 'CURATING' ||
            normalized === 'COOKING' ||
            normalized === 'PREPARED'
        ) {
            return (
                <Badge className="bg-indigo-500/10 text-indigo-600 border border-indigo-500/20 hover:bg-indigo-500/15 transition-all rounded-full font-bold animate-pulse">
                    {normalized}
                </Badge>
            );
        } else if (normalized === 'OUT_FOR_DELIVER' || normalized === 'OUT_FOR_DELIVERY') {
            return (
                <Badge className="bg-cyan-500/10 text-cyan-600 border border-cyan-500/20 hover:bg-cyan-500/15 transition-all rounded-full font-bold animate-pulse">
                    OUT FOR DELIVERY
                </Badge>
            );
        } else {
            return (
                <Badge className="bg-slate-500/10 text-slate-600 border border-slate-500/20 hover:bg-slate-500/15 transition-all rounded-full font-bold">
                    {normalized || 'RECEIVED'}
                </Badge>
            );
        }
    };

    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            });
        } catch (_) {
            return dateString;
        }
    };

    return (
        <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">Purchase History</span>
                    <h1 className="text-3xl font-extrabold tracking-tight text-foreground mt-1">My Orders</h1>
                    <p className="text-sm text-muted-foreground mt-1">Manage and track your luxury gift curate history.</p>
                </div>
                <div className="flex items-center gap-3 self-start md:self-auto">
                    {isFetching && !isLoading && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-muted/40 rounded-full border border-border/60 text-xs font-medium text-muted-foreground">
                            <RefreshCw className="w-3 h-3 animate-spin text-primary" />
                            <span>Updating live...</span>
                        </div>
                    )}
                    {orders.length > 0 && (
                        <div className="bg-card px-4 py-2 border border-border/80 rounded-2xl flex items-center gap-2.5 shadow-sm shadow-black/5">
                            <ShoppingBag className="w-4 h-4 text-primary" />
                            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                Total Orders: <span className="text-foreground font-black ml-1">{orders.length}</span>
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {isLoading ? (
                <Card className="border border-border/60 bg-card/60 backdrop-blur-md rounded-2xl shadow-xl py-24 px-6 text-center">
                    <CardContent className="flex flex-col items-center justify-center space-y-4">
                        <Loader2 className="w-10 h-10 animate-spin text-primary" />
                        <p className="text-sm font-medium text-muted-foreground">Loading your orders...</p>
                    </CardContent>
                </Card>
            ) : isError ? (
                <Card className="border border-destructive/20 bg-destructive/5 rounded-2xl shadow-lg py-16 px-6 text-center">
                    <CardContent className="max-w-md mx-auto space-y-4">
                        <AlertCircle className="w-12 h-12 text-destructive mx-auto" />
                        <h2 className="text-xl font-bold text-foreground">Failed to Load Orders</h2>
                        <p className="text-sm text-muted-foreground">
                            {(error as Error)?.message || 'An error occurred while fetching your orders. Please try again.'}
                        </p>
                        <Button onClick={() => refetch()} variant="outline" className="rounded-full gap-2 font-bold">
                            <RefreshCw className="w-4 h-4" />
                            Retry
                        </Button>
                    </CardContent>
                </Card>
            ) : orders.length === 0 ? (
                <Card className="border border-border/60 bg-card/60 backdrop-blur-md rounded-2xl shadow-xl py-16 px-6 text-center transition-all duration-300">
                    <CardContent className="max-w-md mx-auto space-y-6">
                        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto shadow-inner transition-transform duration-500 hover:scale-110">
                            <Gift className="w-8 h-8" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">No Orders Placed Yet</h2>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                It looks like you haven&apos;t placed any orders yet. Discover our exclusive curated hampers and start sharing joy today!
                            </p>
                        </div>
                        <Button asChild className="rounded-full px-8 py-6 font-bold shadow-lg shadow-primary/25 hover:shadow-primary/35 transition-all duration-300 transform hover:-translate-y-0.5">
                            <Link href="/">
                                <span>Start Curating Gifts</span>
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <Card className="border border-border/80 bg-card/60 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden transition-all duration-300">
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader className="bg-muted/30">
                                <TableRow className="border-b border-border/80 hover:bg-transparent">
                                    <TableHead className="font-bold py-4 px-6 text-muted-foreground text-xs uppercase tracking-wider">Order ID</TableHead>
                                    <TableHead className="font-bold py-4 text-muted-foreground text-xs uppercase tracking-wider">Date & Time</TableHead>
                                    <TableHead className="font-bold py-4 text-muted-foreground text-xs uppercase tracking-wider">Payment Status</TableHead>
                                    <TableHead className="font-bold py-4 text-muted-foreground text-xs uppercase tracking-wider">Payment Method</TableHead>
                                    <TableHead className="font-bold py-4 text-muted-foreground text-xs uppercase tracking-wider">Order Status</TableHead>
                                    <TableHead className="font-bold py-4 text-muted-foreground text-xs uppercase tracking-wider">Amount</TableHead>
                                    <TableHead className="font-bold py-4 px-6 text-right text-muted-foreground text-xs uppercase tracking-wider">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orders.map((order: Order) => {
                                    return (
                                        <TableRow key={order._id} className="border-b border-border/60 hover:bg-muted/10 transition-colors">
                                            <TableCell className="font-mono text-xs font-semibold py-4 px-6 text-muted-foreground">
                                                #{order._id.substring(0, 8)}...
                                            </TableCell>
                                            <TableCell className="text-sm text-foreground font-medium py-4">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-3.5 h-3.5 text-muted-foreground/60" />
                                                    <span>{formatDate(order.createdAt)}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-4">
                                                {getPaymentBadge(order.paymentStatus)}
                                            </TableCell>
                                            <TableCell className="text-sm font-semibold text-muted-foreground py-4">
                                                {order.paymentMode}
                                            </TableCell>
                                            <TableCell className="py-4">
                                                {getStatusBadge(order.orderStatus)}
                                            </TableCell>
                                            <TableCell className="text-sm font-black text-foreground py-4">
                                                ₹{order.total}
                                            </TableCell>
                                            <TableCell className="text-right py-4 px-6">
                                                <Button size="sm" variant="outline" asChild className="rounded-full h-8 px-4 border-primary/20 hover:border-primary hover:bg-primary/5 text-primary hover:text-primary transition-all duration-300 font-bold text-xs gap-1.5 shadow-sm">
                                                    <Link href={`/order/${order._id}`}>
                                                        <Eye className="w-3.5 h-3.5" />
                                                        <span>View Details</span>
                                                    </Link>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default Orders;
