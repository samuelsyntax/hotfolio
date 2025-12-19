export interface Project {
    id: number;
    category: 'web' | 'mobile' | 'api';
    title: string;
    desc: string;
    tags: string[];
    featured: boolean;
    liveUrl?: string;
    githubUrl?: string;
}

export const projects: Project[] = [
    {
        id: 1,
        category: 'web',
        title: 'E-Commerce Platform',
        desc: 'Full-stack shopping platform with real-time inventory and payment processing.',
        tags: ['React', 'Node.js', 'MongoDB'],
        featured: true,
        liveUrl: '#',
        githubUrl: '#'
    },
    {
        id: 2,
        category: 'mobile',
        title: 'Fitness Tracker',
        desc: 'Mobile app for tracking workouts, nutrition, and health metrics.',
        tags: ['React Native', 'Firebase'],
        featured: true,
        liveUrl: '#',
        githubUrl: '#'
    },
    {
        id: 3,
        category: 'api',
        title: 'API Gateway Service',
        desc: 'Microservices API gateway with rate limiting and authentication.',
        tags: ['Python', 'FastAPI', 'Docker'],
        featured: true,
        liveUrl: '#',
        githubUrl: '#'
    },
    {
        id: 4,
        category: 'web',
        title: 'Analytics Dashboard',
        desc: 'Real-time data visualization dashboard with interactive charts.',
        tags: ['Vue.js', 'D3.js', 'PostgreSQL'],
        featured: false,
        liveUrl: '#',
        githubUrl: '#'
    },
    {
        id: 5,
        category: 'web',
        title: 'Task Management App',
        desc: 'Collaborative task management tool with Kanban boards and team features.',
        tags: ['Next.js', 'Prisma', 'PostgreSQL'],
        featured: false,
        liveUrl: '#',
        githubUrl: '#'
    },
    {
        id: 6,
        category: 'mobile',
        title: 'Weather App',
        desc: 'Beautiful weather application with real-time forecasts and location tracking.',
        tags: ['Flutter', 'Dart', 'OpenWeather API'],
        featured: false,
        liveUrl: '#',
        githubUrl: '#'
    },
];

export const featuredProjects = projects.filter(p => p.featured).slice(0, 3);
