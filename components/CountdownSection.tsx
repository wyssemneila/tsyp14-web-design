"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const TARGET = new Date("2026-12-21T00:00:00");
// approximate start for progress bar
const START = new Date("2025-12-21T00:00:00");
const TOTAL_MS = TARGET.getTime() - START.getTime();

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
  { key: "days",    label: "DAYS"  },
  { key: "hours",   label: "HRS"   },
  { key: "minutes", label: "MIN"   },
  { key: "seconds", label: "SEC"   },
];

function DigitRoll({ value }: { value: string }) {
  return (
    <span style={{ display: "inline-block", overflow: "hidden", position: "relative" }}>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: "-60%", opacity: 0 }}
          animate={{ y: "0%",  opacity: 1 }}
          exit={{    y:  "60%", opacity: 0 }}
          transition={{ duration: 0.22, ease: EASE }}
          style={{ display: "inline-block" }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function CountdownSection() {
  const [time, setTime] = useState<TimeLeft>(calcTimeLeft);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  useEffect(() => {
    const id = setInterval(() => setTime(calcTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const elapsed = Math.max(0, Date.now() - START.getTime());
  const progress = Math.min(100, (elapsed / TOTAL_MS) * 100);

  return (
    <section
      id="countdown"
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        padding: "120px 24px 100px",
        background: "#000000",
        overflow: "hidden",
        fontFamily: "var(--font-inter), 'Inter', sans-serif",
      }}
    >
      {/* deep purple ambient under grid */}
      <div aria-hidden style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: "800px",
        height: "400px",
        background: "radial-gradient(ellipse, rgba(100,40,220,0.10) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* ── Heading ── */}
      <motion.div
        style={{ textAlign: "center", marginBottom: "64px" }}
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, ease: EASE }}
      >
        {/* eyebrow */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
          <span style={{ display: "block", width: "28px", height: "1px", background: "rgba(155,48,255,0.5)" }} />
          <span style={{
            fontSize: "9px",
            fontWeight: 600,
            letterSpacing: "0.5em",
            textTransform: "uppercase",
            color: "rgba(155,48,255,0.75)",
          }}>Countdown</span>
          <span style={{ display: "block", width: "28px", height: "1px", background: "rgba(155,48,255,0.5)" }} />
        </div>

        {/* date */}
        <h2 style={{
          fontSize: "clamp(2rem, 4vw, 3.75rem)",
          fontWeight: 300,
          letterSpacing: "-0.035em",
          lineHeight: 1,
          color: "#fff",
          margin: 0,
        }}>
          21{" "}
          <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
          {" "}December{" "}
          <span style={{
            fontWeight: 700,
            background: "linear-gradient(130deg, #e2d9ff 0%, #a78bfa 40%, #7c3aed 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>2026</span>
        </h2>

        <p style={{
          marginTop: "12px",
          fontSize: "12px",
          color: "rgba(156,163,175,0.4)",
          letterSpacing: "0.1em",
        }}>
          Tunis, Tunisia
        </p>
      </motion.div>

      {/* ── Digit grid ── */}
      <motion.div
        style={{ maxWidth: "880px", margin: "0 auto", position: "relative" }}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
      >
        {/* top rule */}
        <div style={{ height: "1px", background: "rgba(255,255,255,0.07)", marginBottom: "0" }} />

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
        }}>
          {UNITS.map(({ key, label }, idx) => {
            const isSec = key === "seconds";
            return (
              <div key={key} style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "clamp(24px, 5vw, 48px) 8px clamp(20px, 4vw, 36px)",
                borderRight: idx < UNITS.length - 1
                  ? "1px solid rgba(255,255,255,0.06)"
                  : "none",
              }}>
                {/* subtle cell glow for seconds */}
                {isSec && (
                  <motion.div
                    aria-hidden
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(124,58,237,0.07) 0%, transparent 70%)",
                      pointerEvents: "none",
                    }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}

                {/* number */}
                <div style={{
                  fontSize: "clamp(3rem, 9vw, 7.5rem)",
                  fontWeight: 700,
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                  fontVariantNumeric: "tabular-nums",
                  color: isSec ? "#c4b5fd" : "#ffffff",
                  transition: "color 0.3s",
                }}>
                  <DigitRoll value={pad(time[key])} />
                </div>

                {/* rule */}
                <div style={{
                  width: "clamp(20px, 4vw, 40px)",
                  height: "1px",
                  background: isSec
                    ? "rgba(155,48,255,0.7)"
                    : "rgba(255,255,255,0.14)",
                  margin: "clamp(10px, 2vw, 18px) 0 clamp(8px, 1.5vw, 14px)",
                  transition: "background 0.3s",
                }} />

                {/* label */}
                <span style={{
                  fontSize: "clamp(7px, 1vw, 9px)",
                  fontWeight: 600,
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                  color: isSec
                    ? "rgba(155,48,255,0.7)"
                    : "rgba(156,163,175,0.38)",
                  transition: "color 0.3s",
                }}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        {/* bottom rule */}
        <div style={{ height: "1px", background: "rgba(255,255,255,0.07)" }} />
      </motion.div>

      {/* ── Progress bar ── */}
      <motion.div
        style={{ maxWidth: "880px", margin: "28px auto 0" }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
      >
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "7px",
        }}>
          <span style={{ fontSize: "8px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(156,163,175,0.25)" }}>
            Dec 2025
          </span>
          <span style={{ fontSize: "8px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(156,163,175,0.25)" }}>
            {Math.round(progress)}% elapsed
          </span>
          <span style={{ fontSize: "8px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(156,163,175,0.25)" }}>
            Dec 2026
          </span>
        </div>

        {/* track */}
        <div style={{
          height: "1px",
          background: "rgba(255,255,255,0.05)",
          borderRadius: "1px",
          overflow: "hidden",
        }}>
          <motion.div
            style={{
              height: "100%",
              background: "linear-gradient(90deg, rgba(100,40,200,0.6) 0%, rgba(155,48,255,1) 100%)",
            }}
            initial={{ width: "0%" }}
            animate={inView ? { width: `${progress}%` } : {}}
            transition={{ duration: 1.4, ease: EASE, delay: 0.55 }}
          />
        </div>

        {/* footer label */}
        <div style={{
          marginTop: "28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}>
          <span style={{ display: "block", width: "24px", height: "1px", background: "rgba(255,255,255,0.07)" }} />
          <span style={{
            fontSize: "8px",
            fontWeight: 500,
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            color: "rgba(156,163,175,0.25)",
          }}>
            TSYP XIV · IEEE INSAT · Tunisia
          </span>
          <span style={{ display: "block", width: "24px", height: "1px", background: "rgba(255,255,255,0.07)" }} />
        </div>
      </motion.div>
    </section>
  );
}
