'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import React from 'react';
import { cn } from '@/lib/utils';
import { CircleCheck } from 'lucide-react';
import { Topping } from '@/lib/types';

type PropType = {
    topping: Topping;
    selectedToppings: Topping[];
    handleCheckBoxCheck: (topping: Topping) => void;
};

const ToppingCard = ({ topping, selectedToppings, handleCheckBoxCheck }: PropType) => {
    const isCurrentSelected = selectedToppings.some((element) => element.id === topping.id);

    return (
        <Button
            onClick={() => handleCheckBoxCheck(topping)}
            variant={'outline'}
            className={cn(
                'flex flex-col h-auto py-3 px-4 relative rounded-xl border border-border bg-card hover:bg-accent transition-all duration-200 text-muted-foreground hover:text-foreground',
                isCurrentSelected ? 'border-primary bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary' : ''
            )}>
            <div className="relative w-12 h-12 flex items-center justify-center mb-1">
                <Image 
                    src={topping.image} 
                    width={48} 
                    height={48} 
                    alt={topping.name} 
                    className="object-contain max-h-12 w-auto transition-transform duration-300 hover:scale-108"
                />
            </div>
            <h5 className="text-xs font-semibold tracking-tight leading-none">{topping.name}</h5>
            <p className="text-[10px] text-muted-foreground mt-1">&#8377;{topping.price}</p>
            {isCurrentSelected && <CircleCheck className="absolute top-1.5 right-1.5 w-3.5 h-3.5 text-primary" />}
        </Button>
    );
};

export default ToppingCard;
