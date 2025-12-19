'use client';

import { useEffect, useRef, useState } from 'react';
import { LayoutGrid, Globe, Smartphone, Server } from 'lucide-react';
import Link from 'next/link';
import { projects } from '@/lib/projects';
import { ProjectCard } from '@/components/Projects';

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

    const filterButtons = [
        { key: 'all', label: 'All Projects', icon: LayoutGrid },
        { key: 'web', label: 'Web Apps', icon: Globe },
        { key: 'mobile', label: 'Mobile', icon: Smartphone },
        { key: 'api', label: 'APIs', icon: Server }
    ];

    return (
        <div ref={ref} className="min-h-screen pt-24 pb-16" style={{ background: 'var(--bg)' }}>
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className="mb-12">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors mb-8 group"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="transition-transform group-hover:-translate-x-1"
                        >
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Back to Home
                    </Link>
                    <h1 className="gradient-text text-4xl md:text-5xl font-bold mb-4">Projects</h1>
                    <p className="text-[var(--text-muted)] text-lg max-w-2xl leading-relaxed">
                        A showcase of my work across web applications, mobile apps, and backend services.
                        Each project represents a unique challenge and solution.
                    </p>
                </div>

                {/* Enhanced Filter Buttons */}
                <div className="reveal flex justify-center gap-3 mb-14 flex-wrap">
                    {filterButtons.map(({ key, label, icon: Icon }) => {
                        const isActive = filter === key;
                        return (
                            <button
                                key={key}
                                onClick={() => setFilter(key)}
                                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                                style={{
                                    background: isActive
                                        ? 'linear-gradient(135deg, var(--accent) 0%, color-mix(in srgb, var(--accent) 80%, #8b5cf6) 100%)'
                                        : 'color-mix(in srgb, var(--bg-card) 80%, transparent)',
                                    color: isActive ? 'var(--accent-text)' : 'var(--text-muted)',
                                    border: isActive ? 'none' : '1px solid color-mix(in srgb, var(--border) 30%, transparent)',
                                    boxShadow: isActive
                                        ? '0 8px 25px color-mix(in srgb, var(--accent) 35%, transparent)'
                                        : 'none',
                                    transform: isActive ? 'translateY(-2px)' : 'translateY(0)'
                                }}
                                onMouseEnter={(e) => {
                                    if (!isActive) {
                                        e.currentTarget.style.background = 'color-mix(in srgb, var(--accent) 15%, var(--bg-card))';
                                        e.currentTarget.style.color = 'var(--text)';
                                        e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--accent) 40%, transparent)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isActive) {
                                        e.currentTarget.style.background = 'color-mix(in srgb, var(--bg-card) 80%, transparent)';
                                        e.currentTarget.style.color = 'var(--text-muted)';
                                        e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--border) 30%, transparent)';
                                    }
                                }}
                            >
                                <Icon className="w-4 h-4" />
                                {label}
                            </button>
                        );
                    })}
                </div>

                {/* Projects count indicator */}
                <div className="text-center mb-8">
                    <span className="text-[var(--text-muted)] text-sm">
                        Showing <span className="font-semibold text-[var(--text)]">{filtered.length}</span> {filtered.length === 1 ? 'project' : 'projects'}
                    </span>
                </div>

                {/* Single column layout for all projects using enhanced cards */}
                <div className="flex flex-col gap-10">
                    {filtered.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}
