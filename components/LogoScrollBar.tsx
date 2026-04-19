"use client";

import Image from "next/image";

const LOGO_COUNT = 8;

export default function LogoScrollBar() {
  const items = Array.from({ length: LOGO_COUNT }, (_, i) => i);

  return (
    <div
      style={{
        width: "100%",
        background: "#000000",
        padding: "22px 0",
        overflow: "hidden",
        position: "relative",
        borderTop: "1px solid rgba(155, 48, 255, 0.12)",
      }}
    >
      {/* Left fade vignette */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "140px",
          background: "linear-gradient(to right, #000000, transparent)",
          zIndex: 10,
          pointerEvents: "none",
        }}
      />
      {/* Right fade vignette */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "140px",
          background: "linear-gradient(to left, #000000, transparent)",
          zIndex: 10,
          pointerEvents: "none",
        }}
      />

      {/* Duplicated track for seamless loop */}
      <div className="logo-scroll-track">
        {[...items, ...items].map((_, i) => (
          <div
            key={i}
            style={{
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src="/lg.webp"
              alt="IEEE TSYP"
              width={90}
              height={30}
              style={{
                objectFit: "contain",
                opacity: 0.55,
                filter: "brightness(1.1)",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
