"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const IMAGES = [
  "/memo/img-02.jpg",
  "/memo/img-04.jpg",
  "/memo/img-07.jpg",
  "/memo/img-09.jpg",
  "/memo/img-10.jpg",
  "/memo/img-12.jpg",
  "/memo/g0i8OVM.jpeg",
  "/memo/nPXqChl.jpeg",
  "/memo/wGbAmaH.jpeg",
  "/memo/xqwrboq.jpeg",
];

// Alternate tilt angles for each card position
const TILTS = [-6, 4, -3, 7, -5, 3, -7, 5, -4, 6];

function CarouselCard({ src, tilt }: { src: string; tilt: number }) {
  return (
    <div
      style={{
        flex: "0 0 auto",
        width: "clamp(160px, 18vw, 240px)",
        height: "clamp(220px, 26vw, 340px)",
        borderRadius: "16px",
        overflow: "hidden",
        transform: `rotate(${tilt}deg)`,
        position: "relative",
        boxShadow: "0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(155,48,255,0.12)",
        flexShrink: 0,
      }}
    >
      <Image
        src={src}
        alt="TSYP memory"
        fill
        sizes="240px"
        style={{ objectFit: "cover" }}
      />
      {/* subtle purple tint overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, transparent 50%, rgba(80,0,120,0.35) 100%)",
        pointerEvents: "none",
      }} />
    </div>
  );
}

export default function MemoriesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  // Duplicate for seamless loop
  const track = [...IMAGES, ...IMAGES];

  return (
    <section
      id="memories"
      ref={ref}
      style={{
        position: "relative",
        width: "100%",
        background: "#000000",
        overflow: "hidden",
        paddingBottom: "100px",
        fontFamily: "var(--font-inter), 'Inter', sans-serif",
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: "absolute", left: "50%", top: "40%",
        transform: "translate(-50%, -50%)",
        width: "700px", height: "400px",
        background: "radial-gradient(ellipse, rgba(100,20,200,0.09) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, ease: EASE }}
        style={{ textAlign: "center", padding: "80px 24px 60px" }}
      >
        <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
          <span style={{ width: "32px", height: "1px", background: "rgba(155,48,255,0.45)", display: "block" }} />
          <span style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "0.5em", textTransform: "uppercase", color: "rgba(155,48,255,0.7)" }}>
            TSYP · Archives
          </span>
          <span style={{ width: "32px", height: "1px", background: "rgba(155,48,255,0.45)", display: "block" }} />
        </div>
        <h2 style={{
          fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontWeight: 300,
          letterSpacing: "-0.03em", lineHeight: 1.1, color: "#ffffff",
          fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
          margin: 0,
        }}>
          Memories from{" "}
          <span style={{
            fontWeight: 800,
            background: "linear-gradient(130deg, #e2d9ff 0%, #a78bfa 45%, #7c3aed 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>Previous Editions</span>
        </h2>
      </motion.div>

      {/* Carousel wrapper — clips overflow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, ease: EASE, delay: 0.3 }}
        style={{ position: "relative", width: "100%", overflow: "hidden" }}
      >
        {/* Left fade */}
        <div style={{
          position: "absolute", top: 0, left: 0, bottom: 0, width: "140px",
          background: "linear-gradient(90deg, #000000 0%, transparent 100%)",
          zIndex: 2, pointerEvents: "none",
        }} />
        {/* Right fade */}
        <div style={{
          position: "absolute", top: 0, right: 0, bottom: 0, width: "140px",
          background: "linear-gradient(270deg, #000000 0%, transparent 100%)",
          zIndex: 2, pointerEvents: "none",
        }} />

        {/* Scrolling track */}
        <div
          className="memories-track"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(28px, 4vw, 52px)",
            padding: "40px 60px",
            width: "max-content",
          }}
        >
          {track.map((src, i) => (
            <CarouselCard
              key={i}
              src={src}
              tilt={TILTS[i % TILTS.length]}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
