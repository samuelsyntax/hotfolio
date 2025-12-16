'use client';

import { useEffect, useRef } from 'react';

const posts = [
    { id: 1, icon: '📝', date: 'Dec 10, 2025', title: 'Building Scalable React Applications', desc: 'Learn the best practices for structuring large-scale React projects with maintainable code.' },
    { id: 2, icon: '🚀', date: 'Dec 5, 2025', title: 'Optimizing Node.js Performance', desc: 'Deep dive into performance optimization techniques for Node.js applications.' },
    { id: 3, icon: '🔐', date: 'Nov 28, 2025', title: 'Modern Authentication Patterns', desc: 'Exploring OAuth 2.0, JWT, and secure authentication strategies for web apps.' },
];

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
                    {posts.map((post) => (
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
                                <a href="#" className="font-medium transition-opacity" style={{ color: 'var(--accent)' }}
                                    onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}>Read More →</a>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
