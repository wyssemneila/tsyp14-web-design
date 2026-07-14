"use client";

import Image from "next/image";
import { useTheme } from "@/components/ThemeProvider";

export default function DemiSphere() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 2,
        pointerEvents: "none",
      }}
    >
      <Image
        src={isLight ? "/sphere-light.png" : "/sphere.png"}
        alt=""
        fill
        priority
        style={{
          objectFit: "cover",
          objectPosition: "center 30%",
          maskImage:
            "radial-gradient(ellipse 90% 80% at 50% 65%, black 30%, rgba(0,0,0,0.6) 60%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 80% at 50% 65%, black 30%, rgba(0,0,0,0.6) 60%, transparent 85%)",
          opacity: 0.95,
        }}
      />
    </div>
  );
}
