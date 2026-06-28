import Image from 'next/image';
import { Button } from '@/components/ui/button';
import ProductList from './components/product-list';
import { Suspense } from 'react';
import { Sparkles, Truck, Gift as GiftIcon, Star } from 'lucide-react';

export default async function Home({ searchParams }: { searchParams: { restaurantId: string } }) {
    return (
        <>
            <section className="relative py-20 md:py-28 overflow-hidden bg-transparent">
                {/* Modern mesh micro-grid backdrop */}
                <div className="grid-bg" />
                
                <div className="container relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
                    {/* Left text column */}
                    <div className="flex-1 space-y-8 text-center lg:text-left">
                        {/* Premium introductory badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-2 shadow-sm shadow-primary/5">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Introducing JoyNest Luxe</span>
                        </div>
                        
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.15] transition-colors duration-300">
                            Curate Memories, <br />
                            One Perfect <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-violet-400 to-indigo-400">Gift at a Time.</span>
                        </h1>
                        
                        <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed font-medium transition-colors duration-300">
                            Handcrafted luxury boxes, personalized surprises, and custom boutique hampers curated to create unforgettable moments of joy.
                        </p>
                        
                        {/* Action buttons & Trust chips */}
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                            <Button className="w-full sm:w-auto text-base rounded-full py-6 px-8 font-bold shadow-lg shadow-primary/25 hover:shadow-primary/35 transition-all duration-300 transform hover:-translate-y-0.5" asChild>
                                <a href="#gift-catalog">Explore Gift Catalog</a>
                            </Button>
                            
                            <a href="#gift-catalog" className="text-sm font-semibold text-muted-foreground hover:text-primary hover:underline transition-all">
                                How it works →
                            </a>
                        </div>
                        
                        {/* Trust indicators */}
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 pt-4 border-t border-border max-w-xl transition-colors duration-300">
                            <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
                                <Truck className="w-4 h-4 text-primary" />
                                <span>Free Express Delivery</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
                                <GiftIcon className="w-4 h-4 text-primary" />
                                <span>Luxury Packaging</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
                                <Star className="w-4 h-4 fill-primary text-primary" />
                                <span>4.9/5 Star Curation</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Right image column */}
                    <div className="flex-1 flex flex-col items-center justify-center relative w-full">
                        {/* Elegant rotated glassmorphic mock card */}
                        <div className="relative overflow-hidden rounded-3xl border border-border glass-panel p-6 shadow-2xl transition-all duration-700 transform rotate-2 hover:rotate-0 hover:scale-[1.02] hover:border-primary/20 max-w-md w-full">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-violet-500/5 pointer-events-none" />
                            <div className="relative w-full aspect-square bg-background/50 rounded-2xl border border-border flex items-center justify-center p-8 backdrop-blur-3xl shadow-inner transition-colors duration-300">
                                <Image 
                                    alt="JoyNest Premium Mockup" 
                                    src={'/gift-main.png'} 
                                    width={350} 
                                    height={350} 
                                    className="object-contain max-h-[300px] w-auto drop-shadow-[0_20px_40px_rgba(124,58,237,0.25)] transition-transform duration-500 ease-out hover:scale-105"
                                    priority
                                />
                            </div>
                            
                            {/* Glass overlay specs info tag */}
                            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground bg-background/30 rounded-xl py-2.5 px-4 border border-border backdrop-blur-md transition-colors duration-300">
                                <div className="flex flex-col">
                                    <span className="font-semibold text-foreground">The Aura Luxe Box</span>
                                    <span className="text-[10px] text-muted-foreground/80 mt-0.5">Signature Series</span>
                                </div>
                                <span className="font-bold text-primary text-sm">From ₹2,499</span>
                            </div>
                        </div>
                        
                        {/* Stats counters */}
                        <div className="grid grid-cols-3 gap-6 mt-8 w-full max-w-md px-2">
                            <div className="text-center p-3 rounded-2xl border border-border bg-card/40 backdrop-blur-md transition-all duration-300">
                                <h3 className="text-2xl font-black text-foreground">15k+</h3>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mt-1">Gifts Sent</p>
                            </div>
                            <div className="text-center p-3 rounded-2xl border border-border bg-card/40 backdrop-blur-md transition-all duration-300">
                                <h3 className="text-2xl font-black text-foreground">99.9%</h3>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mt-1">On-Time</p>
                            </div>
                            <div className="text-center p-3 rounded-2xl border border-border bg-card/40 backdrop-blur-md transition-all duration-300">
                                <h3 className="text-2xl font-black text-foreground">120+</h3>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mt-1">Brands</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <div id="gift-catalog" className="relative z-10 border-t border-border bg-background/30 transition-colors duration-300">
                <Suspense fallback={
                    <div className="container py-28 text-center text-muted-foreground font-semibold animate-pulse tracking-wide flex items-center justify-center gap-2">
                        <Sparkles className="w-4 h-4 text-primary animate-spin" />
                        <span>Loading Curated Gifts...</span>
                    </div>
                }>
                    <ProductList searchParams={searchParams} />
                </Suspense>
            </div>
        </>
    );
}
