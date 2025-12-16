'use client';

import { useEffect, useRef } from 'react';

export default function Hero() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (el) {
            const observer = new IntersectionObserver(
                (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('active')),
                { threshold: 0.1 }
            );
            el.querySelectorAll('.reveal').forEach(el => observer.observe(el));
            return () => observer.disconnect();
        }
    }, []);

    return (
        <section ref={ref} className="min-h-screen flex items-center relative overflow-hidden" id="hero">
            <div className="absolute inset-0 hero-bg-animation"
                style={{
                    background: 'radial-gradient(ellipse at 30% 20%, rgba(255, 255, 255, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(200, 200, 200, 0.05) 0%, transparent 50%)'
                }} />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <p className="reveal font-medium mb-2" style={{ color: 'var(--accent)' }}>Hello, I&apos;m</p>
                <h1 className="reveal gradient-text text-5xl md:text-7xl font-bold mb-4">Sunday Samuel</h1>
                <p className="reveal text-2xl md:text-3xl font-semibold text-[var(--text)] mb-6">Software Developer</p>
                <p className="reveal text-lg text-[var(--text-muted)] max-w-xl mb-10">
                    I craft elegant, performant web applications and bring ideas to life through clean code and creative problem-solving.
                </p>
                <div className="reveal flex gap-4 flex-wrap">
                    <a href="#projects"
                        className="px-8 py-3.5 rounded-full font-semibold transition-all hover:-translate-y-0.5"
                        style={{ background: 'var(--accent)', color: 'var(--accent-text)', boxShadow: '0 4px 30px color-mix(in srgb, var(--accent) 20%, transparent)' }}>
                        View My Work
                    </a>
                    <a href="#skills"
                        className="px-8 py-3.5 rounded-full font-semibold border-2 text-[var(--text)] transition-all"
                        style={{ borderColor: 'var(--accent)' }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent-text)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text)'; }}>
                        My Skills
                    </a>
                </div>
            </div>
        </section>
    );
}
