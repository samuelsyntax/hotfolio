'use client';

import { useEffect, useRef } from 'react';

export default function About() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (el) {
            const observer = new IntersectionObserver(
                (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('active')),
                { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
            );
            el.querySelectorAll('.reveal').forEach(el => observer.observe(el));
            return () => observer.disconnect();
        }
    }, []);

    return (
        <section ref={ref} className="py-24" id="about">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="reveal gradient-text text-3xl md:text-4xl font-bold text-center mb-16">About Me</h2>

                <div className="grid md:grid-cols-[300px_1fr] gap-16 items-center">
                    <div className="reveal flex justify-center">
                        <div className="w-72 h-72 rounded-full p-1" style={{ background: `linear-gradient(135deg, var(--accent) 0%, var(--text-muted) 100%)` }}>
                            <div className="w-full h-full rounded-full bg-[var(--bg-card)] flex items-center justify-center text-6xl font-bold" style={{ color: 'var(--accent)' }}>
                                AC
                            </div>
                        </div>
                    </div>

                    <div className="reveal">
                        <p className="text-[var(--text-muted)] mb-5 text-lg">
                            I&apos;m a software developer with 5+ years of experience building web applications that users love. My journey started with curiosity about how things work on the internet.
                        </p>
                        <p className="text-[var(--text-muted)] mb-8 text-lg">
                            When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing to open-source projects, or sharing knowledge through my blog.
                        </p>

                        {/* <div className="flex gap-10 flex-wrap">
                            {[
                                { num: '5+', label: 'Years Experience' },
                                { num: '50+', label: 'Projects Completed' },
                                { num: '30+', label: 'Happy Clients' }
                            ].map((stat) => (
                                <div key={stat.label} className="text-center">
                                    <span className="gradient-text text-4xl font-bold block">{stat.num}</span>
                                    <span className="text-[var(--text-muted)] text-sm">{stat.label}</span>
                                </div>
                            ))}
                        </div> */}
                    </div>
                </div>
            </div>
        </section>
    );
}
