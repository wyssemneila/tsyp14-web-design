"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
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
    { v: t.days,    l: "D" },
    { v: t.hours,   l: "H" },
    { v: t.minutes, l: "M" },
    { v: t.seconds, l: "S" },
  ];

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      <span style={{ fontSize: "10px", color: "rgba(155,48,255,0.8)", letterSpacing: "0.2em", marginRight: "8px", fontWeight: 500 }}>
        21 DEC
      </span>
      {units.map(({ v, l }, i) => (
        <div key={l} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            background: "rgba(0,0,0,0.55)", border: "1px solid rgba(155,48,255,0.3)",
            borderRadius: "6px", padding: "4px 8px", backdropFilter: "blur(8px)",
          }}>
            <span style={{ fontSize: "16px", fontWeight: 700, color: "#fff", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
              {String(v).padStart(2, "0")}
            </span>
            <span style={{ fontSize: "8px", color: "rgba(155,48,255,0.7)", letterSpacing: "0.15em", marginTop: "2px" }}>{l}</span>
          </div>
          {i < 3 && <span style={{ color: "rgba(155,48,255,0.6)", fontSize: "14px", fontWeight: 700, marginBottom: "8px" }}>:</span>}
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
            "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(100,60,200,0.35) 0%, rgba(80,40,160,0.1) 50%, transparent 75%)",
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
          paddingTop: "60px",
          paddingBottom: "80px",
        }}
      >
        {/* Badge — pill with border + purple dot + text */}
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" style={{ marginBottom: "24px" }}>
          <div
            className="edition-badge"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              background: "rgba(0,0,0,0.35)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "999px",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            {/* Purple dot icon */}
            <div
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#9b30ff",
                boxShadow: "0 0 6px rgba(155,48,255,0.8)",
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: "12px", fontWeight: 400, color: "rgba(255,255,255,0.7)", letterSpacing: "0.03em" }}>
              TSYP — 14th Edition
            </span>
          </div>
        </motion.div>

        {/* Heading line 1 — bright white */}
        <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible">
          <h1
            style={{
              fontSize: "clamp(36px, 5.5vw, 64px)",
              fontWeight: 700,
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              color: "#ffffff",
              marginBottom: "4px",
            }}
          >
            Tunisian Student and Young
          </h1>
        </motion.div>

        {/* Heading line 2 — muted gray like p1 */}
        <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible">
          <h1
            style={{
              fontSize: "clamp(36px, 5.5vw, 64px)",
              fontWeight: 700,
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              color: "#9ca3af",
              marginBottom: "20px",
            }}
          >
            Professional Congress
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible">
          <p
            style={{
              fontSize: "clamp(13px, 1.2vw, 15px)",
              fontWeight: 400,
              lineHeight: 1.65,
              color: "rgba(156,163,175,0.85)",
              maxWidth: "500px",
              margin: "0 auto",
            }}
          >
            The premier annual congress for IEEE student and young professional
            members across Tunisia — fostering innovation, networking, and
            technical leadership.
          </p>
        </motion.div>
      </div>

      {/* ── Demi-sphere — absolute background ── */}
      <DemiSphere />

      {/* ── Mini countdown in the black space above logo bar ── */}
      <div style={{
        position: "absolute",
        bottom: "74px",
        left: 0,
        right: 0,
        zIndex: 25,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "6px",
        pointerEvents: "none",
      }}>
        <MiniCountdown />
      </div>

      {/* ── Logo scroll bar pinned at bottom ── */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 30 }}>
        <LogoScrollBar />
      </div>

    </section>
  );
}
