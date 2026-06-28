'use server';

import { cookies } from 'next/headers';

export const logout = async () => {
    const response = await fetch(`${process.env.BACKEND_URL}/api/auth/auth/logout`, {
        // It runs in Server Components, thus we can't use 'cookies' directly in client
        method: 'POST',
        headers: {
            Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
            cookie: `refreshToken=${cookies().get('refreshToken')?.value}`,
        },
    });

    if (!response.ok) {
        console.log('Logout failed', response.status);
        return false;
    }

    cookies().delete('accessToken');
    cookies().delete('refreshToken');
    return true;
};
