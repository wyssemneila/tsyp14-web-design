"use client";

import { Sparkles } from "./Sparkles";

export default function DemiSphere() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "460px",
        overflow: "hidden",
        flexShrink: 0,
        maskImage: "radial-gradient(50% 50%, white, transparent)",
        WebkitMaskImage: "radial-gradient(50% 50%, white, transparent)",
        zIndex: 2,
      }}
    >
      {/* Soft purple bloom rising from sphere */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at bottom center, rgba(65, 5, 150, 0.52) 0%, rgba(20, 0, 60, 0.25) 45%, transparent 70%)",
        }}
      />

      {/* Hemisphere — black-dominant with faint purple tint on rim */}
      <div
        style={{
          position: "absolute",
          left: "-50%",
          top: "40%",
          width: "200%",
          aspectRatio: "1 / 0.72",
          zIndex: 10,
          borderRadius: "100%",
          /* Rim outline fades with the mask so no hard rectangle */
          borderTop: "1px solid rgba(155, 48, 255, 0.32)",
          /* Mostly black, ultra-dark purple only at the very top */
          background:
            "linear-gradient(180deg, #07000E 0%, #040009 18%, #020006 40%, #010004 65%, #000000 100%)",
        }}
      />

      {/* Sparkles — purple, concentrated in centre by inner mask */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 15,
          maskImage:
            "radial-gradient(50% 50%, white, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(50% 50%, white, transparent 85%)",
        }}
      >
        <Sparkles
          density={1100}
          className="absolute inset-0 w-full h-full"
          color={["#9B30FF", "#B050FF", "#7010DF", "#CC00FF", "#D4A0FF"]}
          size={1.3}
          minSize={0.3}
          speed={0.9}
          minSpeed={0.1}
          opacity={0.95}
          minOpacity={0.15}
          background="transparent"
        />
      </div>
    </div>
  );
}
