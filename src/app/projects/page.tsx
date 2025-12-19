'use client';

import { useEffect, useRef, useState } from 'react';
import { LayoutGrid, Globe, Smartphone, Server, ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';
import { projects } from '@/lib/projects';

export default function ProjectsPage() {
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
        <div ref={ref} className="min-h-screen pt-24 pb-16" style={{ background: 'var(--bg)' }}>
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className="mb-12">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors mb-8"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Back to Home
                    </Link>
                    <h1 className="gradient-text text-4xl md:text-5xl font-bold mb-4">Projects</h1>
                    <p className="text-[var(--text-muted)] text-lg max-w-2xl">
                        A showcase of my work across web applications, mobile apps, and backend services.
                    </p>
                </div>

                {/* Filter Buttons */}
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

                {/* Single column layout for all projects */}
                <div className="flex flex-col gap-8">
                    {filtered.map((project, index) => (
                        <article key={project.id}
                            className="reveal glass-card hover-lift rounded-2xl overflow-hidden"
                            style={{ transitionDelay: `${index * 100}ms` }}>
                            {/* Horizontal card layout */}
                            <div className="flex flex-col md:flex-row">
                                {/* Project banner */}
                                <div className="h-48 md:h-auto md:w-64 md:min-h-[200px] flex items-center justify-center text-2xl font-bold relative overflow-hidden flex-shrink-0"
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
                                {/* Project content */}
                                <div className="p-6 flex-1 flex flex-col justify-center">
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
                                        <a href={project.liveUrl || '#'} className="group link-underline font-medium transition-colors inline-flex items-center gap-1.5" style={{ color: 'var(--accent)' }}>
                                            <ExternalLink className="w-4 h-4" />
                                            Live Demo
                                        </a>
                                        <a href={project.githubUrl || '#'} className="group link-underline font-medium transition-colors inline-flex items-center gap-1.5" style={{ color: 'var(--accent)' }}>
                                            <Github className="w-4 h-4" />
                                            GitHub
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
