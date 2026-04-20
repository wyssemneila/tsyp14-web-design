"use client";

import { motion } from "framer-motion";
import NetworkCanvas from "./NetworkCanvas";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 28 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: EASE, delay },
});

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{ minHeight: "100dvh", background: "#050008" }}
    >
      {/* Network canvas */}
      <NetworkCanvas />

      {/* Upward bg glow behind sphere */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "900px",
          height: "580px",
          background:
            "radial-gradient(ellipse 60% 80% at 50% 100%, rgba(155,48,255,0.26) 0%, rgba(75,0,130,0.14) 40%, transparent 75%)",
          zIndex: 1,
        }}
      />

      {/* IEEE INSAT top-left logo */}
      <div
        className="absolute top-20 left-6 md:left-10 flex items-center gap-3"
        style={{ zIndex: 3 }}
        aria-label="IEEE INSAT Student Branch"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/IEEE_logo.svg/120px-IEEE_logo.svg.png"
          alt="IEEE INSAT Student Branch Logo"
          width={46}
          height={46}
          className="rounded-full object-contain p-1"
          style={{
            border: "1.5px solid rgba(155,48,255,0.65)",
            background: "rgba(155,48,255,0.10)",
          }}
        />
        <div
          className="hidden sm:block text-xs font-semibold tracking-widest leading-snug"
          style={{ color: "#CC99FF" }}
        >
          IEEE INSAT<br />Student Branch
        </div>
      </div>

      {/* Hero content */}
      <div
        className="relative flex flex-col items-center text-center px-6"
        style={{ zIndex: 3, marginBottom: "160px" }}
      >
        <motion.p
          {...fadeUp(0.1)}
          className="uppercase text-white/80 font-light tracking-[0.32em] mb-3"
          style={{ fontSize: "clamp(0.85rem, 1.5vw, 1.1rem)" }}
        >
          Welcome To
        </motion.p>

        <motion.h1
          {...fadeUp(0.25)}
          className="font-black leading-none text-white"
          style={{
            fontSize: "clamp(5.5rem, 14vw, 13rem)",
            letterSpacing: "-0.02em",
            textShadow:
              "0 0 40px rgba(155,48,255,0.55), 0 0 80px rgba(155,48,255,0.28)",
          }}
        >
          TSYP&nbsp;14&nbsp;
          <span role="img" aria-label="Tunisia flag">🇹🇳</span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.42)}
          className="uppercase font-light tracking-[0.22em] mt-4"
          style={{
            color: "#CC99FF",
            fontSize: "clamp(0.7rem, 1.1vw, 0.95rem)",
          }}
        >
          Draft Brand Guideline &nbsp;V&nbsp;1.0
        </motion.p>

        {/* CTA */}
        <motion.button
          {...fadeUp(0.58)}
          className="mt-10 px-8 py-3 rounded-full font-semibold text-sm tracking-widest uppercase cursor-pointer transition-all duration-300"
          style={{
            background: "linear-gradient(135deg, #9B30FF, #CC00FF)",
            color: "#fff",
            border: "none",
            boxShadow: "0 0 28px rgba(155,48,255,0.45), 0 0 60px rgba(204,0,255,0.20)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 0 40px rgba(204,0,255,0.65), 0 0 80px rgba(204,0,255,0.30)";
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.04)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 0 28px rgba(155,48,255,0.45), 0 0 60px rgba(204,0,255,0.20)";
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
          }}
          onClick={() => {
            document
              .querySelector("#countdown")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Explore the Event
        </motion.button>
      </div>

      {/* ── Demi Sphere ── */}
      <div
        aria-hidden="true"
        className="demi-sphere-wrap absolute bottom-0 left-1/2 -translate-x-1/2 overflow-hidden"
        style={{
          width: "clamp(280px, 50vw, 520px)",
          height: "clamp(140px, 25vw, 260px)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      >
        <div
          className="demi-sphere rounded-full absolute bottom-0 left-1/2 -translate-x-1/2"
          style={{
            width: "clamp(280px, 50vw, 520px)",
            height: "clamp(280px, 50vw, 520px)",
          }}
        />
      </div>

      {/* Scroll hint */}
      <div className="scroll-hint" style={{ zIndex: 4 }} aria-hidden="true">
        <span
          className="block text-center text-xs tracking-[0.2em] uppercase mb-1.5"
          style={{ color: "rgba(155,48,255,0.55)" }}
        >
          Scroll
        </span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          className="mx-auto opacity-50"
        >
          <path
            d="M9 3v12M4 10l5 5 5-5"
            stroke="#9B30FF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
