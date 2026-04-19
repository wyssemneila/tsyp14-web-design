"use client";

import { motion } from "framer-motion";
import ParticleCanvas from "./ParticleCanvas";
import DemiSphere from "./DemiSphere";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.18 + 0.4,
      duration: 0.95,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center">
      {/* ── Deep space gradient background ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #05000E 0%, #090020 35%, #0E002E 60%, #110038 80%, #130040 100%)",
          zIndex: 0,
        }}
      />

      {/* Subtle central radial bloom */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 65%, rgba(95, 15, 230, 0.13) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />

      {/* ── Interactive particle network ── */}
      <ParticleCanvas />

      {/* ── Hero text content ── */}
      <div
        className="relative flex flex-col items-center justify-center text-center px-6"
        style={{ zIndex: 10, marginBottom: "clamp(60px, 10vw, 120px)" }}
      >
        {/* 14th Edition glowing badge — shape only, not a button */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-7"
        >
          <div
            className="edition-badge inline-flex items-center justify-center"
            style={{
              padding: "7px 28px",
              borderRadius: "100px",
              background:
                "linear-gradient(135deg, rgba(155, 48, 255, 0.18) 0%, rgba(100, 10, 200, 0.12) 100%)",
              border: "1px solid rgba(155, 48, 255, 0.7)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            <span
              style={{
                fontSize: "clamp(11px, 1.1vw, 14px)",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#D4A0FF",
              }}
            >
              14th Edition
            </span>
          </div>
        </motion.div>

        {/* IEEE — oversized display word */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <h1
            style={{
              fontSize: "clamp(52px, 10vw, 130px)",
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: "-0.03em",
              background:
                "linear-gradient(180deg, #FFFFFF 0%, #E8D4FF 55%, #A870FF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "clamp(6px, 1vw, 14px)",
            }}
          >
            IEEE
          </h1>
        </motion.div>

        {/* Main headline */}
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <h2
            style={{
              fontSize: "clamp(18px, 3vw, 40px)",
              fontWeight: 700,
              lineHeight: 1.25,
              color: "#F0E8FF",
              maxWidth: "680px",
              textShadow: "0 0 40px rgba(155,48,255,0.3)",
            }}
          >
            Tunisian Student and Young
            <br />
            Professional Congress
          </h2>
        </motion.div>

        {/* Subtle divider line */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-7"
        >
          <div
            style={{
              width: "clamp(40px, 6vw, 72px)",
              height: "2px",
              background:
                "linear-gradient(90deg, transparent, rgba(155,48,255,0.8), transparent)",
              borderRadius: "2px",
              margin: "0 auto",
            }}
          />
        </motion.div>
      </div>

      {/* ── Demi sphere at the bottom ── */}
      <DemiSphere />
    </section>
  );
}
