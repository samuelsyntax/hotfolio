export interface BlogPost {
    id: number;
    icon: string;
    date: string;
    title: string;
    desc: string;
    content?: string;
}

export const blogPosts: BlogPost[] = [
    {
        id: 1,
        icon: '📝',
        date: 'Dec 10, 2025',
        title: 'Building Scalable React Applications',
        desc: 'Learn the best practices for structuring large-scale React projects with maintainable code.',
        content: 'Full article content about building scalable React applications...'
    },
    {
        id: 2,
        icon: '🚀',
        date: 'Dec 5, 2025',
        title: 'Optimizing Node.js Performance',
        desc: 'Deep dive into performance optimization techniques for Node.js applications.',
        content: 'Full article content about Node.js performance optimization...'
    },
    {
        id: 3,
        icon: '🔐',
        date: 'Nov 28, 2025',
        title: 'Modern Authentication Patterns',
        desc: 'Exploring OAuth 2.0, JWT, and secure authentication strategies for web apps.',
        content: 'Full article content about modern authentication patterns...'
    },
    {
        id: 4,
        icon: '⚡',
        date: 'Nov 20, 2025',
        title: 'The Power of TypeScript',
        desc: 'Why TypeScript is becoming the standard for modern JavaScript development.',
        content: 'Full article content about TypeScript benefits...'
    },
    {
        id: 5,
        icon: '🎨',
        date: 'Nov 15, 2025',
        title: 'CSS Architecture for Large Projects',
        desc: 'Strategies for organizing CSS in enterprise-level applications.',
        content: 'Full article content about CSS architecture...'
    },
    {
        id: 6,
        icon: '🔧',
        date: 'Nov 10, 2025',
        title: 'DevOps Best Practices',
        desc: 'Essential DevOps practices for modern software development teams.',
        content: 'Full article content about DevOps best practices...'
    },
];

export const getLatestPosts = (count: number): BlogPost[] => blogPosts.slice(0, count);
