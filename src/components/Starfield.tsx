'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface Star {
    x: number;
    y: number;
    z: number;
    size: number;
    baseX: number;
    baseY: number;
}

interface ShootingStar {
    x: number;
    y: number;
    vx: number;
    vy: number;
    trail: { x: number; y: number; alpha: number }[];
    size: number;
    active: boolean;
}

export default function Starfield() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const starsRef = useRef<Star[]>([]);
    const shootingStarRef = useRef<ShootingStar | null>(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const scrollRef = useRef(0);
    const { themeValue } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // Regenerate star positions for the new canvas size
            const starCount = 200;
            starsRef.current = Array.from({ length: starCount }, () => {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                return {
                    x,
                    y,
                    z: Math.random() * 3 + 1,
                    size: Math.random() * 2 + 0.5,
                    baseX: x,
                    baseY: y,
                };
            });
        };
        resize();
        window.addEventListener('resize', resize);

        // Initialize shooting star
        const initShootingStar = (): ShootingStar => {
            const side = Math.floor(Math.random() * 4);
            let x: number, y: number, vx: number, vy: number;
            const speed = 3 + Math.random() * 2;

            switch (side) {
                case 0: // top
                    x = Math.random() * canvas.width;
                    y = -10;
                    vx = (Math.random() - 0.5) * speed;
                    vy = Math.abs(speed);
                    break;
                case 1: // right
                    x = canvas.width + 10;
                    y = Math.random() * canvas.height;
                    vx = -Math.abs(speed);
                    vy = (Math.random() - 0.5) * speed;
                    break;
                case 2: // bottom
                    x = Math.random() * canvas.width;
                    y = canvas.height + 10;
                    vx = (Math.random() - 0.5) * speed;
                    vy = -Math.abs(speed);
                    break;
                default: // left
                    x = -10;
                    y = Math.random() * canvas.height;
                    vx = Math.abs(speed);
                    vy = (Math.random() - 0.5) * speed;
            }

            return {
                x, y, vx, vy,
                trail: [],
                size: 3,
                active: true
            };
        };

        shootingStarRef.current = initShootingStar();

        // Mouse tracking
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Scroll tracking for parallax
        const handleScroll = () => {
            scrollRef.current = window.scrollY;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Check collision with stars
        const checkCollision = (shootingStar: ShootingStar): Star | null => {
            for (const star of starsRef.current) {
                const dx = shootingStar.x - star.x;
                const dy = shootingStar.y - star.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const collisionRadius = star.size * 3 + shootingStar.size;

                if (distance < collisionRadius) {
                    return star;
                }
            }
            return null;
        };

        // Reflect shooting star off a star
        const reflect = (shootingStar: ShootingStar, star: Star) => {
            const dx = shootingStar.x - star.x;
            const dy = shootingStar.y - star.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Normalize the collision normal
            const nx = dx / distance;
            const ny = dy / distance;

            // Reflect velocity: v' = v - 2(v·n)n
            const dot = shootingStar.vx * nx + shootingStar.vy * ny;
            shootingStar.vx = shootingStar.vx - 2 * dot * nx;
            shootingStar.vy = shootingStar.vy - 2 * dot * ny;

            // Add some randomness to bounce
            shootingStar.vx += (Math.random() - 0.5) * 0.5;
            shootingStar.vy += (Math.random() - 0.5) * 0.5;

            // Move away from star to prevent multiple collisions
            shootingStar.x = star.x + nx * (star.size * 3 + shootingStar.size + 5);
            shootingStar.y = star.y + ny * (star.size * 3 + shootingStar.size + 5);
        };

        // Animation loop
        let animationId: number;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Calculate opacity based on theme (0 = dark = full stars, 100 = light = no stars)
            const opacity = 1 - (themeValue / 100);

            if (opacity > 0.01) {
                // Draw stars
                starsRef.current.forEach(star => {
                    // Parallax effect based on cursor
                    const centerX = canvas.width / 2;
                    const centerY = canvas.height / 2;
                    const deltaX = (mouseRef.current.x - centerX) / centerX;
                    const deltaY = (mouseRef.current.y - centerY) / centerY;

                    // Stars move opposite to cursor, scaled by depth (z)
                    const parallaxX = deltaX * 30 * star.z;
                    const parallaxY = deltaY * 30 * star.z;

                    // Scroll parallax - stars move up at different rates
                    const scrollParallax = scrollRef.current * (star.z * 0.15);

                    star.x = star.baseX - parallaxX;
                    star.y = star.baseY - parallaxY + scrollParallax;

                    // Draw star with glow
                    const gradient = ctx.createRadialGradient(
                        star.x, star.y, 0,
                        star.x, star.y, star.size * 2
                    );
                    gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
                    gradient.addColorStop(0.5, `rgba(200, 180, 255, ${opacity * 0.5})`);
                    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

                    ctx.beginPath();
                    ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
                    ctx.fillStyle = gradient;
                    ctx.fill();

                    // Bright center
                    ctx.beginPath();
                    ctx.arc(star.x, star.y, star.size * 0.5, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
                    ctx.fill();
                });

                // Update and draw shooting star
                const shootingStar = shootingStarRef.current;
                if (shootingStar && shootingStar.active) {
                    // Add current position to trail
                    shootingStar.trail.unshift({ x: shootingStar.x, y: shootingStar.y, alpha: 1 });

                    // Limit trail length
                    if (shootingStar.trail.length > 25) {
                        shootingStar.trail.pop();
                    }

                    // Update trail alpha
                    shootingStar.trail.forEach((point, i) => {
                        point.alpha = 1 - (i / shootingStar.trail.length);
                    });

                    // Draw trail
                    for (let i = shootingStar.trail.length - 1; i >= 0; i--) {
                        const point = shootingStar.trail[i];
                        const trailSize = shootingStar.size * (1 - i / shootingStar.trail.length);

                        // Glow effect
                        const glowGradient = ctx.createRadialGradient(
                            point.x, point.y, 0,
                            point.x, point.y, trailSize * 3
                        );
                        glowGradient.addColorStop(0, `rgba(255, 255, 255, ${point.alpha * opacity})`);
                        glowGradient.addColorStop(0.3, `rgba(200, 200, 255, ${point.alpha * 0.5 * opacity})`);
                        glowGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

                        ctx.beginPath();
                        ctx.arc(point.x, point.y, trailSize * 3, 0, Math.PI * 2);
                        ctx.fillStyle = glowGradient;
                        ctx.fill();
                    }

                    // Draw shooting star head
                    const headGradient = ctx.createRadialGradient(
                        shootingStar.x, shootingStar.y, 0,
                        shootingStar.x, shootingStar.y, shootingStar.size * 4
                    );
                    headGradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
                    headGradient.addColorStop(0.2, `rgba(220, 220, 255, ${opacity * 0.8})`);
                    headGradient.addColorStop(0.5, `rgba(180, 180, 255, ${opacity * 0.4})`);
                    headGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

                    ctx.beginPath();
                    ctx.arc(shootingStar.x, shootingStar.y, shootingStar.size * 4, 0, Math.PI * 2);
                    ctx.fillStyle = headGradient;
                    ctx.fill();

                    // Bright core
                    ctx.beginPath();
                    ctx.arc(shootingStar.x, shootingStar.y, shootingStar.size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
                    ctx.fill();

                    // Check for collision
                    const collidedStar = checkCollision(shootingStar);
                    if (collidedStar) {
                        reflect(shootingStar, collidedStar);
                    }

                    // Update position
                    shootingStar.x += shootingStar.vx;
                    shootingStar.y += shootingStar.vy;

                    // Check if out of bounds - respawn
                    const margin = 100;
                    if (
                        shootingStar.x < -margin ||
                        shootingStar.x > canvas.width + margin ||
                        shootingStar.y < -margin ||
                        shootingStar.y > canvas.height + margin
                    ) {
                        shootingStarRef.current = initShootingStar();
                    }
                }
            }

            animationId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
            cancelAnimationFrame(animationId);
        };
    }, [themeValue]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ background: 'transparent' }}
        />
    );
}
