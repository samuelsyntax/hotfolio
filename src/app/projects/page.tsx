'use client';

import { useEffect, useRef, useState } from 'react';
import { LayoutGrid, Globe, Smartphone, Server } from 'lucide-react';
import Header from '@/components/Header';
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
        { key: 'all', label: 'All', icon: LayoutGrid },
        { key: 'web', label: 'Web Apps', icon: Globe },
        { key: 'mobile', label: 'Mobile', icon: Smartphone },
        { key: 'api', label: 'APIs', icon: Server }
    ];

    return (
        <>
            <Header />
            <div ref={ref} className="min-h-screen pt-24 pb-16" style={{ background: 'var(--bg)' }}>
                <div className="max-w-6xl mx-auto px-6">
                    {/* Centered Header - matching homepage style */}
                    <div className="text-center mb-16 pt-8">
                        <h1 className="gradient-text-enhanced section-title text-3xl md:text-4xl font-bold mb-4">
                            All Projects
                        </h1>
                        <p className="text-[var(--text-muted)] text-lg max-w-2xl mx-auto leading-relaxed">
                            A showcase of my work across web applications, mobile apps, and backend services.
                        </p>
                    </div>

                    {/* Enhanced Filter Buttons - using rounded-full to match tech tags */}
                    <div className="reveal flex justify-center gap-3 mb-12 flex-wrap">
                        {filterButtons.map(({ key, label, icon: Icon }) => {
                            const isActive = filter === key;
                            return (
                                <button
                                    key={key}
                                    onClick={() => setFilter(key)}
                                    className="flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold transition-all duration-300"
                                    style={{
                                        background: isActive
                                            ? 'linear-gradient(135deg, var(--accent) 0%, color-mix(in srgb, var(--accent) 80%, #8b5cf6) 100%)'
                                            : 'color-mix(in srgb, var(--bg-card) 80%, transparent)',
                                        color: isActive ? 'var(--accent-text)' : 'var(--text-muted)',
                                        border: isActive ? 'none' : '1px solid color-mix(in srgb, var(--border) 30%, transparent)',
                                        boxShadow: isActive
                                            ? '0 6px 20px color-mix(in srgb, var(--accent) 30%, transparent)'
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
                    <div className="text-center mb-10">
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
        </>
    );
}
