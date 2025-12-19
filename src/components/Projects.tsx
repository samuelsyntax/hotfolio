'use client';

import { useEffect, useRef, useState } from 'react';
import { LayoutGrid, Globe, Smartphone, Server, ExternalLink, Github } from 'lucide-react';

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
                <h2 className="reveal gradient-text-enhanced section-title text-3xl md:text-4xl font-bold text-center mb-16">
                    Featured Projects
                </h2>

                <div className="reveal flex justify-center gap-3 mb-12 flex-wrap">
                    {[
                        { key: 'all', label: 'All', icon: LayoutGrid },
                        { key: 'web', label: 'Web Apps', icon: Globe },
                        { key: 'mobile', label: 'Mobile', icon: Smartphone },
                        { key: 'api', label: 'APIs', icon: Server }
                    ].map(({ key, label, icon: Icon }) => (
                        <button key={key} onClick={() => setFilter(key)}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${filter === key
                                ? 'shadow-lg' : 'hover:text-[var(--text)]'}`}
                            style={filter === key
                                ? {
                                    background: 'var(--accent)',
                                    color: 'var(--accent-text)',
                                    boxShadow: '0 4px 20px color-mix(in srgb, var(--accent) 30%, transparent)'
                                }
                                : {
                                    border: '1px solid color-mix(in srgb, var(--text-muted) 50%, transparent)',
                                    background: 'color-mix(in srgb, var(--bg-card) 70%, transparent)',
                                    color: 'var(--text-muted)'
                                }}
                            onMouseEnter={(e) => { if (filter !== key) { e.currentTarget.style.borderColor = 'var(--text)'; e.currentTarget.style.color = 'var(--text)'; } }}
                            onMouseLeave={(e) => { if (filter !== key) { e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--text-muted) 50%, transparent)'; e.currentTarget.style.color = 'var(--text-muted)'; } }}>
                            <Icon className="w-4 h-4" />
                            {label}
                        </button>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {filtered.map((project, index) => (
                        <article key={project.id}
                            className="reveal glass-card hover-lift rounded-2xl overflow-hidden"
                            style={{ transitionDelay: `${index * 100}ms` }}>
                            <div className="h-48 flex items-center justify-center text-2xl font-bold relative overflow-hidden"
                                style={{
                                    background: 'linear-gradient(135deg, var(--accent) 0%, color-mix(in srgb, var(--accent) 70%, var(--bg)) 100%)',
                                    color: 'var(--accent-text)'
                                }}>
                                <span className="relative z-10">{project.title.split(' ')[0]}</span>
                                {/* Decorative elements */}
                                <div className="absolute inset-0 opacity-20"
                                    style={{
                                        background: 'radial-gradient(circle at 80% 20%, white 0%, transparent 50%)'
                                    }} />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-[var(--text)] mb-3">{project.title}</h3>
                                <p className="text-[var(--text-muted)] mb-4 leading-relaxed">{project.desc}</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="px-3 py-1 rounded-full text-sm font-medium transition-colors"
                                            style={{
                                                background: 'color-mix(in srgb, var(--accent) 15%, transparent)',
                                                color: 'var(--text)',
                                                border: '1px solid color-mix(in srgb, var(--accent) 40%, transparent)'
                                            }}>{tag}</span>
                                    ))}
                                </div>
                                <div className="flex gap-4">
                                    <a href="#" className="group link-underline font-medium transition-colors inline-flex items-center gap-1.5" style={{ color: 'var(--accent)' }}>
                                        <ExternalLink className="w-4 h-4" />
                                        Live Demo
                                    </a>
                                    <a href="#" className="group link-underline font-medium transition-colors inline-flex items-center gap-1.5" style={{ color: 'var(--accent)' }}>
                                        <Github className="w-4 h-4" />
                                        GitHub
                                    </a>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
