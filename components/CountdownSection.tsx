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
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
];

function StrokeDigit({ char }: { char: string }) {
  return (
    <span style={{ display: "inline-block", overflow: "hidden" }}>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={char}
          initial={{ y: "-70%", opacity: 0 }}
          animate={{ y: "0%",   opacity: 1 }}
          exit={{    y:  "70%", opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          style={{
            display: "inline-block",
            fontSize: "clamp(48px, 7vw, 88px)",
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: "-0.03em",
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(155,48,255,0.85)",
            fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {char}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function UnitGroup({ value, label, index, inView }: {
  value: number;
  label: string;
  index: number;
  inView: boolean;
}) {
  const digits = pad(value).split("");
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE, delay: 0.15 + index * 0.07 }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "clamp(4px, 0.8vw, 10px)",
      }}
    >
      {/* Two outlined digits */}
      <div style={{ display: "flex", gap: "clamp(2px, 0.3vw, 5px)" }}>
        {digits.map((d, i) => (
          <StrokeDigit key={i} char={d} />
        ))}
      </div>

      {/* Label */}
      <span
        style={{
          fontSize: "clamp(18px, 2.5vw, 32px)",
          fontWeight: 700,
          color: "#ffffff",
          letterSpacing: "-0.01em",
          lineHeight: 1,
          fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
          paddingBottom: "2px",
        }}
      >
        {label}
      </span>
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
        padding: "64px 32px 72px",
        background: "#000000",
        overflow: "hidden",
      }}
    >
      {/* Subtle ambient */}
      <div aria-hidden style={{
        position: "absolute",
        left: "50%", top: "50%",
        transform: "translate(-50%, -50%)",
        width: "700px", height: "300px",
        background: "radial-gradient(ellipse, rgba(100,40,200,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Title */}
      <motion.div
        style={{ textAlign: "center", marginBottom: "40px" }}
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: EASE }}
      >
        <div style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
          <span style={{ width: "28px", height: "1px", background: "rgba(155,48,255,0.4)", display: "block" }} />
          <span style={{
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(180,140,255,0.7)",
            fontFamily: "var(--font-inter), 'Inter', sans-serif",
          }}>
            The Wait Ends In
          </span>
          <span style={{ width: "28px", height: "1px", background: "rgba(155,48,255,0.4)", display: "block" }} />
        </div>
      </motion.div>

      {/* Countdown row */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "clamp(16px, 4vw, 56px)",
        maxWidth: "1100px",
        margin: "0 auto",
      }}>
        {UNITS.map(({ key, label }, i) => (
          <UnitGroup
            key={key}
            value={time[key]}
            label={label}
            index={i}
            inView={inView}
          />
        ))}
      </div>
    </section>
  );
}
