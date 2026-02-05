"use client";

import { useEffect, useRef, useState } from "react";

interface CanvasAnimationProps {
  isPlaying: boolean;
  settings: {
    colorPrimary: string;
    colorSecondary: string;
    speed: number;
    particleSize: number;
    density: number;
    rotation: number;
  };
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
}

export default function CanvasAnimation({ isPlaying, settings, className }: CanvasAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [clickPos, setClickPos] = useState<{ x: number; y: number; time: number } | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const timeRef = useRef(0);
  const scrollRef = useRef(0);

  // Initialize particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      const count = Math.floor((settings.density / 100) * 200);
      for (let i = 0; i < count; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          size: Math.random() * settings.particleSize + 1,
          color: Math.random() > 0.5 ? settings.colorPrimary : settings.colorSecondary,
          life: Math.random(),
          maxLife: 1,
        });
      }
    };

    initParticles();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [settings.density, settings.particleSize, settings.colorPrimary, settings.colorSecondary]);

  // Mouse tracking
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      setClickPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        time: Date.now(),
      });
    };

    const handleScroll = () => {
      scrollRef.current = window.scrollY / 1000;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("click", handleClick);
    window.addEventListener("scroll", handleScroll);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("click", handleClick);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isPlaying) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      timeRef.current += 0.01 * settings.speed;

      // Draw gradient background
      const gradient = ctx.createRadialGradient(
        mousePos.x,
        mousePos.y,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height)
      );
      gradient.addColorStop(0, `${settings.colorPrimary}20`);
      gradient.addColorStop(0.5, `${settings.colorSecondary}10`);
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw wave effect
      ctx.strokeStyle = settings.colorPrimary;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i < canvas.width; i += 2) {
        const y =
          canvas.height / 2 +
          Math.sin((i / 100 + timeRef.current) * 2) * 50 +
          Math.sin((i / 50 + timeRef.current * 1.5) * 2) * 30;
        if (i === 0) {
          ctx.moveTo(i, y);
        } else {
          ctx.lineTo(i, y);
        }
      }
      ctx.stroke();

      // Draw secondary wave
      ctx.strokeStyle = settings.colorSecondary;
      ctx.beginPath();
      for (let i = 0; i < canvas.width; i += 2) {
        const y =
          canvas.height / 2 +
          Math.cos((i / 80 + timeRef.current * 1.2) * 2) * 40 +
          Math.cos((i / 40 + timeRef.current * 2) * 2) * 20;
        if (i === 0) {
          ctx.moveTo(i, y);
        } else {
          ctx.lineTo(i, y);
        }
      }
      ctx.stroke();

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        // Mouse influence
        const dx = mousePos.x - particle.x;
        const dy = mousePos.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const force = Math.min(100 / (distance + 1), 2);
        particle.vx += (dx / distance) * force * 0.01;
        particle.vy += (dy / distance) * force * 0.01;

        // Click ripple effect
        if (clickPos && Date.now() - clickPos.time < 1000) {
          const clickDx = clickPos.x - particle.x;
          const clickDy = clickPos.y - particle.y;
          const clickDistance = Math.sqrt(clickDx * clickDx + clickDy * clickDy);
          const clickForce = Math.min(200 / (clickDistance + 1), 5);
          const elapsed = (Date.now() - clickPos.time) / 1000;
          particle.vx += (clickDx / clickDistance) * clickForce * 0.02 * (1 - elapsed);
          particle.vy += (clickDy / clickDistance) * clickForce * 0.02 * (1 - elapsed);
        }

        // Scroll influence
        particle.vy += scrollRef.current * 0.1;

        // Update position
        particle.x += particle.vx * settings.speed;
        particle.y += particle.vy * settings.speed;

        // Boundary wrap
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Damping
        particle.vx *= 0.98;
        particle.vy *= 0.98;

        // Update life
        particle.life += 0.01;
        if (particle.life > particle.maxLife) {
          particle.life = 0;
        }

        // Draw particle
        const alpha = Math.sin((particle.life / particle.maxLife) * Math.PI);
        ctx.fillStyle = `${particle.color}${Math.floor(alpha * 255).toString(16).padStart(2, "0")}`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw connection lines
        particlesRef.current.forEach((other) => {
          const dx = other.x - particle.x;
          const dy = other.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            ctx.strokeStyle = `${particle.color}${Math.floor((1 - distance / 100) * 50).toString(16).padStart(2, "0")}`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        });
      });

      // Draw geometric shapes
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((timeRef.current * settings.rotation) / 10);
      ctx.strokeStyle = settings.colorPrimary;
      ctx.lineWidth = 2;
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        const radius = 50 + i * 30 + Math.sin(timeRef.current + i) * 20;
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, settings, mousePos, clickPos]);

  return <canvas ref={canvasRef} className={className} style={{ display: "block" }} />;
}
