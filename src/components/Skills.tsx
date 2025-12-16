'use client';

import { useEffect, useRef } from 'react';

const skills = [
    { icon: '⚛️', name: 'React', desc: 'Building dynamic UIs' },
    { icon: '🟨', name: 'JavaScript', desc: 'ES6+ & TypeScript' },
    { icon: '🐍', name: 'Python', desc: 'Backend & Automation' },
    { icon: '🔵', name: 'C', desc: 'Systems Programming' },
    { icon: '🟢', name: 'Node.js', desc: 'Server-side Development' },
    { icon: '🗄️', name: 'Databases', desc: 'SQL & NoSQL' },
    { icon: '☁️', name: 'Cloud', desc: 'AWS & GCP' },
    { icon: '🐳', name: 'Docker', desc: 'Containerization' },
    { icon: '🔧', name: 'Git', desc: 'Version Control' },
];

export default function Skills() {
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
        <section ref={ref} className="py-24 bg-[var(--bg-secondary)]" id="skills">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="reveal gradient-text text-3xl md:text-4xl font-bold text-center mb-16">Skills & Technologies</h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {skills.map((skill) => (
                        <div key={skill.name}
                            className="reveal bg-[var(--bg-card)] p-8 rounded-2xl text-center transition-all hover:-translate-y-2"
                            style={{ border: '1px solid color-mix(in srgb, var(--border) 10%, transparent)' }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = '0 8px 40px color-mix(in srgb, var(--accent) 15%, transparent)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--border) 10%, transparent)'; e.currentTarget.style.boxShadow = 'none'; }}>
                            <div className="text-4xl mb-4">{skill.icon}</div>
                            <h3 className="text-lg font-semibold text-[var(--text)] mb-2">{skill.name}</h3>
                            <p className="text-sm text-[var(--text-muted)]">{skill.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
