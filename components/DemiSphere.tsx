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
        /* Fades the rectangle corners away — exact demo.tsx technique */
        maskImage: "radial-gradient(50% 50%, white, transparent)",
        WebkitMaskImage: "radial-gradient(50% 50%, white, transparent)",
      }}
    >
      {/* Purple glow rising from the sphere — matches demo.tsx */}
      <div
        style={{
          position: "absolute",
          inset: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at bottom center, #6432c8, transparent 70%)",
            opacity: 0.42,
          }}
        />
      </div>

      {/* Hemisphere — bg = page color so edges blend perfectly */}
      <div
        style={{
          position: "absolute",
          left: "-50%",
          top: "50%",
          width: "200%",
          aspectRatio: "1 / 0.7",
          zIndex: 10,
          borderRadius: "100%",
          borderTop: "1px solid rgba(255,255,255,0.18)",
          background: "#07071a",
        }}
      />

      {/* Sparkles — white, concentrated in centre by inner mask */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 15,
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
    </div>
  );
}
