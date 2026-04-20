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

function DigitRoll({ value }: { value: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        gap: "0.04em",
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {value.split("").map((char, i) => (
        <span
          key={i}
          style={{ display: "inline-block", overflow: "hidden", lineHeight: 1 }}
        >
          <AnimatePresence mode="popLayout">
            <motion.span
              key={`${i}-${char}`}
              initial={{ y: "-80%", opacity: 0, filter: "blur(4px)" }}
              animate={{ y: "0%",   opacity: 1, filter: "blur(0px)" }}
              exit={{    y:  "80%", opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.3, ease: EASE }}
              style={{ display: "inline-block" }}
            >
              {char}
            </motion.span>
          </AnimatePresence>
        </span>
      ))}
    </span>
  );
}

function UnitCard({
  value,
  label,
  index,
  inView,
}: {
  value: number;
  label: string;
  index: number;
  inView: boolean;
}) {
  const isSeconds = label === "Seconds";

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: EASE, delay: 0.2 + index * 0.08 }}
      style={{ position: "relative", flex: "1 1 0" }}
    >
      {/* Glow behind card */}
      {isSeconds && (
        <motion.div
          style={{
            position: "absolute",
            inset: "-1px",
            borderRadius: "18px",
            background:
              "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(155,48,255,0.18) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Card */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(28px, 4vw, 52px) clamp(12px, 2vw, 24px) clamp(22px, 3vw, 40px)",
          background: isSeconds
            ? "linear-gradient(155deg, rgba(100,40,200,0.14) 0%, rgba(20,10,40,0.85) 100%)"
            : "linear-gradient(155deg, rgba(255,255,255,0.04) 0%, rgba(10,8,20,0.80) 100%)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRadius: "16px",
          border: isSeconds
            ? "1px solid rgba(155,48,255,0.3)"
            : "1px solid rgba(255,255,255,0.07)",
          boxShadow: isSeconds
            ? "0 0 40px rgba(155,48,255,0.12), inset 0 1px 0 rgba(255,255,255,0.07)"
            : "0 4px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {/* Number */}
        <div
          style={{
            fontSize: "clamp(3rem, 8vw, 7rem)",
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: "-0.04em",
            color: isSeconds ? "#c4b5fd" : "#ffffff",
            fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
          }}
        >
          <DigitRoll value={pad(value)} />
        </div>

        {/* Divider */}
        <div
          style={{
            width: "clamp(24px, 3vw, 40px)",
            height: "1px",
            background: isSeconds
              ? "rgba(155,48,255,0.55)"
              : "rgba(255,255,255,0.12)",
            margin: "clamp(12px, 2vw, 20px) 0 clamp(10px, 1.5vw, 16px)",
          }}
        />

        {/* Label */}
        <span
          style={{
            fontSize: "clamp(8px, 0.9vw, 10px)",
            fontWeight: 600,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: isSeconds
              ? "rgba(155,48,255,0.75)"
              : "rgba(180,180,200,0.38)",
            fontFamily: "var(--font-inter), 'Inter', sans-serif",
          }}
        >
          {label}
        </span>
      </div>
    </motion.div>
  );
}

function Colon({ inView, delay }: { inView: boolean; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, ease: EASE, delay }}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: "30px",
        flexShrink: 0,
      }}
    >
      {[0, 1].map((i) => (
        <motion.div
          key={i}
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
          style={{
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            background: "rgba(155,48,255,0.55)",
          }}
        />
      ))}
    </motion.div>
  );
}

export default function CountdownSection() {
  const [time, setTime] = useState<TimeLeft>(calcTimeLeft);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

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
        padding: "100px 24px 110px",
        background: "#000000",
        overflow: "hidden",
        fontFamily: "var(--font-inter), 'Inter', sans-serif",
      }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          top: "40%",
          transform: "translate(-50%, -50%)",
          width: "900px",
          height: "500px",
          background:
            "radial-gradient(ellipse, rgba(100,40,220,0.09) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Title block ── */}
      <motion.div
        style={{ textAlign: "center", marginBottom: "56px" }}
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, ease: EASE }}
      >
        {/* eyebrow */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "22px",
          }}
        >
          <span
            style={{
              display: "block",
              width: "32px",
              height: "1px",
              background: "rgba(155,48,255,0.45)",
            }}
          />
          <span
            style={{
              fontSize: "9px",
              fontWeight: 600,
              letterSpacing: "0.5em",
              textTransform: "uppercase",
              color: "rgba(155,48,255,0.7)",
            }}
          >
            Event Countdown
          </span>
          <span
            style={{
              display: "block",
              width: "32px",
              height: "1px",
              background: "rgba(155,48,255,0.45)",
            }}
          />
        </div>

        {/* main title */}
        <h2
          style={{
            fontSize: "clamp(1.6rem, 3.5vw, 3rem)",
            fontWeight: 300,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            color: "#ffffff",
            margin: 0,
            fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
          }}
        >
          The Wait{" "}
          <span
            style={{
              fontWeight: 700,
              background:
                "linear-gradient(130deg, #e2d9ff 0%, #a78bfa 45%, #7c3aed 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Ends In
          </span>
        </h2>
      </motion.div>

      {/* ── Digit cards ── */}
      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          gap: "clamp(8px, 1.5vw, 16px)",
        }}
      >
        {UNITS.map(({ key, label }, i) => (
          <>
            <UnitCard
              key={key}
              value={time[key]}
              label={label}
              index={i}
              inView={inView}
            />
            {i < UNITS.length - 1 && (
              <Colon key={`sep-${i}`} inView={inView} delay={0.3 + i * 0.08} />
            )}
          </>
        ))}
      </div>

      {/* ── Footer ── */}
      <motion.div
        style={{
          marginTop: "52px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
        }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, ease: EASE, delay: 0.6 }}
      >
        <span
          style={{
            display: "block",
            width: "28px",
            height: "1px",
            background: "rgba(255,255,255,0.07)",
          }}
        />
        <span
          style={{
            fontSize: "9px",
            fontWeight: 500,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "rgba(156,163,175,0.25)",
          }}
        >
          TSYP XIV · IEEE INSAT · Tunis, Tunisia · 21 Dec 2026
        </span>
        <span
          style={{
            display: "block",
            width: "28px",
            height: "1px",
            background: "rgba(255,255,255,0.07)",
          }}
        />
      </motion.div>
    </section>
  );
}
