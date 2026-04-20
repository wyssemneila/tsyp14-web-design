"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const CARDS = [
  {
    id: "ieee-section",
    logo: "/ieee-tunisia-light.png",
    logoW: 220,
    logoH: 88,
    title: "IEEE Tunisia Section",
    glowStrong: "rgba(0,80,220,0.4)",
    description: `Founded in 2008, the IEEE Tunisia Section spreads IEEE initiatives through educational programs, networking, and technology for humanitarian challenges. It supports chapters, student activities, and awards, with over 43 Student Branches across universities.`,
    links: { linkedin: "#", facebook: "#", web: "#" },
  },
  {
    id: "ieee-sb",
    logo: "/sb.png",
    logoW: 200,
    logoH: 100,
    title: "IEEE INSAT Student Branch",
    glowStrong: "rgba(130,30,255,0.4)",
    description: `One of Tunisia's most active student branches, IEEE INSAT SB unites engineering students to explore, innovate, and collaborate. It organizes workshops, competitions, and networking events fostering excellence at INSAT and beyond.`,
    links: { linkedin: "#", facebook: "#", web: "#" },
  },
  {
    id: "insat",
    logo: "/insat.png",
    logoW: 180,
    logoH: 100,
    title: "INSAT",
    glowStrong: "rgba(180,30,130,0.4)",
    description: `The National Institute of Applied Science and Technology (INSAT) is a top engineering school in Tunis, part of the University of Carthage — a public institution focused on higher education and research excellence.`,
    links: { linkedin: "#", facebook: "#", web: "#" },
  },
];

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
    </svg>
  );
}

function WebIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
    </svg>
  );
}

function SocialBtn({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "36px",
        height: "36px",
        borderRadius: "10px",
        background: "rgba(155,48,255,0.12)",
        border: "1px solid rgba(155,48,255,0.2)",
        color: "rgba(200,180,255,0.7)",
        textDecoration: "none",
        transition: "background 0.2s, color 0.2s, border-color 0.2s",
        cursor: "pointer",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.background = "rgba(155,48,255,0.28)";
        (e.currentTarget as HTMLElement).style.color = "#ffffff";
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(155,48,255,0.5)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.background = "rgba(155,48,255,0.12)";
        (e.currentTarget as HTMLElement).style.color = "rgba(200,180,255,0.7)";
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(155,48,255,0.2)";
      }}
    >
      {children}
    </a>
  );
}

function FlipCard({ card, index, inView }: { card: typeof CARDS[0]; index: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: EASE, delay: 0.2 + index * 0.12 }}
      className="flip-card-item"
      style={{ position: "relative", minWidth: 0 }}
    >
      {/* Glow behind card */}
      <div style={{
        position: "absolute",
        inset: "-20px",
        background: `radial-gradient(ellipse 80% 80% at 50% 100%, ${card.glowStrong} 0%, transparent 70%)`,
        borderRadius: "28px",
        filter: "blur(24px)",
        zIndex: 0,
        pointerEvents: "none",
      }} />

      {/* Animated gradient border */}
      <div className="flip-card-border" style={{ position: "relative", zIndex: 1, height: "420px" }}>
        <div className="flip-card-wrapper" style={{ width: "100%", height: "100%" }}>
          <div className="flip-card-inner">

            {/* FRONT */}
            <div className="flip-card-front" style={{
              background: "linear-gradient(145deg, rgba(18,10,35,0.95) 0%, rgba(8,4,18,0.98) 100%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
              padding: "40px 32px",
            }}>
              {/* Logo — forced white */}
              <div style={{
                position: "relative",
                width: `${card.logoW}px`,
                height: `${card.logoH}px`,
                filter: "brightness(0) invert(1) drop-shadow(0 0 16px rgba(255,255,255,0.2))",
              }}>
                <Image src={card.logo} alt={card.title} fill style={{ objectFit: "contain" }} />
              </div>

              <span style={{
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "rgba(200,180,255,0.55)",
                textAlign: "center",
                fontFamily: "var(--font-inter), 'Inter', sans-serif",
              }}>
                {card.title}
              </span>

              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "18px", height: "1px", background: "rgba(155,48,255,0.35)" }} />
                <span style={{
                  fontSize: "8px", letterSpacing: "0.3em", textTransform: "uppercase",
                  color: "rgba(155,48,255,0.4)", fontFamily: "var(--font-inter), 'Inter', sans-serif",
                }}>Hover</span>
                <div style={{ width: "18px", height: "1px", background: "rgba(155,48,255,0.35)" }} />
              </div>
            </div>

            {/* BACK */}
            <div className="flip-card-back" style={{
              background: "linear-gradient(145deg, rgba(30,10,60,0.97) 0%, rgba(10,4,25,0.99) 100%)",
              display: "flex",
              flexDirection: "column",
              padding: "28px 26px",
              gap: "14px",
            }}>
              {/* Back header */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "10px" }}>
                  <div style={{
                    width: "4px", height: "4px", borderRadius: "50%",
                    background: "rgba(155,48,255,0.9)", boxShadow: "0 0 6px rgba(155,48,255,0.6)",
                  }} />
                  <span style={{
                    fontSize: "8px", fontWeight: 600, letterSpacing: "0.4em",
                    textTransform: "uppercase", color: "rgba(155,48,255,0.65)",
                    fontFamily: "var(--font-inter), 'Inter', sans-serif",
                  }}>About</span>
                </div>
                <h3 style={{
                  fontSize: "16px", fontWeight: 700, color: "#ffffff",
                  lineHeight: 1.2, letterSpacing: "-0.01em",
                  fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
                }}>
                  {card.title}
                </h3>
              </div>

              <div style={{ width: "100%", height: "1px", background: "rgba(155,48,255,0.12)" }} />

              {/* Description — smaller, lighter, no scroll */}
              <p style={{
                fontSize: "12px",
                lineHeight: 1.7,
                color: "rgba(190,175,215,0.6)",
                fontFamily: "var(--font-inter), 'Inter', sans-serif",
                flex: 1,
              }}>
                {card.description}
              </p>

              <div style={{ width: "100%", height: "1px", background: "rgba(155,48,255,0.10)" }} />

              {/* Social links */}
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <SocialBtn href={card.links.linkedin}><LinkedInIcon /></SocialBtn>
                <SocialBtn href={card.links.facebook}><FacebookIcon /></SocialBtn>
                <SocialBtn href={card.links.web}><WebIcon /></SocialBtn>
              </div>
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function WhoWeAreSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="who-we-are"
      ref={ref}
      className="who-section-pad"
      style={{
        position: "relative",
        width: "100%",
        background: "#000000",
        overflow: "hidden",
        fontFamily: "var(--font-inter), 'Inter', sans-serif",
      }}
    >
      <div style={{
        position: "absolute", left: "50%", top: "50%",
        transform: "translate(-50%, -50%)",
        width: "800px", height: "600px",
        background: "radial-gradient(ellipse, rgba(100,20,200,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Header */}
      <motion.div
        style={{ textAlign: "center", marginBottom: "72px" }}
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, ease: EASE }}
      >
        <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
          <span style={{ width: "32px", height: "1px", background: "rgba(155,48,255,0.45)", display: "block" }} />
          <span style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "0.5em", textTransform: "uppercase", color: "rgba(155,48,255,0.7)" }}>
            Who We Are
          </span>
          <span style={{ width: "32px", height: "1px", background: "rgba(155,48,255,0.45)", display: "block" }} />
        </div>
        <h2 style={{
          fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 300,
          letterSpacing: "-0.03em", lineHeight: 1.1, color: "#ffffff",
          fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
        }}>
          The{" "}
          <span style={{
            fontWeight: 800,
            background: "linear-gradient(130deg, #e2d9ff 0%, #a78bfa 45%, #7c3aed 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>Organizations</span>{" "}Behind TSYP 14
        </h2>
        <p style={{ marginTop: "14px", fontSize: "13px", color: "rgba(180,160,220,0.45)", letterSpacing: "0.02em" }}>
          Hover each card to discover more
        </p>
      </motion.div>

      {/* Cards */}
      <div className="cards-flex" style={{
        gap: "clamp(20px, 3vw, 36px)",
        justifyContent: "center", alignItems: "stretch",
        maxWidth: "1140px", margin: "0 auto", flexWrap: "wrap",
      }}>
        {CARDS.map((card, i) => (
          <FlipCard key={card.id} card={card} index={i} inView={inView} />
        ))}
      </div>
    </section>
  );
}
