"use client";

import { Sparkles } from "./Sparkles";

export default function DemiSphere() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "420px",
        overflow: "hidden",
        flexShrink: 0,
        maskImage: "radial-gradient(50% 50%, white, transparent)",
        WebkitMaskImage: "radial-gradient(50% 50%, white, transparent)",
      }}
    >
      {/* ── Layer 1: purple bloom glow behind everything ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "radial-gradient(circle at bottom center, #6432c8, transparent 65%)",
          opacity: 0.5,
        }}
      />

      {/* ── Layer 2: white sparkles — BEHIND the sphere ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 5,
          maskImage: "radial-gradient(50% 50%, white, transparent 85%)",
          WebkitMaskImage: "radial-gradient(50% 50%, white, transparent 85%)",
        }}
      >
        <Sparkles
          density={1200}
          className="absolute inset-x-0 bottom-0 h-full w-full"
          color="#ffffff"
          size={1}
          speed={1}
          opacity={0.9}
        />
      </div>

      {/* ── Layer 3: hemisphere — rich purple 3D sphere ON TOP of particles ── */}
      <div
        style={{
          position: "absolute",
          left: "-50%",
          top: "50%",
          width: "200%",
          aspectRatio: "1 / 0.7",
          zIndex: 10,
          borderRadius: "100%",
          /* Rich purple gradient — light source top-left, dark toward edges */
          background:
            "radial-gradient(circle at 38% 32%, #8b5cf6 0%, #6d28d9 20%, #4c1d95 42%, #2e1065 62%, #150530 80%, #07071a 100%)",
          /* Top rim highlight */
          borderTop: "1px solid rgba(167,139,250,0.35)",
          /* 3D black shadow — separates sphere from background */
          boxShadow:
            "0 40px 120px rgba(0,0,0,0.95), 0 0 80px rgba(0,0,0,0.7), inset 0 2px 0 rgba(255,255,255,0.08), 0 0 60px rgba(109,40,217,0.35)",
        }}
      />
    </div>
  );
}
