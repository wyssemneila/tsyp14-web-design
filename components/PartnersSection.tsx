"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface Partner {
  name: string;
  logo: string;
}

// ── Replace logo paths with your actual partner logos ──
const IEEE_PARTNERS: Partner[] = [
  { name: "IEEE",             logo: "/lg.webp" },
  { name: "IEEE INSAT SB",    logo: "/lg.webp" },
  { name: "IEEE Region 8",    logo: "/lg.webp" },
  { name: "IEEE Tunisia",     logo: "/lg.webp" },
];

const PARTNERS: Partner[] = [
  { name: "Partner 1", logo: "/lg.webp" },
  { name: "Partner 2", logo: "/lg.webp" },
  { name: "Partner 3", logo: "/lg.webp" },
  { name: "Partner 4", logo: "/lg.webp" },
  { name: "Partner 5", logo: "/lg.webp" },
  { name: "Partner 6", logo: "/lg.webp" },
];

function PartnerCard({ partner, delay }: { partner: Partner; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: EASE, delay }}
      className="partner-logo-card"
      style={{ width: "clamp(120px, 15vw, 175px)" }}
    >
      <div className="partner-logo-img">
        <Image
          src={partner.logo}
          alt={partner.name}
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
    </motion.div>
  );
}

function PartnerGroup({ title, partners, baseDelay }: { title: string; partners: Partner[]; baseDelay: number }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "24px" }}>
        <span style={{
          fontSize: "9px", fontWeight: 700, letterSpacing: "0.38em",
          textTransform: "uppercase", color: "rgba(155,48,255,0.7)",
          whiteSpace: "nowrap",
          fontFamily: "var(--font-inter), 'Inter', sans-serif",
        }}>
          {title}
        </span>
        <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, rgba(155,48,255,0.35), transparent)" }} />
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
        {partners.map((p, i) => (
          <PartnerCard key={p.name + i} partner={p} delay={baseDelay + i * 0.055} />
        ))}
      </div>
    </div>
  );
}

export default function PartnersSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        width: "100%",
        background: "#000000",
        padding: "100px 0 120px",
        overflow: "hidden",
        fontFamily: "var(--font-inter), 'Inter', sans-serif",
      }}
    >
      {/* Ambient blob */}
      <div aria-hidden style={{
        position: "absolute", top: "30%", right: "10%",
        width: "500px", height: "400px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(155,48,255,0.06) 0%, transparent 70%)",
        pointerEvents: "none", filter: "blur(60px)",
      }} />
      <div aria-hidden style={{
        position: "absolute", bottom: "20%", left: "5%",
        width: "400px", height: "350px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)",
        pointerEvents: "none", filter: "blur(60px)",
      }} />

      {/* Section header */}
      <div style={{ textAlign: "center", padding: "0 24px", marginBottom: "72px", position: "relative", zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <div style={{ width: "32px", height: "1px", background: "linear-gradient(90deg, transparent, rgba(155,48,255,0.5))" }} />
            <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.38em", textTransform: "uppercase", color: "rgba(155,48,255,0.6)" }}>
              They Trust Us
            </span>
            <div style={{ width: "32px", height: "1px", background: "linear-gradient(90deg, rgba(155,48,255,0.5), transparent)" }} />
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE, delay: 0.08 }}
          style={{
            fontSize: "clamp(28px, 4.5vw, 60px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            margin: 0,
            fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
          }}
        >
          <span style={{ color: "#ffffff" }}>Our </span>
          <span style={{ color: "transparent", WebkitTextStroke: "1px rgba(155,48,255,0.7)" }}>Partners</span>
        </motion.h2>
      </div>

      {/* Partner groups */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE, delay: 0.18 }}
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "0 clamp(20px, 5vw, 56px)",
          display: "flex",
          flexDirection: "column",
          gap: "52px",
          position: "relative", zIndex: 2,
        }}
      >
        <PartnerGroup title="IEEE Partners" partners={IEEE_PARTNERS} baseDelay={0.28} />

        {/* Divider */}
        <div style={{
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(155,48,255,0.2) 20%, rgba(155,48,255,0.2) 80%, transparent)",
        }} />

        <PartnerGroup title="Partners" partners={PARTNERS} baseDelay={0.45} />
      </motion.div>
    </section>
  );
}
