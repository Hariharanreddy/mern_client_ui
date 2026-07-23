'use client';
import React, { useEffect } from 'react';
import CartItem from './cartItem';
import Link from 'next/link';
import { useAppSelector } from '@/lib/store/hooks';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { getItemTotal } from '@/lib/utils';

const CartItems = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const tenantId = searchParams.get('tenantId') || searchParams.get('restaurantId') || '';

    const [isClient, setIsClient] = React.useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);
    const cart = useAppSelector((state) => state.cart.cartItems);

    const finalTotal = React.useMemo(() => {
        return cart.reduce((acc, curr) => {
            return acc + curr.qty * getItemTotal(curr);
        }, 0);
    }, [cart]);

    if (!isClient) {
        return null;
    }

    if (!cart.length) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center mb-4">
                    <ShoppingCart className="w-8 h-8 text-primary" />
                </div>
                <p className="text-slate-400 text-lg font-medium">Your shopping cart is empty!</p>
                <Link
                    className="text-primary hover:underline transition-colors mt-2 text-sm font-semibold"
                    href={`/?tenantId=${tenantId}`}>
                    Continue shopping?
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="space-y-1">
                {cart.map((cartItem) => (
                    <CartItem key={cartItem.hash} item={cartItem} />
                ))}
            </div>
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/5">
                <div className="flex flex-col">
                    <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Total Amount</span>
                    <span className="font-black text-2xl text-primary">&#8377;{finalTotal}</span>
                </div>
                <Button
                    className="rounded-full px-8 py-6 font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-0.5"
                    onClick={() =>
                        router.push(`/checkout/?tenantId=${tenantId}`)
                    }>
                    <span>Proceed to Checkout</span>
                    <ArrowRight size={18} className="ml-2" />
                </Button>
            </div>
        </div>
    );
};

export default CartItems;
