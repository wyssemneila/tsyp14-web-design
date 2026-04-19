"use client";

import { Sparkles } from "./Sparkles";

export default function DemiSphere() {
  return (
    <div
      className="absolute bottom-0 left-1/2 overflow-hidden pointer-events-none"
      style={{
        transform: "translateX(-50%)",
        width: "clamp(520px, 65vw, 860px)",
        height: "clamp(270px, 34vw, 450px)",
        zIndex: 2,
      }}
    >
      {/* Sparkles — purple glow dots matching p1 outline colour */}
      <Sparkles
        className="absolute inset-0 w-full h-full"
        color={["#9B30FF", "#CC00FF", "#D4A0FF", "#7B10DF"]}
        size={1.4}
        minSize={0.4}
        density={90}
        speed={0.7}
        opacity={0.95}
        minOpacity={0.2}
        background="transparent"
      />

      {/* Outer ambient glow layer */}
      <div
        className="absolute bottom-0 left-1/2"
        style={{
          transform: "translateX(-50%)",
          width: "clamp(520px, 65vw, 860px)",
          height: "clamp(520px, 65vw, 860px)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 50% 50%, rgba(120,40,255,0.18) 0%, rgba(80,10,180,0.08) 50%, transparent 75%)",
          filter: "blur(30px)",
        }}
      />

      {/* The sphere body */}
      <div
        className="sphere-element absolute bottom-0 left-1/2"
        style={{
          transform: "translateX(-50%)",
          width: "clamp(520px, 65vw, 860px)",
          height: "clamp(520px, 65vw, 860px)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 38% 28%, #1c0055 0%, #0e0030 30%, #08001e 60%, #040012 85%, #020009 100%)",
          border: "1.5px solid rgba(155, 48, 255, 0.65)",
        }}
      />

      {/* Inner rim highlight — bright purple arc at the top of the sphere */}
      <div
        className="absolute bottom-0 left-1/2"
        style={{
          transform: "translateX(-50%)",
          width: "clamp(520px, 65vw, 860px)",
          height: "clamp(520px, 65vw, 860px)",
          borderRadius: "50%",
          background: "transparent",
          boxShadow:
            "inset 0 6px 40px 4px rgba(180, 80, 255, 0.22), inset 0 0 120px 0px rgba(100, 20, 220, 0.1)",
        }}
      />
    </div>
  );
}
