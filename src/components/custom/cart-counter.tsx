'use client';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { ShoppingBasket } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const CartCounter = () => {
    const searchParams = useSearchParams();
    const cartItems = useAppSelector((state) => state.cart.cartItems);

    return (
        <>
            <div className="relative mr-3">
                <Link href={`/cart?tenantId=${searchParams.get('tenantId') || searchParams.get('restaurantId') || ''}`}>
                    <ShoppingBasket className="hover:text-primary transition-colors text-foreground" />
                </Link>
                <span className="absolute -top-3.5 -right-3 h-5 w-5 text-[10px] flex items-center justify-center rounded-full bg-primary font-bold text-white shadow-sm border border-background">
                    {cartItems.length}
                </span>
            </div>
        </>
    );
};

export default CartCounter;
