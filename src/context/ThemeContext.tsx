'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';

interface ThemeContextType {
    themeValue: number; // 0 = dark, 100 = light
    setThemeValue: (value: number) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Color interpolation helper
function interpolateColor(color1: string, color2: string, factor: number): string {
    const hex = (c: string) => parseInt(c, 16);
    const r1 = hex(color1.slice(1, 3)), g1 = hex(color1.slice(3, 5)), b1 = hex(color1.slice(5, 7));
    const r2 = hex(color2.slice(1, 3)), g2 = hex(color2.slice(3, 5)), b2 = hex(color2.slice(5, 7));
    const r = Math.round(r1 + (r2 - r1) * factor);
    const g = Math.round(g1 + (g2 - g1) * factor);
    const b = Math.round(b1 + (b2 - b1) * factor);
    return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
}

// Dark and light color palettes
const darkColors = {
    bg: '#050505',
    bgSecondary: '#0a0a0a',
    bgCard: '#141414',
    text: '#f8f8f8',
    textMuted: '#a1a1a1',
    accent: '#ffffff',
    accentText: '#000000',
    border: '#ffffff',
};

const lightColors = {
    bg: '#fefefe',
    bgSecondary: '#f5f5f5',
    bgCard: '#ffffff',
    text: '#1a1a1a',
    textMuted: '#6b6b6b',
    accent: '#1a1a1a',
    accentText: '#ffffff',
    border: '#1a1a1a',
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [themeValue, setThemeValueState] = useState(0); // 0 = dark
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem('themeValue');
        if (saved) setThemeValueState(Number(saved));
    }, []);

    const updateCSSVariables = useCallback((value: number) => {
        const factor = value / 100;
        const root = document.documentElement;

        root.style.setProperty('--bg', interpolateColor(darkColors.bg, lightColors.bg, factor));
        root.style.setProperty('--bg-secondary', interpolateColor(darkColors.bgSecondary, lightColors.bgSecondary, factor));
        root.style.setProperty('--bg-card', interpolateColor(darkColors.bgCard, lightColors.bgCard, factor));
        root.style.setProperty('--text', interpolateColor(darkColors.text, lightColors.text, factor));
        root.style.setProperty('--text-muted', interpolateColor(darkColors.textMuted, lightColors.textMuted, factor));
        root.style.setProperty('--accent', interpolateColor(darkColors.accent, lightColors.accent, factor));
        root.style.setProperty('--accent-text', interpolateColor(darkColors.accentText, lightColors.accentText, factor));
        root.style.setProperty('--border', interpolateColor(darkColors.border, lightColors.border, factor));
        root.style.setProperty('--theme-value', value.toString());
    }, []);

    useEffect(() => {
        if (mounted) {
            updateCSSVariables(themeValue);
            localStorage.setItem('themeValue', themeValue.toString());
        }
    }, [themeValue, mounted, updateCSSVariables]);

    const setThemeValue = (value: number) => {
        setThemeValueState(Math.max(0, Math.min(100, value)));
    };

    return (
        <ThemeContext.Provider value={{ themeValue, setThemeValue }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme must be used within ThemeProvider');
    return context;
}
