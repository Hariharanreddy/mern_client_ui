import React from 'react';
import Image from 'next/image';
import QtyChanger from './qtyChanger';
import { changeQty, CartItem as Item } from '@/lib/store/features/cart/cartSlice';
import { X } from 'lucide-react';
import { useAppDispatch } from '@/lib/store/hooks';
import { useTotal } from '@/lib/hooks/useTotal';

const CartItem = ({ item }: { item: Item }) => {
    const dispatch = useAppDispatch();
    const total = useTotal(item);

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 items-center gap-4">
                <div className="flex items-center w-full">
                    <div className="relative w-20 h-20 bg-muted/20 rounded-xl flex items-center justify-center p-2 border border-border transition-colors duration-300">
                        <Image src={item.image} width={80} height={80} alt={item.name} className="object-contain max-h-16 w-auto" />
                    </div>
                    <div className="ml-6 flex-grow">
                        <h2 className="font-bold text-foreground text-base tracking-tight transition-colors duration-300">{item.name}</h2>
                        <h3 className="text-xs text-muted-foreground font-medium mt-1 transition-colors duration-300">
                            {Object.values(item.chosenConfiguration.priceConfiguration)
                                .map((value) => value)
                                .join(', ')}
                        </h3>
                        {item.chosenConfiguration.selectedToppings.length > 0 && (
                            <h3 className="text-[10px] text-muted-foreground/80 italic mt-0.5 transition-colors duration-300">
                                + {item.chosenConfiguration.selectedToppings
                                    .map((topping) => topping.name)
                                    .join(', ')}
                            </h3>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-6 justify-end">
                    <QtyChanger
                        handleQtyChange={(data) => {
                            dispatch(changeQty({ hash: item.hash as string, qty: data }));
                        }}>
                        {item.qty}
                    </QtyChanger>
                    <div className="flex items-center">
                        <div className="font-black text-foreground text-lg w-20 text-right transition-colors duration-300">&#8377;{total * item.qty}</div>
                        <button
                            className="ml-6 text-muted-foreground hover:text-rose-500 transition-colors focus:outline-none"
                            onClick={() => {
                                dispatch(changeQty({ hash: item.hash as string, qty: 0 }));
                            }}>
                            <X size={18} />
                        </button>
                    </div>
                </div>
            </div>
            <div className="h-px bg-border my-4 transition-colors duration-300" />
        </div>
    );
};

export default CartItem;
