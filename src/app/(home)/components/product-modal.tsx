'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { createPortal } from 'react-dom';

import { CircleCheck, ShoppingCart } from 'lucide-react';
import React, { startTransition, Suspense, useState } from 'react';
import ToppingList from './topping-list';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Product, Topping } from '@/lib/types';
import { Label } from '@/components/ui/label';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { addToCart, CartItem } from '@/lib/store/features/cart/cartSlice';
import { hashTheItem } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

const SucessToast = () => {
    return (
        <div className="flex items-center gap-2">
            <CircleCheck className="text-emerald-500" />
            <span className="font-bold text-foreground">Added to cart successfully</span>
        </div>
    );
};

type ChosenConfig = {
    [key: string]: string;
};

const ProductModal = ({ product }: { product: Product }) => {
    const { toast } = useToast();
    const [dialogOpen, setDialogOpen] = useState(false);

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

    const zoomBoxLeft = mouseCoords.x - 370;

    const zoomBoxTop = typeof window !== 'undefined'
        ? Math.max(20, Math.min(mouseCoords.y - 240, window.innerHeight - 370))
        : mouseCoords.y - 240;

    const cartItems = useAppSelector((state) => state.cart.cartItems);
    const dispatch = useAppDispatch();

    const defaultConfiguration = Object.entries(product.category.priceConfiguration)
        .map(([key, value]) => {
            return { [key]: value.availableOptions[0] };
        })
        .reduce((acc, curr) => ({ ...acc, ...curr }), {});

    const [chosenConfig, setChosenConfig] = useState<ChosenConfig>(
        defaultConfiguration as unknown as ChosenConfig
    );
    const [selectedToppings, setSelectedToppings] = React.useState<Topping[]>([]);

    const totalPrice = React.useMemo(() => {
        const toppingsTotal = selectedToppings.reduce((acc, curr) => acc + curr.price, 0);

        const configPricing = Object.entries(chosenConfig).reduce(
            (acc, [key, value]: [string, string]) => {
                const price = product.priceConfiguration[key].availableOptions[value];
                return acc + price;
            },
            0
        );
        return configPricing + toppingsTotal;
    }, [chosenConfig, selectedToppings, product]);

    const alreadyHasInCart = React.useMemo(() => {
        const currentConfiguration = {
            _id: product._id,
            name: product.name,
            image: product.image,
            priceConfiguration: product.priceConfiguration,
            chosenConfiguration: {
                priceConfiguration: { ...chosenConfig },
                selectedToppings: selectedToppings,
            },
            qty: 1,
        };

        const hash = hashTheItem(currentConfiguration);
        return cartItems.some((item) => item.hash === hash);
    }, [product, chosenConfig, selectedToppings, cartItems]);

    const handleCheckBoxCheck = (topping: Topping) => {
        const isAlreadyExists = selectedToppings.some(
            (element: Topping) => element.id === topping.id
        );

        startTransition(() => {
            if (isAlreadyExists) {
                setSelectedToppings((prev) => prev.filter((elm: Topping) => elm.id !== topping.id));
                return;
            }

            setSelectedToppings((prev: Topping[]) => [...prev, topping]);
        });
    };

    const handleAddToCart = (product: Product) => {
        const itemToAdd: CartItem = {
            _id: product._id,
            name: product.name,
            image: product.image,
            priceConfiguration: product.priceConfiguration,
            chosenConfiguration: {
                priceConfiguration: chosenConfig!,
                selectedToppings: selectedToppings,
            },
            qty: 1,
        };
        dispatch(addToCart(itemToAdd));
        setSelectedToppings([]);
        setDialogOpen(false);
        toast({
            // @ts-ignore
            title: <SucessToast />,
        });
    };

    const handleRadioChange = (key: string, data: string) => {
        startTransition(() => {
            setChosenConfig((prev) => {
                return { ...prev, [key]: data };
            });
        });
    };

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger className="bg-primary/10 hover:bg-primary/20 text-primary px-5 py-1.5 rounded-full font-semibold border border-primary/20 hover:border-primary/40 shadow-sm transition-all duration-300 hover:shadow-primary/5 focus:outline-none">
                Customize
            </DialogTrigger>
            <DialogContent className="max-w-3xl p-0 overflow-hidden bg-background border border-border text-foreground rounded-2xl shadow-2xl transition-colors duration-300">
                <div className="flex flex-col md:flex-row h-full">
                    {/* Left Banner */}
                    <div className="md:w-1/3 bg-white flex items-center justify-center p-8 border-b md:border-b-0 md:border-r border-border transition-colors duration-300">
                        <div className="relative w-full h-[220px] md:h-full flex items-center justify-center">
                            <Image 
                                src={product.image} 
                                width={280} 
                                height={280} 
                                alt={product.name} 
                                className="object-contain max-h-[220px] w-auto drop-shadow-[0_10px_20px_rgba(124,58,237,0.15)] cursor-zoom-in mix-blend-multiply"
                                onMouseMove={handleMouseMove}
                                onMouseEnter={() => setIsHovering(true)}
                                onMouseLeave={() => setIsHovering(false)}
                            />
                        </div>
                    </div>
                    {/* Right Form */}
                    <div className="md:w-2/3 p-8 bg-background flex flex-col justify-between transition-colors duration-300">
                        <div>
                            <h3 className="text-2xl font-bold text-foreground tracking-tight transition-colors duration-300">{product.name}</h3>
                            <p className="mt-2 text-sm text-muted-foreground leading-relaxed transition-colors duration-300">{product.description}</p>

                            {Object.entries(product.category.priceConfiguration).map(([key, value]) => {
                                return (
                                    <div key={key} className="mt-6">
                                        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors duration-300">Choose {key}</h4>
                                        <RadioGroup
                                            defaultValue={value.availableOptions[0]}
                                            onValueChange={(data) => {
                                                handleRadioChange(key, data);
                                            }}
                                            className="grid grid-cols-3 gap-3 mt-2">
                                            {value.availableOptions.map((option) => {
                                                return (
                                                    <div key={option}>
                                                        <RadioGroupItem
                                                            value={option}
                                                            id={option}
                                                            className="peer sr-only"
                                                            aria-label={option}
                                                        />
                                                        <Label
                                                            htmlFor={option}
                                                            className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-3 px-4 cursor-pointer text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary transition-all">
                                                            {option}
                                                        </Label>
                                                    </div>
                                                );
                                            })}
                                        </RadioGroup>
                                    </div>
                                );
                            })}

                            {/* Render Addons / Toppings if applicable */}
                            {(product.category.name.toLowerCase().includes('gift') || product.category.name.toLowerCase().includes('pizza')) && (
                                <Suspense fallback={
                                    <div className="mt-6 text-xs text-muted-foreground animate-pulse">
                                        Loading luxury add-ons...
                                    </div>
                                }>
                                    <ToppingList
                                        selectedToppings={selectedToppings}
                                        handleCheckBoxCheck={handleCheckBoxCheck}
                                    />
                                </Suspense>
                            )}
                        </div>

                        {/* Bottom Total/Cart Action */}
                        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border transition-colors duration-300">
                            <div className="flex flex-col">
                                <span className="text-xs text-muted-foreground uppercase tracking-wider transition-colors duration-300">Total Price</span>
                                <span className="text-2xl font-black text-primary">₹{totalPrice}</span>
                            </div>

                            <Button
                                className={`rounded-full px-6 py-5 font-semibold text-sm transition-all duration-300 ${
                                    alreadyHasInCart 
                                    ? 'bg-secondary text-muted-foreground hover:bg-secondary cursor-not-allowed' 
                                    : 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-primary/30'
                                }`}
                                disabled={alreadyHasInCart}
                                onClick={() => handleAddToCart(product)}>
                                <ShoppingCart size={18} className="mr-2" />
                                <span>
                                    {alreadyHasInCart ? 'Already in cart' : 'Add to cart'}
                                </span>
                            </Button>
                        </div>
                    </div>
                </div>
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
            </DialogContent>
        </Dialog>
    );
};

export default ProductModal;
