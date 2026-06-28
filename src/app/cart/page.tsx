import React from 'react';
import CartItems from './cartItems/cartItems';

const CartPage = () => {
    return (
        <section className="relative py-12 bg-transparent z-10">
            <div className="container mx-auto">
                <h1 className="text-3xl font-black tracking-tight text-white">Shopping Cart</h1>
                <div className="glass-panel rounded-2xl p-8 mt-6 border border-white/5 bg-slate-950/30 shadow-2xl">
                    <CartItems />
                </div>
            </div>
        </section>
    );
};

export default CartPage;
