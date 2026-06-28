'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        // Sync theme with document class on mount
        const isDark = document.documentElement.classList.contains('dark');
        setTheme(isDark ? 'dark' : 'light');
    }, []);

    const toggleTheme = () => {
        if (theme === 'dark') {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setTheme('light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setTheme('dark');
        }
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full border border-border bg-card/60 hover:bg-accent text-foreground transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none flex items-center justify-center shadow-md shadow-black/5"
            aria-label="Toggle Theme"
            id="theme-toggle-btn"
        >
            {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 fill-amber-400 animate-spin-slow" />
            ) : (
                <Moon className="w-4 h-4 text-violet-600 fill-violet-600" />
            )}
        </button>
    );
};

export default ThemeToggle;
