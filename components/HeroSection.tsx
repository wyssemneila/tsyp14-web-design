"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import ParticleCanvas from "./ParticleCanvas";
import DemiSphere from "./DemiSphere";
import LogoScrollBar from "./LogoScrollBar";

const TARGET = new Date("2026-12-21T00:00:00");

function calcDiff() {
  const diff = Math.max(0, TARGET.getTime() - Date.now());
  return {
    days:    Math.floor(diff / 864e5),
    hours:   Math.floor((diff % 864e5) / 36e5),
    minutes: Math.floor((diff % 36e5) / 6e4),
    seconds: Math.floor((diff % 6e4) / 1000),
  };
}

function MiniCountdown() {
  const [t, setT] = useState(calcDiff);
  useEffect(() => {
    const id = setInterval(() => setT(calcDiff()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { v: t.days,    l: "DAYS" },
    { v: t.hours,   l: "HRS"  },
    { v: t.minutes, l: "MIN"  },
    { v: t.seconds, l: "SEC"  },
  ];

  return (
    <div style={{
      display: "flex",
      alignItems: "flex-start",
      gap: "clamp(20px, 4vw, 48px)",
    }}>
      {units.map(({ v, l }) => (
        <div key={l} style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
        }}>
          <span style={{
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: "-0.02em",
            fontVariantNumeric: "tabular-nums",
            color: "#ffffff",
          }}>
            {String(v).padStart(2, "0")}
          </span>
          <span style={{
            fontSize: "clamp(9px, 1vw, 11px)",
            fontWeight: 600,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(155,48,255,0.85)",
          }}>
            {l}
          </span>
        </div>
      ))}
    </div>
  );
}

const SPRING = [0.16, 1, 0.3, 1] as [number, number, number, number];

function WordReveal({
  text,
  baseDelay = 0,
  gradient = false,
}: {
  text: string;
  baseDelay?: number;
  gradient?: boolean;
}) {
  const words = text.split(" ");
  return (
    <div style={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "0 0.28em",
      paddingBottom: "6px",
    }}>
      {words.map((word, i) => (
        <div key={i} style={{ overflow: "hidden", display: "inline-block", paddingBottom: "4px" }}>
          <motion.span
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              delay: baseDelay + i * 0.07,
              duration: 0.8,
              ease: SPRING,
            }}
            style={{
              display: "inline-block",
              fontSize: "clamp(34px, 5.5vw, 64px)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
              ...(gradient ? {
                background: "linear-gradient(135deg, #c084fc 0%, #a855f7 40%, #9b30ff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              } : {
                color: "#ffffff",
              }),
            }}
          >
            {word}
          </motion.span>
        </div>
      ))}
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15 + 0.4,
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

export default function HeroSection() {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: "var(--font-inter), 'Inter', sans-serif",
      }}
    >
      {/* ── Base background: #07071a — exact p1 color ── */}
      <div style={{ position: "absolute", inset: 0, background: "#07071a", zIndex: 0 }} />

      {/* ── Radial purple spotlight at center-top — exact p1 spec ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 45% at 50% 0%, rgba(100,60,200,0.18) 0%, rgba(80,40,160,0.06) 55%, transparent 75%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* ── Edge vignette for depth ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 130% 100% at 50% 50%, transparent 50%, rgba(0,0,10,0.5) 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* ── White-dot star particles (canvas) ── */}
      <ParticleCanvas />

      {/* ── Navbar ── */}
      <Navbar />

      {/* ── Hero text ── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "0 24px",
          paddingTop: "72px",
          paddingBottom: "160px",
        }}
      >
        {/* Badge with pulsing dot */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: SPRING }}
          style={{ marginBottom: "32px" }}
        >
          <div
            className="edition-badge"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "7px 18px",
              background: "rgba(155,48,255,0.08)",
              border: "1px solid rgba(155,48,255,0.28)",
              borderRadius: "999px",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#9b30ff",
                boxShadow: "0 0 8px rgba(155,48,255,0.9)",
                flexShrink: 0,
              }}
            />
            <span style={{
              fontSize: "11px",
              fontWeight: 500,
              color: "rgba(200,160,255,0.88)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontFamily: "var(--font-inter), 'Inter', sans-serif",
            }}>
              TSYP · 14th Edition
            </span>
          </div>
        </motion.div>

        {/* Headline — Poppins word-by-word reveal */}
        <div style={{ textAlign: "center" }}>
          <WordReveal text="Tunisian Student and Young" baseDelay={0.4} />
          <WordReveal text="Professional Congress" gradient baseDelay={0.76} />
        </div>

        {/* Date + location line */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.6, ease: SPRING }}
          style={{
            marginTop: "20px",
            fontSize: "12px",
            fontWeight: 400,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(180,150,255,0.5)",
            fontFamily: "var(--font-inter), 'Inter', sans-serif",
          }}
        >
          December 21, 2026 &nbsp;·&nbsp; Tunis, Tunisia
        </motion.p>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.35, duration: 0.6, ease: SPRING }}
          style={{ marginTop: "36px" }}
        >
          <button
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "13px 32px",
              background: "linear-gradient(135deg, rgba(155,48,255,0.22), rgba(155,48,255,0.10))",
              border: "1px solid rgba(155,48,255,0.45)",
              borderRadius: "10px",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              color: "rgba(220,190,255,0.95)",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              fontFamily: "var(--font-inter), 'Inter', sans-serif",
              cursor: "pointer",
              boxShadow: "0 0 24px rgba(155,48,255,0.12), inset 0 1px 0 rgba(255,255,255,0.06)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "linear-gradient(135deg, rgba(155,48,255,0.35), rgba(155,48,255,0.18))";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(155,48,255,0.7)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 36px rgba(155,48,255,0.22), inset 0 1px 0 rgba(255,255,255,0.08)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "linear-gradient(135deg, rgba(155,48,255,0.22), rgba(155,48,255,0.10))";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(155,48,255,0.45)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 24px rgba(155,48,255,0.12), inset 0 1px 0 rgba(255,255,255,0.06)";
            }}
          >
            Register Now
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ opacity: 0.8 }}>
              <path d="M1 7h12M8 3l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </motion.div>

      </div>

      {/* ── Demi-sphere — absolute background ── */}
      <DemiSphere />

      {/* ── Mini countdown in the black space above logo bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.7, ease: SPRING }}
        style={{
          position: "absolute",
          bottom: "110px",
          left: 0,
          right: 0,
          zIndex: 25,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pointerEvents: "none",
        }}
      >
        <MiniCountdown />
      </motion.div>

      {/* ── Logo scroll bar pinned at bottom ── */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 30 }}>
        <LogoScrollBar />
      </div>

    </section>
  );
}
