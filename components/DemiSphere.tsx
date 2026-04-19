"use client";

import { Sparkles } from "./Sparkles";

export default function DemiSphere() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "500px",
        overflow: "hidden",
        flexShrink: 0,
        maskImage: "radial-gradient(50% 50%, white, transparent)",
        WebkitMaskImage: "radial-gradient(50% 50%, white, transparent)",
      }}
    >
      {/* ── Purple bloom — concentrated at the rim area ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "radial-gradient(ellipse 80% 40% at 50% 100%, rgba(109,40,217,0.75) 0%, rgba(80,20,160,0.35) 40%, transparent 70%)",
        }}
      />

      {/* ── White sparkles BEHIND the sphere ── */}
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

      {/* ── Hemisphere — DARK surface like p1, bright purple rim glow ── */}
      <div
        style={{
          position: "absolute",
          left: "-50%",
          top: "48%",
          width: "200%",
          aspectRatio: "1 / 0.7",
          zIndex: 10,
          borderRadius: "100%",
          /* Very dark surface — near background, subtle inner purple */
          background:
            "radial-gradient(circle at 40% 28%, #1c0050 0%, #0e0028 25%, #09001e 50%, #07071a 80%)",
          /* THE KEY: bright purple rim glow like p1 */
          borderTop: "1px solid rgba(167, 139, 250, 0.55)",
          boxShadow: `
            0 -4px 60px 10px rgba(120, 50, 230, 0.65),
            0 -2px 120px 20px rgba(100, 30, 200, 0.4),
            0 -1px 200px 40px rgba(80, 20, 160, 0.2),
            inset 0 4px 40px rgba(140, 70, 255, 0.12)
          `,
        }}
      />
    </div>
  );
}
