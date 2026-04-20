"use client";

import { Sparkles } from "./Sparkles";

export default function DemiSphere() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "560px",
        overflow: "hidden",
        flexShrink: 0,
        maskImage: "radial-gradient(50% 50%, white, transparent)",
        WebkitMaskImage: "radial-gradient(50% 50%, white, transparent)",
      }}
    >
      {/* Sparkles BEHIND the sphere */}
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

      {/* Sphere — bg matches page so only the glowing rim is visible */}
      <div
        style={{
          position: "absolute",
          left: "-60%",
          top: "46%",
          width: "220%",
          aspectRatio: "1 / 0.7",
          zIndex: 10,
          borderRadius: "100%",
          background: "radial-gradient(ellipse at 50% 30%, #0d0d2b 0%, #07071a 60%)",
          borderTop: "1.5px solid rgba(160, 80, 255, 0.9)",
          boxShadow:
            "0 -4px 40px 8px rgba(130, 50, 255, 0.85), 0 -2px 80px 15px rgba(100, 30, 220, 0.4), inset 0 4px 30px rgba(120, 50, 255, 0.08)",
        }}
      />
    </div>
  );
}
