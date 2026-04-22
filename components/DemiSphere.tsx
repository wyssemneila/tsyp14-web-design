"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LABELS = ["DAYS", "HRS", "MIN", "SEC"];

function useCountdown() {
  const [units, setUnits] = useState([245, 0, 0, 0]);
  useEffect(() => {
    const target = new Date("2026-12-21T00:00:00").getTime();
    const tick = () => {
      const d = target - Date.now();
      if (d <= 0) return;
      setUnits([
        Math.floor(d / 86400000),
        Math.floor((d % 86400000) / 3600000),
        Math.floor((d % 3600000) / 60000),
        Math.floor((d % 60000) / 1000),
      ]);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return units;
}

export default function DemiSphere() {
  const units = useCountdown();

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
        src="/sphere.png"
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

      {/* Countdown — glass tiles on the glowing horizon */}
      <div
        style={{
          position: "absolute",
          top: "60%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 30,
          display: "flex",
          alignItems: "center",
          gap: "clamp(6px, 1.2vw, 14px)",
          pointerEvents: "auto",
        }}
      >
        {units.map((val, i) => (
          <div key={LABELS[i]} style={{ display: "flex", alignItems: "center", gap: "clamp(6px, 1.2vw, 14px)" }}>
            {/* Glass card */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "7px",
                padding: "clamp(12px, 1.8vw, 22px) clamp(14px, 2.2vw, 30px)",
                background: "rgba(4, 2, 18, 0.55)",
                border: "1px solid rgba(155, 48, 255, 0.3)",
                borderRadius: "16px",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.07), 0 0 28px rgba(155,48,255,0.15), 0 8px 32px rgba(0,0,0,0.4)",
                minWidth: "clamp(58px, 7vw, 96px)",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={val}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    display: "block",
                    fontSize: "clamp(30px, 4.2vw, 56px)",
                    fontWeight: 800,
                    fontVariantNumeric: "tabular-nums",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    fontFamily: "var(--font-inter), 'Inter', sans-serif",
                    whiteSpace: "nowrap",
                    background: "linear-gradient(160deg, #ffffff 20%, #d8b4fe 65%, #9b30ff 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {String(val).padStart(2, "0")}
                </motion.span>
              </AnimatePresence>

              <span
                style={{
                  fontSize: "clamp(8px, 0.85vw, 10px)",
                  fontWeight: 700,
                  color: "rgba(155, 48, 255, 0.8)",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                {LABELS[i]}
              </span>
            </div>

            {/* Dot separator */}
            {i < units.length - 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "7px", paddingBottom: "20px" }}>
                <div
                  style={{
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background: "rgba(155, 48, 255, 0.65)",
                    boxShadow: "0 0 6px rgba(155,48,255,0.5)",
                  }}
                />
                <div
                  style={{
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background: "rgba(155, 48, 255, 0.65)",
                    boxShadow: "0 0 6px rgba(155,48,255,0.5)",
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
