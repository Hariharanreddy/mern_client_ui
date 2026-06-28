'use client';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormState, useFormStatus } from 'react-dom';
import { LoaderCircle } from 'lucide-react';
import register from '@/lib/actions/register';

const SubmitButton = () => {
    const { pending } = useFormStatus();

    return (
        <Button className="rounded-full w-full py-6 font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300">
            {pending ? (
                <div className="flex items-center justify-center gap-2">
                    <LoaderCircle className="animate-spin w-4 h-4" />
                    <span>Creating account...</span>
                </div>
            ) : (
                'Create Account'
            )}
        </Button>
    );
};

const initialState = {
    type: '',
    message: '',
};

export default function SignUpPage() {
    const [state, formAction] = useFormState(register, initialState);

    if (state.type === 'success') {
        window.location.href = '/';
    }

    return (
        <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 bg-background relative overflow-hidden transition-colors duration-300">
            {/* Form Section */}
            <div className="flex items-center justify-center py-12 relative z-10">
                <div className="mx-auto grid w-[400px] gap-8 p-8 rounded-2xl glass-panel border border-border">
                    <div className="grid gap-2 text-center">
                        <p
                            aria-live="polite"
                            className={`text-xs font-semibold ${state.type === 'error' ? 'text-rose-500' : 'text-emerald-500'
                                }`}>
                            {state.message}
                        </p>
                        <h1 className="text-3xl font-extrabold tracking-tight text-foreground transition-colors duration-300">Join JoyNest</h1>
                        <p className="text-sm text-muted-foreground transition-colors duration-300">
                            Create your account to start curating custom gift boxes.
                        </p>
                    </div>
                    <form action={formAction}>
                        <div className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="first-name" className="text-muted-foreground text-xs font-semibold uppercase tracking-wider transition-colors duration-300">First Name</Label>
                                    <Input
                                        id="first-name"
                                        name="firstName"
                                        placeholder="Max"
                                        required
                                        className="bg-background border-border text-foreground rounded-xl focus:border-primary/50 focus:ring-1 focus:ring-primary/50 placeholder:text-muted-foreground/50 transition-colors duration-300"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="last-name" className="text-muted-foreground text-xs font-semibold uppercase tracking-wider transition-colors duration-300">Last Name</Label>
                                    <Input
                                        id="last-name"
                                        name="lastName"
                                        placeholder="Robinson"
                                        required
                                        className="bg-background border-border text-foreground rounded-xl focus:border-primary/50 focus:ring-1 focus:ring-primary/50 placeholder:text-muted-foreground/50 transition-colors duration-300"
                                    />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-muted-foreground text-xs font-semibold uppercase tracking-wider transition-colors duration-300">Email Address</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    className="bg-background border-border text-foreground rounded-xl focus:border-primary/50 focus:ring-1 focus:ring-primary/50 placeholder:text-muted-foreground/50 transition-colors duration-300"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password" className="text-muted-foreground text-xs font-semibold uppercase tracking-wider transition-colors duration-300">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="bg-background border-border text-foreground rounded-xl focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors duration-300"
                                />
                            </div>
                            <SubmitButton />
                        </div>
                    </form>
                    <div className="text-center text-sm text-muted-foreground transition-colors duration-300">
                        Already have an account?{' '}
                        <Link href="/login" className="text-primary hover:underline font-semibold">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>

            {/* Image Banner Section */}
            <div className="hidden lg:block relative h-screen">
                <Image
                    src="/gift-login.png"
                    width={1920}
                    height={1080}
                    style={{ objectFit: 'cover' }}
                    alt="JoyNest Banner"
                    className="h-full w-full object-cover dark:brightness-[0.6] brightness-[0.8] contrast-[1.05]"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/10 to-transparent" />
            </div>
        </div>
    );
}
