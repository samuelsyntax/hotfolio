'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { getLatestPosts } from '@/data/blogData';

const latestPosts = getLatestPosts(3);

export default function Blog() {
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
        <section ref={ref} className="py-24 bg-[var(--bg-secondary)]" id="blog">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="reveal gradient-text text-3xl md:text-4xl font-bold text-center mb-16">Latest Blog Posts</h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {latestPosts.map((post) => (
                        <article key={post.id}
                            className="reveal bg-[var(--bg-card)] rounded-2xl overflow-hidden transition-all hover:-translate-y-2"
                            style={{ border: '1px solid color-mix(in srgb, var(--border) 10%, transparent)' }}
                            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 40px color-mix(in srgb, var(--accent) 15%, transparent)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; }}>
                            <div className="h-40 bg-[var(--bg-secondary)] flex items-center justify-center text-5xl">
                                {post.icon}
                            </div>
                            <div className="p-6">
                                <span className="text-sm font-medium" style={{ color: 'var(--accent)' }}>{post.date}</span>
                                <h3 className="text-lg font-semibold text-[var(--text)] my-2">{post.title}</h3>
                                <p className="text-[var(--text-muted)] text-sm mb-4">{post.desc}</p>
                                <Link href="/blog" className="font-medium transition-opacity" style={{ color: 'var(--accent)' }}
                                    onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}>Read More →</Link>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="reveal text-center mt-12">
                    <Link
                        href="/blog"
                        className="inline-block px-8 py-3.5 rounded-full font-semibold border-2 text-[var(--text)] transition-all hover:-translate-y-0.5"
                        style={{ borderColor: 'var(--accent)' }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent-text)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text)'; }}
                    >
                        View All Posts
                    </Link>
                </div>
            </div>
        </section>
    );
}

