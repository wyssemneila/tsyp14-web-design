"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const TARGET = new Date("2026-12-21T00:00:00");

function calcTimeLeft() {
  const diff = Math.max(0, TARGET.getTime() - Date.now());
  return {
    days:    Math.floor(diff / 864e5),
    hours:   Math.floor((diff % 864e5) / 36e5),
    minutes: Math.floor((diff % 36e5) / 6e4),
    seconds: Math.floor((diff % 6e4) / 1000),
  };
}

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const UNITS = [
  { key: "days"    as const, label: "Days"  },
  { key: "hours"   as const, label: "Hours" },
  { key: "minutes" as const, label: "Min"   },
  { key: "seconds" as const, label: "Sec"   },
];

/* Slot-machine digit — a strip of 0-9 that slides to the correct position */
function SlotDigit({ char }: { char: string }) {
  const num = parseInt(char) || 0;
  const containerRef = useRef<HTMLDivElement>(null);
  const [itemH, setItemH] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(() => {
      if (containerRef.current) setItemH(containerRef.current.clientHeight);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        height: "clamp(68px, 10vw, 124px)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <motion.div
        animate={{ y: itemH ? -num * itemH : 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        style={{ willChange: "transform" }}
      >
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={i}
            style={{
              height: "clamp(68px, 10vw, 124px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{
              fontSize: "clamp(68px, 10vw, 124px)",
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: "-0.045em",
              fontVariantNumeric: "tabular-nums",
              fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
              color: "#ffffff",
              display: "block",
            }}>
              {i}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Top + bottom fade masks so the reel feels infinite */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "linear-gradient(to bottom, #000 0%, transparent 28%, transparent 72%, #000 100%)",
      }} />
    </div>
  );
}

function UnitBlock({ value, label, index, inView }: {
  value: number; label: string; index: number; inView: boolean;
}) {
  const digits = String(value).padStart(2, "0").split("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: EASE, delay: 0.06 * index }}
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0 clamp(10px, 2.5vw, 40px)",
      }}
    >
      <span style={{
        fontSize: "10px",
        fontWeight: 700,
        letterSpacing: "0.35em",
        textTransform: "uppercase",
        color: "rgba(155, 48, 255, 0.6)",
        fontFamily: "var(--font-inter), 'Inter', sans-serif",
        marginBottom: "clamp(12px, 1.8vw, 22px)",
        display: "block",
      }}>
        {label}
      </span>

      <div style={{ display: "flex", gap: "clamp(2px, 0.4vw, 5px)" }}>
        {digits.map((d, i) => <SlotDigit key={i} char={d} />)}
      </div>
    </motion.div>
  );
}

export default function CountdownSection() {
  const [time, setTime] = useState(calcTimeLeft);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-40px" });

  useEffect(() => {
    const id = setInterval(() => setTime(calcTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="countdown"
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        padding: "88px 0 104px",
        background: "#000000",
        overflow: "hidden",
      }}
    >
      {/* Ambient */}
      <div aria-hidden style={{
        position: "absolute", left: "50%", top: "55%",
        transform: "translate(-50%,-50%)",
        width: "1000px", height: "500px",
        background: "radial-gradient(ellipse, rgba(100,28,210,0.11) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: EASE }}
        style={{ textAlign: "center", marginBottom: "clamp(44px, 6vw, 72px)" }}
      >
        <div style={{ display: "inline-flex", alignItems: "center", gap: "14px" }}>
          <div style={{ width: "36px", height: "1px", background: "linear-gradient(90deg, transparent, rgba(155,48,255,0.5))" }} />
          <span style={{
            fontSize: "10px", fontWeight: 700, letterSpacing: "0.38em",
            textTransform: "uppercase", color: "rgba(180,140,255,0.5)",
            fontFamily: "var(--font-inter), 'Inter', sans-serif",
          }}>
            The Wait Ends In
          </span>
          <div style={{ width: "36px", height: "1px", background: "linear-gradient(90deg, rgba(155,48,255,0.5), transparent)" }} />
        </div>
      </motion.div>

      {/* Counter */}
      <div
        className="countdown-units"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        {UNITS.map(({ key, label }, i) => (
          <div key={key} style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <UnitBlock value={time[key]} label={label} index={i} inView={inView} />
            {i < UNITS.length - 1 && (
              <motion.div
                initial={{ scaleY: 0, opacity: 0 }}
                animate={inView ? { scaleY: 1, opacity: 1 } : {}}
                transition={{ duration: 0.7, ease: EASE, delay: 0.3 + i * 0.08 }}
                style={{
                  width: "1px",
                  height: "clamp(52px, 7vw, 90px)",
                  background: "linear-gradient(to bottom, transparent, rgba(155,48,255,0.3), transparent)",
                  flexShrink: 0,
                  transformOrigin: "center",
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Bottom accent */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1.3, ease: EASE, delay: 0.5 }}
        style={{
          maxWidth: "900px", margin: "clamp(28px,5vw,48px) auto 0",
          padding: "0 24px", transformOrigin: "center",
        }}
      >
        <div style={{
          height: "1px",
          background: "linear-gradient(90deg, transparent 0%, rgba(155,48,255,0.45) 25%, rgba(200,80,220,0.35) 50%, rgba(155,48,255,0.45) 75%, transparent 100%)",
        }} />
        <p style={{
          marginTop: "16px", textAlign: "center",
          fontSize: "10px", color: "rgba(255,255,255,0.18)",
          letterSpacing: "0.18em", textTransform: "uppercase",
          fontFamily: "var(--font-inter), 'Inter', sans-serif",
        }}>
          21 December 2026 · Tunis, Tunisia
        </p>
      </motion.div>
    </section>
  );
}
