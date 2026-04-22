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

const ROW1 = [...IMAGES, ...IMAGES];
const ROW2 = [...[...IMAGES].reverse(), ...[...IMAGES].reverse()];

function MemoryCard({ src }: { src: string }) {
  return (
    <div className="memory-card">
      <Image
        src={src}
        alt="TSYP memory"
        fill
        sizes="(max-width: 768px) 260px, 380px"
        style={{ objectFit: "cover" }}
      />
      {/* Bottom gradient overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(60,0,100,0.55) 0%, transparent 55%)",
        pointerEvents: "none", zIndex: 1,
      }} />
      {/* Top glow line */}
      <div className="memory-top-glow" />
    </div>
  );
}

function MemoryRow({ images, direction }: { images: string[]; direction: "left" | "right" }) {
  return (
    <div style={{
      overflow: "hidden", width: "100%",
      maskImage: "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
      WebkitMaskImage: "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
    }}>
      <div
        className={direction === "left" ? "memories-track-left" : "memories-track-right"}
        style={{ display: "flex", alignItems: "center", gap: "16px", padding: "6px 0" }}
      >
        {images.map((src, i) => (
          <MemoryCard key={i} src={src} />
        ))}
      </div>
    </div>
  );
}

export default function MemoriesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="memories"
      ref={ref}
      style={{
        position: "relative",
        width: "100%",
        background: "#000000",
        overflow: "hidden",
        paddingBottom: "120px",
        fontFamily: "var(--font-inter), 'Inter', sans-serif",
      }}
    >
      {/* Ambient glow */}
      <div aria-hidden style={{
        position: "absolute", left: "50%", top: "50%",
        transform: "translate(-50%, -50%)",
        width: "800px", height: "500px",
        background: "radial-gradient(ellipse, rgba(100,20,200,0.08) 0%, transparent 70%)",
        pointerEvents: "none", filter: "blur(50px)",
      }} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, ease: EASE }}
        className="memories-header"
        style={{ textAlign: "center", padding: "80px 24px 56px" }}
      >
        <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
          <span style={{ width: "32px", height: "1px", background: "linear-gradient(90deg, transparent, rgba(155,48,255,0.5))", display: "block" }} />
          <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.5em", textTransform: "uppercase", color: "rgba(155,48,255,0.7)" }}>
            TSYP · Archives
          </span>
          <span style={{ width: "32px", height: "1px", background: "linear-gradient(90deg, rgba(155,48,255,0.5), transparent)", display: "block" }} />
        </div>

        <h2 style={{
          fontSize: "clamp(2rem, 4vw, 3.5rem)",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          lineHeight: 1.08,
          color: "#ffffff",
          fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
          margin: 0,
        }}>
          Memories
        </h2>
        <p style={{
          marginTop: "10px",
          fontSize: "clamp(11px, 1.2vw, 13px)",
          fontWeight: 400,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.25)",
          margin: "10px 0 0",
        }}>
          From Previous Editions
        </p>
      </motion.div>

      {/* Two-row gallery */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, ease: EASE, delay: 0.3 }}
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <MemoryRow images={ROW1} direction="left" />
        <MemoryRow images={ROW2} direction="right" />
      </motion.div>
    </section>
  );
}
