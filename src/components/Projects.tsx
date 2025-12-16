'use client';

import { useEffect, useRef, useState } from 'react';

const projects = [
    { id: 1, category: 'web', title: 'E-Commerce Platform', desc: 'Full-stack shopping platform with real-time inventory and payment processing.', tags: ['React', 'Node.js', 'MongoDB'] },
    { id: 2, category: 'mobile', title: 'Fitness Tracker', desc: 'Mobile app for tracking workouts, nutrition, and health metrics.', tags: ['React Native', 'Firebase'] },
    { id: 3, category: 'api', title: 'API Gateway Service', desc: 'Microservices API gateway with rate limiting and authentication.', tags: ['Python', 'FastAPI', 'Docker'] },
    { id: 4, category: 'web', title: 'Analytics Dashboard', desc: 'Real-time data visualization dashboard with interactive charts.', tags: ['Vue.js', 'D3.js', 'PostgreSQL'] },
];

export default function Projects() {
    const ref = useRef<HTMLDivElement>(null);
    const [filter, setFilter] = useState('all');

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

    const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

    return (
        <section ref={ref} className="py-24" id="projects">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="reveal gradient-text text-3xl md:text-4xl font-bold text-center mb-16">Featured Projects</h2>

                <div className="reveal flex justify-center gap-3 mb-12 flex-wrap">
                    {['all', 'web', 'mobile', 'api'].map((f) => (
                        <button key={f} onClick={() => setFilter(f)}
                            className={`px-6 py-2.5 rounded-full font-medium transition-all ${filter === f
                                ? '' : 'text-[var(--text-muted)]'}`}
                            style={filter === f
                                ? { background: 'var(--accent)', color: 'var(--accent-text)' }
                                : { border: '1px solid color-mix(in srgb, var(--border) 30%, transparent)' }}
                            onMouseEnter={(e) => { if (filter !== f) e.currentTarget.style.borderColor = 'var(--border)'; }}
                            onMouseLeave={(e) => { if (filter !== f) e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--border) 30%, transparent)'; }}>
                            {f === 'all' ? 'All' : f === 'web' ? 'Web Apps' : f === 'mobile' ? 'Mobile' : 'APIs'}
                        </button>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {filtered.map((project) => (
                        <article key={project.id}
                            className="reveal bg-[var(--bg-card)] rounded-2xl overflow-hidden transition-all hover:-translate-y-2"
                            style={{ border: '1px solid color-mix(in srgb, var(--border) 10%, transparent)' }}
                            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 40px color-mix(in srgb, var(--accent) 15%, transparent)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; }}>
                            <div className="h-48 flex items-center justify-center text-2xl font-bold"
                                style={{ background: 'var(--accent)', color: 'var(--accent-text)' }}>
                                {project.title.split(' ')[0]}
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-[var(--text)] mb-3">{project.title}</h3>
                                <p className="text-[var(--text-muted)] mb-4">{project.desc}</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="px-3 py-1 rounded-full text-sm font-medium"
                                            style={{ background: 'color-mix(in srgb, var(--accent) 10%, transparent)', color: 'var(--text-muted)' }}>{tag}</span>
                                    ))}
                                </div>
                                <div className="flex gap-4">
                                    <a href="#" className="font-medium transition-colors" style={{ color: 'var(--accent)' }}
                                        onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7'; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}>Live Demo →</a>
                                    <a href="#" className="font-medium transition-colors" style={{ color: 'var(--accent)' }}
                                        onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7'; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}>GitHub →</a>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
