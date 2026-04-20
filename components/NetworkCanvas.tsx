"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  opacity: number;
}

const NODE_COUNT = 90;
const MAX_DIST   = 160;

export default function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const nodesRef  = useRef<Node[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;

    function resize() {
      if (!canvas) return;
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }

    function makeNode(): Node {
      const speed = 0.18 + Math.random() * 0.22;
      const angle = Math.random() * Math.PI * 2;
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: 1.6 + Math.random() * 1.4,
        opacity: 0.22 + Math.random() * 0.35,
      };
    }

    function init() {
      resize();
      nodesRef.current = Array.from({ length: NODE_COUNT }, makeNode);
    }

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, W, H);

      const nodes = nodesRef.current;

      // Update positions
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -12) n.x = W + 12;
        if (n.x > W + 12) n.x = -12;
        if (n.y < -12) n.y = H + 12;
        if (n.y > H + 12) n.y = -12;
      }

      // Draw edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx   = nodes[i].x - nodes[j].x;
          const dy   = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.16;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(155,48,255,${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw dots
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(155,48,255,${n.opacity})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);

    init();
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
