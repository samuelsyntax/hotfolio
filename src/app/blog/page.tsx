'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface BlogPost {
    slug: string;
    title: string;
    date: string;
    description: string;
}

export default function BlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/posts')
            .then(res => res.json())
            .then(data => {
                setPosts(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div className="min-h-screen pt-24 pb-16" style={{ background: 'var(--bg)' }}>
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
                    <h1 className="gradient-text text-4xl md:text-5xl font-bold mb-4">Blog</h1>
                    <p className="text-[var(--text-muted)] text-lg max-w-2xl">
                        Thoughts, tutorials, and insights on software development, web technologies, and best practices.
                    </p>
                </div>

                {/* Blog Grid */}
                {posts.length === 0 ? (
                    <p className="text-[var(--text-muted)] text-center py-12">No posts yet. Add markdown files to content/blog/ to get started.</p>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className="bg-[var(--bg-card)] rounded-2xl overflow-hidden transition-all hover:-translate-y-2 block"
                                style={{ border: '1px solid color-mix(in srgb, var(--border) 10%, transparent)' }}
                                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 40px color-mix(in srgb, var(--accent) 15%, transparent)'; }}
                                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
                            >

                                <div className="p-6">
                                    <span className="text-sm font-medium" style={{ color: 'var(--accent)' }}>
                                        {new Date(post.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </span>
                                    <h2 className="text-lg font-semibold text-[var(--text)] my-2">{post.title}</h2>
                                    <p className="text-[var(--text-muted)] text-sm mb-4">{post.description}</p>
                                    <span
                                        className="font-medium inline-flex items-center gap-1"
                                        style={{ color: 'var(--accent)' }}
                                    >
                                        Read More
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
