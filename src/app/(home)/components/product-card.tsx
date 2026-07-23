'use client';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Product } from '@/lib/types';
import ProductModal from './product-modal';
import { getFromPrice } from '@/lib/utils';

type PropTypes = { product: Product };

const ProductCard = ({ product }: PropTypes) => {
    const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
    const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setZoomPos({ x, y });
        setMouseCoords({ x: e.clientX, y: e.clientY });
    };

    const zoomBoxLeft = typeof window !== 'undefined' && mouseCoords.x > window.innerWidth / 2 
        ? mouseCoords.x - 370 
        : mouseCoords.x + 20;

    const zoomBoxTop = typeof window !== 'undefined'
        ? Math.max(20, Math.min(mouseCoords.y - 240, window.innerHeight - 370))
        : mouseCoords.y - 240;

    return (
        <>
            <Card className="glass-panel glass-card-hover rounded-2xl overflow-hidden flex flex-col h-full border border-border">
                <CardHeader
                    className="relative p-0 overflow-hidden bg-white border-b border-border/40 w-full h-[220px] cursor-zoom-in"
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    <div className="relative w-full h-full overflow-hidden bg-white">
                        <Image
                            alt="gift-image"
                            fill
                            src={product.image}
                            className="object-cover mix-blend-multiply"
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

            {isHovering && typeof document !== 'undefined' && createPortal(
                <div 
                    className="fixed z-[99999] w-[350px] h-[350px] bg-background border-2 border-primary/20 rounded-2xl shadow-2xl overflow-hidden pointer-events-none transition-opacity duration-200"
                    style={{
                        left: `${zoomBoxLeft}px`,
                        top: `${zoomBoxTop}px`,
                    }}
                >
                    <div className="relative w-full h-full">
                        <img 
                            src={product.image} 
                            alt="zoomed-preview"
                            className="absolute object-cover w-[250%] h-[250%] max-w-none max-h-none mix-blend-multiply"
                            style={{
                                left: `${-zoomPos.x * 1.5}%`,
                                top: `${-zoomPos.y * 1.5}%`,
                            }}
                        />
                    </div>
                </div>,
                document.body
            )}
        </>
    );
};

export default ProductCard;
