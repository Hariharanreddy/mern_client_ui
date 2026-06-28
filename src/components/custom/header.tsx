import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone } from 'lucide-react';
import { Button } from '../ui/button';
import { Tenant } from '@/lib/types';
import dynamic from 'next/dynamic';
import TenantSelect from './tenant-select';
import { getSession } from '@/lib/session';
import Logout from './logout';
import ThemeToggle from './theme-toggle';

const CartCounterWithoutSSR = dynamic(() => import('./cart-counter'), { ssr: false });

const Header = async () => {
    const session = await getSession();
    
    const tenantsResponse = await fetch(`${process.env.BACKEND_URL}/api/auth/tenants?perPage=100`, {
        next: {
            revalidate: 3600, // 1 hour
        },
    });

    if (!tenantsResponse.ok) {
        throw new Error('Failed to fetch tenants');
    }

    const restaurants: { data: Tenant[] } = await tenantsResponse.json();

    return (
        <header className="bg-background/80 backdrop-blur-md sticky top-0 border-b border-border/40 z-50 transition-colors duration-300">
            <nav className="container py-5 flex items-center justify-between">
                <div className="flex items-center space-x-6">
                    <Link href={'/'} className="flex items-center space-x-2.5 text-foreground hover:text-primary transition-colors">
                        <Image src="/logo.svg" width={36} height={36} alt="JoyNest" className="object-contain w-9 h-9" />
                        <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-primary bg-clip-text text-transparent">JoyNest</span>
                    </Link>
                    <TenantSelect restaurants={restaurants} />
                </div>
                <div className="flex items-center gap-x-6">
                    <ul className="flex items-center font-medium space-x-6">
                        <li>
                            <Link className="text-muted-foreground hover:text-primary transition-colors" href={'/'}>
                                Gifts
                            </Link>
                        </li>
                        <li>
                            <Link className="text-muted-foreground hover:text-primary transition-colors" href={'/orders'}>
                                Orders
                            </Link>
                        </li>
                    </ul>
                    <div className="flex items-center gap-5">
                        <CartCounterWithoutSSR />
                        <ThemeToggle />
                    </div>
                    <div className="flex items-center ml-2 text-muted-foreground gap-x-2">
                        <Phone className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold">+91 9800 098 998</span>
                    </div>
                    {session ? (
                        <Logout />
                    ) : (
                        <Button size={'sm'} asChild className="rounded-full px-5">
                            <Link href="/login">Login</Link>
                        </Button>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
