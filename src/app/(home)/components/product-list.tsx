import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react';
import ProductCard from './product-card';
import { Category, Product } from '@/lib/types';
import { Sparkles } from 'lucide-react';

const ProductList = async ({ searchParams }: { searchParams: { restaurantId?: string; tenantId?: string } }) => {
    const tenantId = searchParams?.tenantId || searchParams?.restaurantId || '';
    console.log('searchParams tenantId:', tenantId);
    
    if (!tenantId) {
        return (
            <div className="container py-24 text-center">
                <div className="max-w-md mx-auto space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary animate-bounce">
                        <Sparkles className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground">Select a Store to Begin</h2>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        To view our exclusive selection of handcrafted gift hampers, chocolates, and personalized surprises, please choose a boutique store from the dropdown menu above.
                    </p>
                </div>
            </div>
        );
    }
    const categoryResponse = await fetch(`${process.env.BACKEND_URL}/api/catalog/categories`, {
        cache: 'no-store',
    });

    if (!categoryResponse.ok) {
        throw new Error('Failed to fetch categories');
    }

    const categories: Category[] = await categoryResponse.json();

    // todo: add pagination
    const productsResponse = await fetch(
        `${process.env.BACKEND_URL}/api/catalog/products?perPage=100&limit=100&tenantId=${tenantId}`,
        {
            cache: 'no-store',
        }
    );

    const products: { data: Product[] } = await productsResponse.json();

    if (!categories || categories.length === 0) {
        return (
            <div className="container py-12 text-center text-muted-foreground font-semibold">
                No categories available.
            </div>
        );
    }

    return (
        <section>
            <div className="container py-12">
                <Tabs defaultValue={categories[0]._id}>
                    <TabsList>
                        {categories.map((category) => {
                            return (
                                <TabsTrigger
                                    key={category._id}
                                    value={category._id}
                                    className="text-md">
                                    {category.name}
                                </TabsTrigger>
                            );
                        })}
                        {/* <TabsTrigger value="beverages" className="text-md">
                    Beverages
                </TabsTrigger> */}
                    </TabsList>
                    {categories.map((category) => {
                        return (
                            <TabsContent key={category._id} value={category._id}>
                                <div className="grid grid-cols-4 gap-6 mt-6">
                                    {products.data
                                        .filter((product) => product.category._id === category._id)
                                        .map((product) => (
                                            <ProductCard product={product} key={product._id} />
                                        ))}
                                </div>
                            </TabsContent>
                        );
                    })}

                    {/* <TabsContent value="beverages">
                <div className="grid grid-cols-4 gap-6 mt-6">
                    {products.map((product) => (
                        <ProductCard product={product} key={product.id} />
                    ))}
                </div>
            </TabsContent> */}
                </Tabs>
            </div>
        </section>
    );
};

export default ProductList;
