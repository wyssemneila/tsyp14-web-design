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
      {/* ── Deep space background ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, #02000A 0%, #05001A 30%, #07002A 58%, #080030 78%, #060020 100%)",
          zIndex: 0,
        }}
      />

      {/* ── Sky-light beam from top — like p1 ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "70%",
          height: "55%",
          background:
            "radial-gradient(ellipse 60% 55% at 50% 0%, rgba(110, 28, 255, 0.22) 0%, rgba(70, 10, 180, 0.1) 40%, transparent 75%)",
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
