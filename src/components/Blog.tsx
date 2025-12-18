'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

interface BlogPost {
    slug: string;
    title: string;
    date: string;
    description: string;
}

export default function Blog() {
    const ref = useRef<HTMLDivElement>(null);
    const [posts, setPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        // Fetch posts from API
        fetch('/api/posts')
            .then(res => res.json())
            .then(data => setPosts(data.slice(0, 3)))
            .catch(() => setPosts([]));
    }, []);

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
    }, [posts]);

    return (
        <section ref={ref} className="py-24 bg-[var(--bg-secondary)]" id="blog">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="reveal gradient-text-enhanced section-title text-3xl md:text-4xl font-bold text-center mb-16">
                    Latest Blog Posts
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="reveal glass-card hover-lift rounded-2xl overflow-hidden block group"
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            {/* Decorative top accent */}
                            <div className="h-1 w-full"
                                style={{
                                    background: 'linear-gradient(90deg, var(--accent), color-mix(in srgb, var(--accent) 50%, transparent))'
                                }} />

                            <div className="p-6">
                                <span className="text-sm font-medium" style={{ color: 'var(--accent)' }}>
                                    {new Date(post.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </span>
                                <h3 className="text-lg font-semibold text-[var(--text)] my-2 group-hover:text-[var(--accent)] transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-[var(--text-muted)] text-sm mb-4 leading-relaxed">{post.description}</p>
                                <span className="font-medium inline-flex items-center gap-1 transition-all group-hover:gap-2"
                                    style={{ color: 'var(--accent)' }}>
                                    Read More
                                    <span className="transition-transform group-hover:translate-x-1">→</span>
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="reveal text-center mt-12">
                    <Link
                        href="/blog"
                        className="inline-block px-8 py-4 rounded-full font-semibold border-2 text-[var(--text)] transition-all hover:-translate-y-1 hover:shadow-lg"
                        style={{
                            borderColor: 'color-mix(in srgb, var(--accent) 50%, transparent)',
                            background: 'color-mix(in srgb, var(--bg-card) 50%, transparent)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'var(--accent)';
                            e.currentTarget.style.color = 'var(--accent-text)';
                            e.currentTarget.style.borderColor = 'var(--accent)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'color-mix(in srgb, var(--bg-card) 50%, transparent)';
                            e.currentTarget.style.color = 'var(--text)';
                            e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--accent) 50%, transparent)';
                        }}
                    >
                        View All Posts
                    </Link>
                </div>
            </div>
        </section>
    );
}
