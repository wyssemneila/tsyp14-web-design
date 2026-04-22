"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const TARGET = new Date("2026-12-21T00:00:00");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(): TimeLeft {
  const diff = Math.max(0, TARGET.getTime() - Date.now());
  return {
    days:    Math.floor(diff / 864e5),
    hours:   Math.floor((diff % 864e5) / 36e5),
    minutes: Math.floor((diff % 36e5) / 6e4),
    seconds: Math.floor((diff % 6e4) / 1000),
  };
}

function pad(n: number) { return String(n).padStart(2, "0"); }

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const UNITS: { key: keyof TimeLeft; label: string }[] = [
  { key: "days",    label: "Days"    },
  { key: "hours",   label: "Hours"   },
  { key: "minutes", label: "Min"     },
  { key: "seconds", label: "Sec"     },
];

function FlipDigit({ char }: { char: string }) {
  return (
    <div style={{ position: "relative", width: "clamp(36px, 5vw, 62px)", height: "clamp(48px, 7vw, 82px)", overflow: "hidden" }}>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={char}
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: "0%",    opacity: 1 }}
          exit={{    y:  "100%", opacity: 0 }}
          transition={{ duration: 0.28, ease: EASE }}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "clamp(32px, 5vw, 64px)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            fontVariantNumeric: "tabular-nums",
            fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
            background: "linear-gradient(160deg, #ffffff 15%, #d8b4fe 60%, #9b30ff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {char}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

function GlassCard({ value, label, index, inView }: {
  value: number;
  label: string;
  index: number;
  inView: boolean;
}) {
  const digits = pad(value).split("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: EASE, delay: 0.1 + index * 0.1 }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "clamp(10px, 1.5vw, 16px)",
        padding: "clamp(20px, 2.8vw, 38px) clamp(18px, 3vw, 48px)",
        background: "rgba(6, 2, 20, 0.6)",
        border: "1px solid rgba(155, 48, 255, 0.28)",
        borderRadius: "20px",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.06), 0 0 40px rgba(155,48,255,0.12), 0 12px 40px rgba(0,0,0,0.5)",
        minWidth: "clamp(90px, 12vw, 160px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top inner glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0, left: "20%", right: "20%",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(155,48,255,0.6), transparent)",
          pointerEvents: "none",
        }}
      />

      {/* Digits */}
      <div style={{ display: "flex", gap: "clamp(2px, 0.4vw, 6px)" }}>
        {digits.map((d, i) => <FlipDigit key={i} char={d} />)}
      </div>

      {/* Label */}
      <span style={{
        fontSize: "clamp(9px, 0.9vw, 11px)",
        fontWeight: 700,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "rgba(155, 48, 255, 0.75)",
        fontFamily: "var(--font-inter), 'Inter', sans-serif",
      }}>
        {label}
      </span>
    </motion.div>
  );
}

function DotSep({ inView, index }: { inView: boolean; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
      style={{ display: "flex", flexDirection: "column", gap: "8px", paddingBottom: "clamp(22px, 3vw, 36px)" }}
    >
      {[0, 1].map(i => (
        <div key={i} style={{
          width: "5px", height: "5px", borderRadius: "50%",
          background: "rgba(155, 48, 255, 0.6)",
          boxShadow: "0 0 8px rgba(155,48,255,0.5)",
        }} />
      ))}
    </motion.div>
  );
}

export default function CountdownSection() {
  const [time, setTime] = useState<TimeLeft>(calcTimeLeft);
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
        padding: "80px 24px 100px",
        background: "#000000",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Ambient glow */}
      <div aria-hidden style={{
        position: "absolute",
        left: "50%", top: "50%",
        transform: "translate(-50%, -50%)",
        width: "800px", height: "400px",
        background: "radial-gradient(ellipse, rgba(120,40,220,0.09) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Eyebrow */}
      <motion.div
        style={{ textAlign: "center", marginBottom: "56px" }}
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: EASE }}
      >
        <div style={{ display: "inline-flex", alignItems: "center", gap: "12px" }}>
          <span style={{ width: "32px", height: "1px", background: "rgba(155,48,255,0.4)", display: "block" }} />
          <span style={{
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(180,140,255,0.65)",
            fontFamily: "var(--font-inter), 'Inter', sans-serif",
          }}>
            The Wait Ends In
          </span>
          <span style={{ width: "32px", height: "1px", background: "rgba(155,48,255,0.4)", display: "block" }} />
        </div>

        <p style={{
          marginTop: "10px",
          fontSize: "12px",
          color: "rgba(255,255,255,0.2)",
          letterSpacing: "0.08em",
          fontFamily: "var(--font-inter), 'Inter', sans-serif",
        }}>
          21 December 2026 · Tunis, Tunisia
        </p>
      </motion.div>

      {/* Cards row */}
      <div className="countdown-row" style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "clamp(8px, 1.5vw, 20px)",
        flexWrap: "nowrap",
      }}>
        {UNITS.map(({ key, label }, i) => (
          <div key={key} style={{ display: "flex", alignItems: "center", gap: "clamp(8px, 1.5vw, 20px)" }}>
            <GlassCard value={time[key]} label={label} index={i} inView={inView} />
            {i < UNITS.length - 1 && <DotSep inView={inView} index={i} />}
          </div>
        ))}
      </div>
    </section>
  );
}
