import Link from 'next/link';
import { getPostBySlug, getAllPostSlugs } from '@/lib/blog';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const slugs = getAllPostSlugs();
    return slugs.map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen pt-24 pb-16" style={{ background: 'var(--bg)' }}>
            <article className="max-w-4xl mx-auto px-6">
                {/* Back Link */}
                <Link
                    href="/blog"
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
                    Back to Blog
                </Link>

                {/* Post Header */}
                <header className="mb-16 pb-8 border-b" style={{ borderColor: 'var(--border)' }}>
                    <div className="flex items-center gap-4 mb-6">
                        <span
                            className="px-4 py-1.5 rounded-full text-sm font-medium"
                            style={{
                                background: 'color-mix(in srgb, var(--accent) 15%, transparent)',
                                color: 'var(--accent)'
                            }}
                        >
                            {new Date(post.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </span>
                    </div>
                    <h1 className="gradient-text text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                        {post.title}
                    </h1>
                    <p className="text-[var(--text-muted)] text-xl leading-relaxed">
                        {post.description}
                    </p>
                </header>

                {/* Post Content */}
                <div
                    className="blog-content"
                    dangerouslySetInnerHTML={{ __html: post.content || '' }}
                />

                {/* Footer */}
                <footer className="mt-16 pt-8 border-t" style={{ borderColor: 'var(--border)' }}>
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-3 px-6 py-3 rounded-full font-medium transition-all hover:-translate-y-0.5"
                        style={{
                            background: 'var(--accent)',
                            color: 'var(--accent-text)',
                            boxShadow: '0 4px 20px color-mix(in srgb, var(--accent) 30%, transparent)'
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Back to All Posts
                    </Link>
                </footer>
            </article>
        </div>
    );
}
