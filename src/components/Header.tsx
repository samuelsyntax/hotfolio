'use client';

import { useTheme } from '@/context/ThemeContext';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
    const { themeValue, setThemeValue } = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    // Track scroll progress
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            setScrollProgress(progress);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Calculate header background opacity based on theme
    const headerBg = themeValue < 50
        ? `rgba(5, 5, 8, 0.85)`
        : `rgba(254, 254, 254, 0.9)`;

    // Use dark logo (white) for dark mode, light logo (black) for light mode
    const logoSrc = themeValue < 50 ? '/logo-dark.svg' : '/logo-light.svg';

    return (
        <>
            {/* Scroll Progress Bar */}
            <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

            <header className="fixed top-0 left-0 right-0 z-50 py-4 backdrop-blur-xl border-b transition-colors"
                style={{ background: headerBg, borderColor: 'color-mix(in srgb, var(--border) 10%, transparent)' }}>
                <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">
                    {/* Frog Logo */}
                    <Link href="/" className="flex items-center gap-2 group transition-transform hover:scale-105">
                        <Image
                            src={logoSrc}
                            alt="Sunday Samuel Logo"
                            width={32}
                            height={32}
                            className="transition-all"
                        />
                    </Link>

                    <ul className={`md:flex gap-8 list-none ${mobileOpen
                        ? 'flex flex-col fixed top-0 right-0 w-[70%] h-screen justify-center items-center gap-8 z-50 transition-all'
                        : 'hidden'}`}
                        style={{ background: mobileOpen ? 'var(--bg-secondary)' : 'transparent' }}>
                        {['Skills', 'Projects'].map((item) => (
                            <li key={item}>
                                <a href={`#${item.toLowerCase()}`}
                                    className="link-underline text-[var(--text-muted)] hover:text-[var(--text)] font-medium transition-colors"
                                    onClick={() => setMobileOpen(false)}>
                                    {item}
                                </a>
                            </li>
                        ))}
                        <li>
                            <Link href="/blog"
                                className="link-underline text-[var(--text-muted)] hover:text-[var(--text)] font-medium transition-colors"
                                onClick={() => setMobileOpen(false)}>
                                Blog
                            </Link>
                        </li>
                    </ul>

                    <div className="flex items-center gap-6">
                        {/* Theme Slider */}
                        <div className="flex items-center gap-2">
                            {/* Moon icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="text-[var(--text)]"
                                style={{ opacity: 1 - themeValue / 100 }}
                            >
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                            </svg>

                            {/* Slider */}
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={themeValue}
                                onChange={(e) => setThemeValue(Number(e.target.value))}
                                className="theme-slider"
                                aria-label="Theme brightness"
                            />

                            {/* Sun icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="text-[var(--text)]"
                                style={{ opacity: themeValue / 100 }}
                            >
                                <circle cx="12" cy="12" r="5" />
                                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                            </svg>
                        </div>

                        <button className="md:hidden flex flex-col gap-1 p-2 z-[51]" onClick={() => setMobileOpen(!mobileOpen)}>
                            <span className="w-6 h-0.5 bg-[var(--text)] transition-all" />
                            <span className="w-6 h-0.5 bg-[var(--text)] transition-all" />
                            <span className="w-6 h-0.5 bg-[var(--text)] transition-all" />
                        </button>
                    </div>
                </nav>
            </header>
        </>
    );
}
