"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days:    Math.floor(diff / 864e5),
    hours:   Math.floor((diff % 864e5) / 36e5),
    minutes: Math.floor((diff % 36e5)  / 6e4),
    seconds: Math.floor((diff % 6e4)   / 1000),
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const UNITS: { key: keyof TimeLeft; label: string }[] = [
  { key: "days",    label: "Days"  },
  { key: "hours",   label: "Hours" },
  { key: "minutes", label: "Min"   },
  { key: "seconds", label: "Sec"   },
];

function FlipDigit({ value }: { value: string }) {
  return (
    <AnimatePresence mode="popLayout">
      <motion.span
        key={value}
        initial={{ y: -24, opacity: 0, filter: "blur(4px)" }}
        animate={{ y: 0,   opacity: 1, filter: "blur(0px)" }}
        exit={{    y:  24, opacity: 0, filter: "blur(4px)" }}
        transition={{ duration: 0.28, ease: EASE }}
        className="inline-block"
      >
        {value}
      </motion.span>
    </AnimatePresence>
  );
}

export default function CountdownSection() {
  const targetRef = useRef<Date | null>(null);
  if (!targetRef.current) {
    const t = new Date();
    t.setDate(t.getDate() + 90);
    targetRef.current = t;
  }

  const [time, setTime] = useState<TimeLeft>(() => calcTimeLeft(targetRef.current!));
  const sectionRef      = useRef<HTMLElement>(null);
  const inView          = useInView(sectionRef, { once: true, margin: "-80px" });

  useEffect(() => {
    const id = setInterval(() => setTime(calcTimeLeft(targetRef.current!)), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="countdown"
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        padding: "100px 24px",
        background: "#07071a",
        overflow: "hidden",
        fontFamily: "var(--font-inter), 'Inter', sans-serif",
      }}
    >
      {/* ambient glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px",
          height: "350px",
          background: "radial-gradient(ellipse, rgba(100,40,220,0.14) 0%, rgba(7,7,26,0) 70%)",
          pointerEvents: "none",
        }}
      />

      {/* heading */}
      <motion.div
        style={{ textAlign: "center", marginBottom: "56px", position: "relative" }}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: EASE }}
      >
        <p style={{
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          color: "rgba(155,48,255,0.8)",
          marginBottom: "14px",
        }}>
          ── IEEE INSAT SB ──
        </p>
        <h2 style={{
          fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
          color: "#ffffff",
          margin: 0,
        }}>
          Event{" "}
          <span style={{
            background: "linear-gradient(135deg, #a855f7 0%, #7c3aed 50%, #c084fc 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            Countdown
          </span>
        </h2>
        <p style={{
          marginTop: "12px",
          fontSize: "14px",
          fontWeight: 400,
          color: "rgba(156,163,175,0.75)",
          letterSpacing: "0.02em",
        }}>
          The future is approaching fast — be ready.
        </p>
      </motion.div>

      {/* glass card */}
      <motion.div
        style={{
          maxWidth: "820px",
          margin: "0 auto",
          position: "relative",
        }}
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
      >
        <div style={{
          position: "relative",
          borderRadius: "20px",
          padding: "48px 32px 40px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          boxShadow: "0 0 50px rgba(100,40,220,0.10), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}>
          {/* top shimmer */}
          <div style={{
            position: "absolute",
            top: 0,
            left: "12%",
            right: "12%",
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(160,80,255,0.55), transparent)",
          }} />

          {/* digits row */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 0,
          }}>
            {UNITS.map(({ key, label }, idx) => (
              <div key={key} style={{ display: "flex", alignItems: "center" }}>
                {/* digit block */}
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  minWidth: "clamp(68px, 15vw, 148px)",
                }}>
                  <div style={{
                    fontSize: "clamp(3.2rem, 8vw, 7rem)",
                    fontWeight: 700,
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                    overflow: "hidden",
                    background: "linear-gradient(180deg, #ffffff 0%, #c4b5fd 55%, #7c3aed 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: "drop-shadow(0 0 16px rgba(124,58,237,0.5))",
                  }}>
                    <FlipDigit value={pad(time[key])} />
                  </div>
                  <span style={{
                    fontSize: "10px",
                    fontWeight: 500,
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "rgba(155,48,255,0.75)",
                    marginTop: "8px",
                  }}>
                    {label}
                  </span>
                </div>

                {/* colon separator */}
                {idx < UNITS.length - 1 && (
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    marginBottom: "24px",
                    padding: "0 4px",
                  }} aria-hidden>
                    <motion.span
                      style={{ display: "block", width: "5px", height: "5px", borderRadius: "50%", background: "rgba(160,80,255,0.7)" }}
                      animate={{ opacity: [1, 0.15, 1] }}
                      transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.span
                      style={{ display: "block", width: "5px", height: "5px", borderRadius: "50%", background: "rgba(160,80,255,0.7)" }}
                      animate={{ opacity: [0.15, 1, 0.15] }}
                      transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* footer */}
          <div style={{
            marginTop: "32px",
            paddingTop: "20px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "14px",
          }}>
            <span style={{ display: "block", width: "32px", height: "1px", background: "linear-gradient(90deg, transparent, rgba(155,48,255,0.5))" }} />
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(156,163,175,0.5)", margin: 0 }}>
              TSYP 14 · IEEE INSAT · Tunisia
            </p>
            <span style={{ display: "block", width: "32px", height: "1px", background: "linear-gradient(90deg, rgba(155,48,255,0.5), transparent)" }} />
          </div>

          {/* bottom shimmer */}
          <div style={{
            position: "absolute",
            bottom: 0,
            left: "12%",
            right: "12%",
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(100,40,220,0.25), transparent)",
          }} />
        </div>
      </motion.div>
    </section>
  );
}
