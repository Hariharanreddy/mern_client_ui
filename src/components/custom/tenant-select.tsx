'use client';
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tenant } from '@/lib/types';
import { useRouter, useSearchParams } from 'next/navigation';

const TenantSelect = ({ restaurants }: { restaurants: { data: Tenant[] } }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentValue = searchParams.get('tenantId') || searchParams.get('restaurantId') || '';

    const handleValueChange = (value: string) => {
        router.push(`/?tenantId=${value}`);
    };
    return (
        <Select
            onValueChange={handleValueChange}
            value={currentValue}>
            <SelectTrigger className="w-[180px] focus:ring-0">
                <SelectValue placeholder="Select Boutique" />
            </SelectTrigger>
            <SelectContent>
                {restaurants.data.map((restaurant) => {
                    return (
                        <SelectItem key={restaurant.id} value={String(restaurant.id)}>
                            {restaurant.name}
                        </SelectItem>
                    );
                })}
            </SelectContent>
        </Select>
    );
};

export default TenantSelect;
