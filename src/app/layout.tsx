import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import Header from '@/components/custom/header';
import StoreProvider from './StoreProvider';
import { Toaster } from '@/components/ui/toaster';
import Refresher from '@/components/custom/refresher';
import QueryProvider from './QueryProvider';

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' });

export const metadata: Metadata = {
    title: 'JoyNest | Curated Luxury Gift Boxes & Customizable Presents',
    description: 'Create, personalize, and send beautiful curated gift boxes and luxury gifts with ease. Absolute reliability, premium packaging, and express delivery.',
    icons: {
        icon: '/logo.svg',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            try {
                                document.documentElement.classList.remove('dark');
                            } catch (_) {}
                        `,
                    }}
                />
            </head>
            <StoreProvider>
                <body
                    className={cn(
                        'min-h-screen bg-background font-manrope antialiased',
                        manrope.variable
                    )}>
                    <QueryProvider>
                        <Refresher>
                            <div className="relative overflow-hidden min-h-screen">
                                <div className="glow-orb-1" />
                                <div className="glow-orb-2" />
                                <div className="relative z-10 flex flex-col min-h-screen">
                                    <Header />
                                    <main className="flex-grow">{children}</main>
                                </div>
                            </div>
                            <Toaster />
                        </Refresher>
                    </QueryProvider>
                </body>
            </StoreProvider>
        </html>
    );
}
