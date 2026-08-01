'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
}

const NavLink = ({ href, children, className }: NavLinkProps) => {
    const searchParams = useSearchParams();
    const tenantId = searchParams.get('tenantId');

    const targetHref = tenantId 
        ? `${href}${href.includes('?') ? '&' : '?'}tenantId=${tenantId}` 
        : href;

    return (
        <Link href={targetHref} className={className}>
            {children}
        </Link>
    );
};

export default NavLink;
