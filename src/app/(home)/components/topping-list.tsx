import React, { useEffect, useState } from 'react';
import ToppingCard from './topping-card';
import { Topping } from '@/lib/types';
import { useSearchParams } from 'next/navigation';

const ToppingList = ({
    selectedToppings,
    handleCheckBoxCheck,
}: {
    selectedToppings: Topping[];
    handleCheckBoxCheck: (topping: Topping) => void;
}) => {
    const searchParams = useSearchParams();
    const [toppings, setToppings] = useState<Topping[]>([]);
    
    useEffect(() => {
        const fetchData = async () => {
            const tenantId = searchParams.get('tenantId') || searchParams.get('restaurantId') || '';
            const toppingResponse = await fetch(
                `${
                    process.env.NEXT_PUBLIC_BACKEND_URL
                }/api/catalog/toppings?tenantId=${tenantId}`
            );
            const toppingsData = await toppingResponse.json();
            setToppings(toppingsData);
        };
        fetchData();
    }, [searchParams]);

    return (
        <section className="mt-6">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Custom Add-ons & Premium Wraps</h4>
            <div className="grid grid-cols-3 gap-3 mt-2">
                {toppings.map((topping) => {
                    return (
                        <ToppingCard
                            topping={topping}
                            key={topping.id}
                            selectedToppings={selectedToppings}
                            handleCheckBoxCheck={handleCheckBoxCheck}
                        />
                    );
                })}
            </div>
        </section>
    );
};

export default ToppingList;
