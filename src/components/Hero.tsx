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
        <section ref={ref} className="min-h-screen flex items-center pb-16 relative overflow-hidden" id="hero">
            {/* Enhanced background with multiple gradients */}
            <div className="absolute inset-0 hero-bg-animation"
                style={{
                    background: `
                        radial-gradient(ellipse at 20% 30%, color-mix(in srgb, var(--accent) 8%, transparent) 0%, transparent 50%),
                        radial-gradient(ellipse at 80% 70%, color-mix(in srgb, var(--accent) 5%, transparent) 0%, transparent 50%),
                        radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--accent) 3%, transparent) 0%, transparent 70%)
                    `
                }} />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <p className="reveal font-medium mb-3 text-lg tracking-wide" style={{ color: 'var(--accent)' }}>
                    Hello, I&apos;m
                </p>
                <h1 className="reveal gradient-text-enhanced text-5xl md:text-7xl font-bold mb-4 tracking-tight">
                    Sunday Samuel
                </h1>
                <p className="reveal text-2xl md:text-3xl font-semibold text-[var(--text)] mb-6 tracking-wide">
                    <span className="typewriter">Software Developer</span>
                </p>
                <p className="reveal text-lg text-[var(--text-muted)] max-w-xl mb-10 leading-relaxed">
                    I craft elegant, performant web applications and bring ideas to life through clean code and creative problem-solving.
                </p>
                <div className="reveal flex flex-col sm:flex-row gap-4 sm:gap-5">
                    <a href="#projects"
                        className="btn-glow px-8 py-4 rounded-full font-semibold transition-all hover:-translate-y-1 text-center"
                        style={{
                            background: 'var(--accent)',
                            color: 'var(--accent-text)'
                        }}>
                        View My Work
                    </a>
                    <a href="#skills"
                        className="group px-8 py-4 rounded-full font-semibold border-2 text-[var(--text)] transition-all hover:-translate-y-1 hover:shadow-lg text-center"
                        style={{
                            borderColor: 'color-mix(in srgb, var(--accent) 50%, transparent)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'var(--accent)';
                            e.currentTarget.style.color = 'var(--accent-text)';
                            e.currentTarget.style.borderColor = 'var(--accent)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = 'var(--text)';
                            e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--accent) 50%, transparent)';
                        }}>
                        My Skills
                    </a>
                </div>
            </div>
        </section>
    );
}
