"use client";

import { useRef, useEffect } from "react";

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const mouse = { x: null as number | null, y: null as number | null, radius: 180 };

    class Particle {
      x: number;
      y: number;
      directionX: number;
      directionY: number;
      size: number;
      color: string;

      constructor(
        x: number,
        y: number,
        directionX: number,
        directionY: number,
        size: number,
        color: string
      ) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
      }

      draw() {
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx!.fillStyle = this.color;
        ctx!.fill();
      }

      update(w: number, h: number) {
        if (this.x > w || this.x < 0) this.directionX = -this.directionX;
        if (this.y > h || this.y < 0) this.directionY = -this.directionY;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius + this.size) {
            const force = (mouse.radius - distance) / mouse.radius;
            this.x -= (dx / distance) * force * 5;
            this.y -= (dy / distance) * force * 5;
          }
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    let particles: Particle[] = [];

    function init() {
      particles = [];
      const count = (canvas!.height * canvas!.width) / 9000;
      for (let i = 0; i < count; i++) {
        const size = Math.random() * 1.8 + 0.5;
        const x = Math.random() * (canvas!.width - size * 4) + size * 2;
        const y = Math.random() * (canvas!.height - size * 4) + size * 2;
        const dX = (Math.random() * 0.4) - 0.2;
        const dY = (Math.random() * 0.4) - 0.2;
        // Purple/violet particles matching p1 palette
        const colors = [
          "rgba(191, 128, 255, 0.75)",
          "rgba(204, 0, 255, 0.5)",
          "rgba(155, 48, 255, 0.65)",
          "rgba(220, 180, 255, 0.6)",
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push(new Particle(x, y, dX, dY, size, color));
      }
    }

    function connect() {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = dx * dx + dy * dy;
          const threshold = (canvas!.width / 7) * (canvas!.height / 7);

          if (dist < threshold) {
            const opacity = 1 - dist / 20000;
            if (mouse.x !== null && mouse.y !== null) {
              const mdx = particles[a].x - mouse.x;
              const mdy = particles[a].y - mouse.y;
              const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
              ctx!.strokeStyle =
                mdist < mouse.radius
                  ? `rgba(255, 255, 255, ${opacity * 1.0})`
                  : `rgba(230, 230, 240, ${opacity * 0.75})`;
            } else {
              ctx!.strokeStyle = `rgba(220, 220, 235, ${opacity * 0.63})`;
            }
            ctx!.lineWidth = 0.5;
            ctx!.beginPath();
            ctx!.moveTo(particles[a].x, particles[a].y);
            ctx!.lineTo(particles[b].x, particles[b].y);
            ctx!.stroke();
          }
        }
      }
    }

    const resize = () => {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
      init();
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseout", onMouseOut);
    resize();

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      particles.forEach((p) => p.update(canvas!.width, canvas!.height));
      connect();
    }
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseout", onMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{
        zIndex: 0,
        maskImage: "linear-gradient(to bottom, black 45%, transparent 72%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 45%, transparent 72%)",
      }}
    />
  );
}
