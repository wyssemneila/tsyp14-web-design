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
      gap: "0 0.3em",
      paddingBottom: "6px",
    }}>
      {words.map((word, i) => (
        <div key={i} style={{ overflow: "hidden", display: "inline-block", paddingBottom: "4px" }}>
          <motion.span
            className={gradient ? "gradient-flow" : ""}
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              delay: baseDelay + i * 0.07,
              duration: 0.8,
              ease: SPRING,
            }}
            style={{
              display: "inline-block",
              fontSize: "clamp(34px, 5.5vw, 66px)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
              fontFamily: "var(--font-raleway), 'Raleway', sans-serif",
              ...(gradient ? {} : { color: "#ffffff" }),
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
      <div style={{ position: "absolute", inset: 0, background: "#000000", zIndex: 0 }} />

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
          paddingTop: "20px",
          paddingBottom: "80px",
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
              animate={{ scale: [1, 1.4, 1], opacity: [0.7, 0.3, 0.7] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#9b30ff",
                boxShadow: "0 0 6px rgba(155,48,255,0.7)",
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

        {/* Tagline with blinking cursor */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6, ease: SPRING }}
          style={{
            marginTop: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "2px",
          }}
        >
          <span style={{
            fontSize: "clamp(13px, 1.4vw, 16px)",
            fontWeight: 500,
            color: "rgba(255,255,255,0.65)",
            letterSpacing: "0.02em",
            fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
          }}>
            Together, We Shape the Future of Tech.
          </span>
          <motion.span
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "linear", times: [0, 0.49, 0.5, 1] }}
            style={{
              display: "inline-block",
              width: "2px",
              height: "1.1em",
              background: "rgba(155,48,255,0.85)",
              marginLeft: "3px",
              verticalAlign: "text-bottom",
              borderRadius: "1px",
            }}
          />
        </motion.div>

        {/* Location + Date */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6, ease: SPRING }}
          style={{
            marginTop: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <span style={{
            display: "flex", alignItems: "center", gap: "6px",
            fontSize: "12px", fontWeight: 400,
            color: "rgba(180,150,255,0.55)",
            letterSpacing: "0.06em",
            fontFamily: "var(--font-inter), 'Inter', sans-serif",
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            Tunis, Tunisia
          </span>
          <span style={{ display: "block", width: "1px", height: "12px", background: "rgba(155,48,255,0.25)" }} />
          <span style={{
            display: "flex", alignItems: "center", gap: "6px",
            fontSize: "12px", fontWeight: 400,
            color: "rgba(180,150,255,0.55)",
            letterSpacing: "0.06em",
            fontFamily: "var(--font-inter), 'Inter', sans-serif",
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            21 December 2026
          </span>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.7, ease: SPRING }}
          style={{
            marginTop: "150px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0",
            flexWrap: "wrap",
          }}
        >
          {[
            { value: "1200+", label: "Participants" },
            { value: "50+",   label: "Speakers"     },
            { value: "60+",   label: "Workshops"    },
          ].map(({ value, label }, i, arr) => (
            <div key={label} style={{ display: "flex", alignItems: "center" }}>
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "0 clamp(20px, 4vw, 48px)",
              }}>
                <span style={{
                  fontSize: "clamp(22px, 3vw, 32px)",
                  fontWeight: 700,
                  lineHeight: 1,
                  color: "#ffffff",
                  fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
                  letterSpacing: "-0.02em",
                }}>
                  {value}
                </span>
                <span style={{
                  marginTop: "5px",
                  fontSize: "11px",
                  fontWeight: 500,
                  color: "rgba(180,150,255,0.55)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-inter), 'Inter', sans-serif",
                }}>
                  {label}
                </span>
              </div>
              {i < arr.length - 1 && (
                <div style={{ width: "1px", height: "36px", background: "rgba(155,48,255,0.2)" }} />
              )}
            </div>
          ))}
        </motion.div>

      </div>

      {/* ── Demi-sphere — absolute background ── */}
      <DemiSphere />


      {/* ── Logo scroll bar pinned at bottom ── */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 30 }}>
        <LogoScrollBar />
      </div>

    </section>
  );
}
