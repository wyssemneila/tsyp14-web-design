"use client";

import { motion } from "framer-motion";
import Navbar from "./Navbar";
import ParticleCanvas from "./ParticleCanvas";
import DemiSphere from "./DemiSphere";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.18 + 0.5,
      duration: 0.95,
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
      }}
    >
      {/* ── Deep space background — dark blue-indigo like p1 ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, #030010 0%, #040018 25%, #050020 52%, #07002A 72%, #090030 100%)",
          zIndex: 0,
        }}
      />

      {/* ── Very subtle radial darkening at edges (vignette) ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 120% 100% at 50% 50%, transparent 40%, rgba(0,0,8,0.55) 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* ── Sky-light beam from top — like p1 ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "65%",
          height: "50%",
          background:
            "radial-gradient(ellipse 55% 50% at 50% 0%, rgba(90, 20, 220, 0.18) 0%, rgba(50, 8, 140, 0.08) 45%, transparent 72%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* ── Interactive particle network ── */}
      <ParticleCanvas />

      {/* ── Fixed Navbar ── */}
      <Navbar />

      {/* ── Hero text — upper 58vh ── */}
      <div
        style={{
          flex: "0 0 auto",
          height: "calc(100vh - 460px)",
          minHeight: "320px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "0 24px",
          paddingTop: "64px",
        }}
      >
        {/* 14th Edition glowing badge */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{ marginBottom: "28px" }}
        >
          <div
            className="edition-badge"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "7px 28px",
              borderRadius: "100px",
              background:
                "linear-gradient(135deg, rgba(155,48,255,0.2) 0%, rgba(80,8,180,0.12) 100%)",
              border: "1px solid rgba(155,48,255,0.65)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          >
            <span
              style={{
                fontSize: "clamp(10px, 1vw, 13px)",
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#D4A0FF",
              }}
            >
              14th Edition
            </span>
          </div>
        </motion.div>

        {/* Main headline */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <h1
            style={{
              fontSize: "clamp(28px, 5vw, 62px)",
              fontWeight: 800,
              lineHeight: 1.18,
              letterSpacing: "-0.02em",
              background:
                "linear-gradient(180deg, #FFFFFF 0%, #EAD8FF 55%, #B07AE8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              maxWidth: "720px",
            }}
          >
            Tunisian Student and Young
            <br />
            Professional Congress
          </h1>
        </motion.div>

        {/* Subtle divider */}
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{ marginTop: "22px" }}
        >
          <div
            style={{
              width: "60px",
              height: "2px",
              background:
                "linear-gradient(90deg, transparent, rgba(155,48,255,0.85), transparent)",
              borderRadius: "2px",
              margin: "0 auto",
            }}
          />
        </motion.div>
      </div>

      {/* ── Demi-sphere at the bottom — no rectangl artifact ── */}
      <DemiSphere />
    </section>
  );
}
