'use client';

import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { featuredProjects, Project } from '@/lib/projects';

// Reusable enhanced project card component
export function ProjectCard({ project, index }: { project: Project; index: number }) {
    const [isHovered, setIsHovered] = useState(false);

    // Dynamic gradient colors based on category
    const gradientColors = {
        web: { from: '#6366f1', to: '#8b5cf6', accent: '#a78bfa' },
        mobile: { from: '#10b981', to: '#14b8a6', accent: '#5eead4' },
        api: { from: '#f59e0b', to: '#f97316', accent: '#fbbf24' }
    };

    const colors = gradientColors[project.category];

    return (
        <article
            className="reveal group relative rounded-3xl overflow-hidden transition-all duration-500"
            style={{
                transitionDelay: `${index * 100}ms`,
                background: 'var(--bg-card)',
                border: '1px solid color-mix(in srgb, var(--border) 20%, transparent)',
                boxShadow: isHovered
                    ? `0 25px 50px -12px ${colors.from}30, 0 0 0 1px ${colors.from}20`
                    : '0 4px 20px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Animated gradient border on hover */}
            <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 rounded-3xl"
                style={{
                    opacity: isHovered ? 1 : 0,
                    background: `linear-gradient(135deg, ${colors.from}15, ${colors.to}15)`,
                }}
            />

            <div className="relative flex flex-col md:flex-row">
                {/* Enhanced Project Banner */}
                <div
                    className="relative h-56 md:h-auto md:w-80 md:min-h-[280px] flex items-center justify-center overflow-hidden flex-shrink-0"
                    style={{
                        background: `linear-gradient(135deg, ${colors.from} 0%, ${colors.to} 100%)`,
                    }}
                >
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 opacity-30">
                        <div
                            className="absolute inset-0 transition-transform duration-700"
                            style={{
                                backgroundImage: `radial-gradient(circle at 20% 80%, ${colors.accent} 0%, transparent 50%),
                                                  radial-gradient(circle at 80% 20%, white 0%, transparent 40%),
                                                  radial-gradient(circle at 40% 40%, ${colors.accent}50 0%, transparent 60%)`,
                                transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)'
                            }}
                        />
                    </div>

                    {/* Floating decorative elements */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div
                            className="absolute w-32 h-32 rounded-full blur-2xl transition-all duration-700"
                            style={{
                                background: colors.accent,
                                opacity: 0.3,
                                top: '20%',
                                right: '-10%',
                                transform: isHovered ? 'translate(-20px, 20px)' : 'translate(0, 0)'
                            }}
                        />
                        <div
                            className="absolute w-24 h-24 rounded-full blur-xl transition-all duration-700"
                            style={{
                                background: 'white',
                                opacity: 0.2,
                                bottom: '10%',
                                left: '10%',
                                transform: isHovered ? 'translate(10px, -10px)' : 'translate(0, 0)'
                            }}
                        />
                    </div>

                    {/* Project title in banner */}
                    <div className="relative z-10 text-center px-6">
                        <div
                            className="text-4xl md:text-5xl font-bold text-white mb-2 transition-transform duration-500"
                            style={{
                                textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                                transform: isHovered ? 'translateY(-5px)' : 'translateY(0)'
                            }}
                        >
                            {project.title.split(' ')[0]}
                        </div>
                        <div
                            className="text-white/70 text-sm font-medium uppercase tracking-widest transition-all duration-500"
                            style={{
                                opacity: isHovered ? 1 : 0.7,
                                transform: isHovered ? 'translateY(-3px)' : 'translateY(0)'
                            }}
                        >
                            {project.category === 'web' ? 'Web App' : project.category === 'mobile' ? 'Mobile' : 'API'}
                        </div>
                    </div>

                    {/* Sparkle icon */}
                    <Sparkles
                        className="absolute top-4 right-4 w-6 h-6 text-white/50 transition-all duration-500"
                        style={{
                            opacity: isHovered ? 1 : 0.5,
                            transform: isHovered ? 'rotate(15deg) scale(1.2)' : 'rotate(0deg) scale(1)'
                        }}
                    />
                </div>

                {/* Enhanced Project Content */}
                <div className="relative p-8 flex-1 flex flex-col justify-center">
                    {/* Category badge */}
                    <div
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 w-fit transition-all duration-300"
                        style={{
                            background: `${colors.from}15`,
                            color: colors.from,
                            border: `1px solid ${colors.from}30`
                        }}
                    >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: colors.from }} />
                        {project.category}
                    </div>

                    <h3
                        className="text-2xl font-bold text-[var(--text)] mb-3 transition-all duration-300"
                        style={{
                            transform: isHovered ? 'translateX(5px)' : 'translateX(0)'
                        }}
                    >
                        {project.title}
                    </h3>

                    <p className="text-[var(--text-muted)] mb-6 leading-relaxed text-base">
                        {project.desc}
                    </p>

                    {/* Enhanced tech tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag, tagIndex) => (
                            <span
                                key={tag}
                                className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300"
                                style={{
                                    background: 'color-mix(in srgb, var(--accent) 10%, var(--bg-card))',
                                    color: 'var(--text)',
                                    border: '1px solid color-mix(in srgb, var(--accent) 25%, transparent)',
                                    transitionDelay: `${tagIndex * 50}ms`,
                                    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)'
                                }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Enhanced action buttons */}
                    <div className="flex gap-4 mt-auto">
                        <a
                            href={project.liveUrl || '#'}
                            className="group/btn inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300"
                            style={{
                                background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
                                color: 'white',
                                boxShadow: isHovered ? `0 8px 20px ${colors.from}40` : `0 4px 12px ${colors.from}20`
                            }}
                        >
                            <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                            Live Demo
                        </a>
                        <a
                            href={project.githubUrl || '#'}
                            className="group/btn inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300"
                            style={{
                                background: 'color-mix(in srgb, var(--text) 10%, var(--bg-card))',
                                color: 'var(--text)',
                                border: '1px solid color-mix(in srgb, var(--text) 20%, transparent)'
                            }}
                        >
                            <Github className="w-4 h-4 transition-transform group-hover/btn:rotate-12" />
                            GitHub
                        </a>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default function Projects() {
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
        <section ref={ref} className="py-24" id="projects">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="reveal gradient-text-enhanced section-title text-3xl md:text-4xl font-bold text-center mb-16">
                    Featured Projects
                </h2>

                {/* Single column layout for featured projects */}
                <div className="flex flex-col gap-10">
                    {featuredProjects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>

                {/* View All Projects Button */}
                <div className="reveal flex justify-center mt-16">
                    <Link
                        href="/projects"
                        className="group inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300"
                        style={{
                            background: 'linear-gradient(135deg, var(--accent) 0%, color-mix(in srgb, var(--accent) 80%, #8b5cf6) 100%)',
                            color: 'var(--accent-text)',
                            boxShadow: '0 8px 30px color-mix(in srgb, var(--accent) 35%, transparent)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-3px)';
                            e.currentTarget.style.boxShadow = '0 12px 40px color-mix(in srgb, var(--accent) 45%, transparent)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 8px 30px color-mix(in srgb, var(--accent) 35%, transparent)';
                        }}
                    >
                        View All Projects
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
