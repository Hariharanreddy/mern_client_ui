import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import React from 'react';
import { Product } from '@/lib/types';
import ProductModal from './product-modal';
import { getFromPrice } from '@/lib/utils';

type PropTypes = { product: Product };

const ProductCard = ({ product }: PropTypes) => {
    return (
        <Card className="glass-panel glass-card-hover rounded-2xl overflow-hidden flex flex-col h-full border border-border">
            <CardHeader className="flex items-center justify-center p-0 overflow-hidden bg-muted/25 border-b border-border/40">
                <div className="relative w-full h-[180px] flex items-center justify-center p-4">
                    <Image 
                        alt="gift-image" 
                        width={150} 
                        height={150} 
                        src={product.image} 
                        className="object-contain max-h-[150px] w-auto transition-transform duration-500 ease-out hover:scale-108"
                    />
                </div>
            </CardHeader>
            <CardContent className="p-5 flex-grow">
                <h2 className="text-lg font-bold text-foreground tracking-tight line-clamp-1 transition-colors duration-300">{product.name}</h2>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-2 transition-colors duration-300">{product.description}</p>
            </CardContent>
            <CardFooter className="p-5 pt-0 flex items-center justify-between border-t border-border mt-auto pt-4 transition-colors duration-300">
                <div className="text-sm text-foreground transition-colors duration-300">
                    <span className="text-xs text-muted-foreground transition-colors duration-300">From </span>
                    <span className="font-bold text-primary text-base">₹{getFromPrice(product)}</span>
                </div>

                <ProductModal product={product} />
            </CardFooter>
        </Card>
    );
};

export default ProductCard;
