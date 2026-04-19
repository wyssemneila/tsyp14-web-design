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
      {/* Wide purple bloom — dramatic like p1 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "radial-gradient(ellipse 90% 50% at 50% 100%, rgba(120,50,240,0.8) 0%, rgba(90,30,190,0.45) 35%, rgba(60,15,130,0.15) 60%, transparent 75%)",
        }}
      />

      {/* Sparkles BEHIND sphere */}
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

      {/* Hemisphere — larger (w-[220%]), darker surface, strong rim glow */}
      <div
        style={{
          position: "absolute",
          left: "-60%",
          top: "46%",
          width: "220%",
          aspectRatio: "1 / 0.7",
          zIndex: 10,
          borderRadius: "100%",
          background:
            "radial-gradient(circle at 40% 26%, #1a0048 0%, #0d001e 22%, #080018 48%, #07071a 75%)",
          borderTop: "1px solid rgba(180, 130, 255, 0.6)",
          boxShadow: `
            0 -6px 80px 15px rgba(130, 55, 240, 0.7),
            0 -3px 160px 30px rgba(100, 30, 200, 0.45),
            0 -1px 240px 60px rgba(75, 15, 160, 0.2),
            inset 0 6px 60px rgba(150, 80, 255, 0.1)
          `,
        }}
      />
    </div>
  );
}
