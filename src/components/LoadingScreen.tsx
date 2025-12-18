'use client';

import { useEffect, useState, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    alpha: number;
    decay: number;
}

export default function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const fadeAnimationRef = useRef<number | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        const particles: Particle[] = [];
        let time = 0;
        let explosionTriggered = false;
        let coreSize = 2;
        let coreOpacity = 0;

        // Track if page content is ready (loaded + hydrated)
        let contentReady = false;
        let animationReachedEnd = false;

        function checkContentReady() {
            if (document.readyState === 'complete') {
                requestAnimationFrame(() => {
                    contentReady = true;
                    if (animationReachedEnd && !animationComplete) {
                        startFadeOut();
                    }
                });
            } else {
                window.addEventListener('load', () => {
                    requestAnimationFrame(() => {
                        contentReady = true;
                        if (animationReachedEnd && !animationComplete) {
                            startFadeOut();
                        }
                    });
                }, { once: true });
            }
        }
        checkContentReady();

        function createParticle(speed: number, size: number) {
            const angle = Math.random() * Math.PI * 2;
            const velocity = speed * (0.5 + Math.random() * 0.5);

            particles.push({
                x: centerX,
                y: centerY,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity,
                size: size * (0.3 + Math.random() * 0.7),
                alpha: 0.8 + Math.random() * 0.2,
                decay: 0.005 + Math.random() * 0.01,
            });
        }

        let animationId: number;
        let animationComplete = false;

        function startFadeOut() {
            if (animationComplete) return;
            animationComplete = true;

            const fadeDuration = 600;
            const startTime = performance.now();

            function animateFade(currentTime: number) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / fadeDuration, 1);
                const easeInOut = progress < 0.5
                    ? 2 * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 2) / 2;
                const opacity = 1 - easeInOut;

                if (container) {
                    container.style.opacity = String(opacity);
                    if (opacity < 0.1) {
                        container.style.pointerEvents = 'none';
                    }
                }

                if (progress < 1) {
                    fadeAnimationRef.current = requestAnimationFrame(animateFade);
                } else {
                    cancelAnimationFrame(animationId);
                    setIsLoading(false);
                }
            }

            fadeAnimationRef.current = requestAnimationFrame(animateFade);
        }

        function animate() {
            if (!ctx || !canvas) return;

            time++;

            // Subtle fade for trails
            ctx.fillStyle = 'rgba(5, 5, 8, 0.12)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Phase 1: Core builds up (0-60 frames)
            if (time < 60) {
                coreOpacity = Math.min(1, time / 40);
                coreSize = 2 + (time / 60) * 3;
            }

            // Phase 2: Explosion (frame 60)
            if (time === 60 && !explosionTriggered) {
                explosionTriggered = true;
                // Create initial burst
                for (let i = 0; i < 150; i++) {
                    createParticle(3 + Math.random() * 6, 1 + Math.random() * 1.5);
                }
            }

            // Phase 3: Continued expansion
            if (time > 60 && time < 120 && time % 3 === 0) {
                for (let i = 0; i < 10; i++) {
                    createParticle(2 + Math.random() * 4, 0.5 + Math.random());
                }
            }

            // Draw core glow
            if (coreOpacity > 0 && time < 100) {
                const fadeOut = time > 60 ? Math.max(0, 1 - (time - 60) / 40) : 1;

                // Outer glow
                const outerGlow = ctx.createRadialGradient(
                    centerX, centerY, 0,
                    centerX, centerY, coreSize * 20
                );
                outerGlow.addColorStop(0, `rgba(255, 255, 255, ${0.15 * coreOpacity * fadeOut})`);
                outerGlow.addColorStop(0.5, `rgba(255, 255, 255, ${0.05 * coreOpacity * fadeOut})`);
                outerGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');

                ctx.beginPath();
                ctx.arc(centerX, centerY, coreSize * 20, 0, Math.PI * 2);
                ctx.fillStyle = outerGlow;
                ctx.fill();

                // Inner core
                const innerGlow = ctx.createRadialGradient(
                    centerX, centerY, 0,
                    centerX, centerY, coreSize * 3
                );
                innerGlow.addColorStop(0, `rgba(255, 255, 255, ${coreOpacity * fadeOut})`);
                innerGlow.addColorStop(0.5, `rgba(255, 255, 255, ${0.5 * coreOpacity * fadeOut})`);
                innerGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');

                ctx.beginPath();
                ctx.arc(centerX, centerY, coreSize * 3, 0, Math.PI * 2);
                ctx.fillStyle = innerGlow;
                ctx.fill();
            }

            // Draw expanding ring
            if (time > 60 && time < 140) {
                const ringProgress = (time - 60) / 80;
                const ringRadius = ringProgress * Math.max(canvas.width, canvas.height) * 0.8;
                const ringOpacity = Math.max(0, 0.3 * (1 - ringProgress));

                ctx.beginPath();
                ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(255, 255, 255, ${ringOpacity})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }

            // Update and draw particles
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];

                p.x += p.vx;
                p.y += p.vy;
                p.vx *= 0.995;
                p.vy *= 0.995;
                p.alpha -= p.decay;

                if (p.alpha <= 0) {
                    particles.splice(i, 1);
                    continue;
                }

                // Simple dot
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
                ctx.fill();
            }

            // Ambient stars that fade in
            if (time > 80) {
                const starOpacity = Math.min(0.4, (time - 80) / 100);
                ctx.fillStyle = `rgba(255, 255, 255, ${starOpacity * 0.3})`;

                // Fixed star positions based on canvas size
                const starCount = 50;
                for (let i = 0; i < starCount; i++) {
                    const seed = i * 9973;
                    const sx = (seed % canvas.width);
                    const sy = ((seed * 7) % canvas.height);
                    const sSize = ((seed % 10) / 10) * 1.5 + 0.5;
                    const twinkle = Math.sin(time * 0.05 + i) * 0.3 + 0.7;

                    ctx.globalAlpha = starOpacity * twinkle;
                    ctx.beginPath();
                    ctx.arc(sx, sy, sSize, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.globalAlpha = 1;
            }

            // Animation complete check: start fade when BOTH conditions are met
            if (time >= 150 && !animationComplete) {
                animationReachedEnd = true;
                if (contentReady) {
                    startFadeOut();
                }
            }

            if (!animationComplete) {
                animationId = requestAnimationFrame(animate);
            }
        }

        // Initial black fill
        ctx.fillStyle = 'rgb(5, 5, 8)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        animate();

        return () => {
            cancelAnimationFrame(animationId);
            if (fadeAnimationRef.current) {
                cancelAnimationFrame(fadeAnimationRef.current);
            }
        };
    }, []);

    if (!isLoading) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999]"
            style={{
                background: 'rgb(5, 5, 8)',
                willChange: 'opacity',
                transform: 'translate3d(0, 0, 0)',
            }}
        >
            <canvas ref={canvasRef} className="w-full h-full" />
        </div>
    );
}
