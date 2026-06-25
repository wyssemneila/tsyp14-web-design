"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ─────────────────────────────────────
   DATA
───────────────────────────────────── */

interface Challenge {
  id: string;
  name: string;
  logos: string[];
  overview: string;
  phase1: string;
  finalSubmission: string;
  specLink: string;
  glowColor: string;
}

const CHALLENGES: Challenge[] = [
  {
    id: "orange-ai",
    name: "Orange AI Hackathon",
    logos: ["/challenges/orange.svg"],
    overview: "Build an AI-powered solution that tackles real-world problems in healthcare, education, or smart cities using Orange's open APIs and datasets.",
    phase1: "January 15, 2027",
    finalSubmission: "February 28, 2027",
    specLink: "#",
    glowColor: "rgba(255,120,0,0.4)",
  },
  {
    id: "ieee-ethics",
    name: "IEEE Ethics Competition",
    logos: ["/challenges/ieee-ethics.svg"],
    overview: "Analyze ethical dilemmas in emerging technologies — autonomous systems, AI bias, and data privacy — and propose actionable frameworks.",
    phase1: "January 10, 2027",
    finalSubmission: "March 5, 2027",
    specLink: "#",
    glowColor: "rgba(0,100,200,0.4)",
  },
  {
    id: "robotics",
    name: "Robotics Challenge",
    logos: ["/challenges/robotics.svg"],
    overview: "Design and program an autonomous robot to navigate an obstacle course, collect targets, and complete time-critical missions.",
    phase1: "December 20, 2026",
    finalSubmission: "February 15, 2027",
    specLink: "#",
    glowColor: "rgba(0,200,120,0.4)",
  },
  {
    id: "cybersecurity",
    name: "CyberSecurity CTF",
    logos: ["/challenges/cyber.svg"],
    overview: "Capture-the-flag competition covering web exploitation, reverse engineering, cryptography, and network forensics challenges.",
    phase1: "January 5, 2027",
    finalSubmission: "February 20, 2027",
    specLink: "#",
    glowColor: "rgba(255,40,80,0.4)",
  },
  {
    id: "iot-smart",
    name: "IoT Smart Solutions",
    logos: ["/challenges/iot.svg", "/challenges/tunisie-telecom.svg"],
    overview: "Prototype an IoT system addressing energy efficiency, water management, or urban mobility using affordable hardware and cloud services.",
    phase1: "January 12, 2027",
    finalSubmission: "March 1, 2027",
    specLink: "#",
    glowColor: "rgba(100,60,255,0.4)",
  },
  {
    id: "data-science",
    name: "Data Science Challenge",
    logos: ["/challenges/data.svg"],
    overview: "Solve a real-world data problem with machine learning — from data cleaning and feature engineering to model deployment and visualization.",
    phase1: "January 8, 2027",
    finalSubmission: "February 25, 2027",
    specLink: "#",
    glowColor: "rgba(200,0,200,0.4)",
  },
];

/* ─────────────────────────────────────
   ICONS
───────────────────────────────────── */

function CalendarIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(155,48,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
}

function DownloadIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
}

/* ─────────────────────────────────────
   FLIP CARD
───────────────────────────────────── */

function ChallengeCard({ challenge, index, inView }: { challenge: Challenge; index: number; inView: boolean }) {
  const initials = challenge.name.split(" ").map(w => w[0]).join("").slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE, delay: 0.1 + index * 0.08 }}
      style={{ position: "relative", minWidth: 0 }}
    >
      {/* Glow */}
      <div style={{
        position: "absolute", inset: "-16px",
        background: `radial-gradient(ellipse 80% 80% at 50% 100%, ${challenge.glowColor} 0%, transparent 70%)`,
        borderRadius: "28px", filter: "blur(20px)", zIndex: 0, pointerEvents: "none",
      }} />

      {/* Animated border */}
      <div className="flip-card-border" style={{ position: "relative", zIndex: 1, height: "320px" }}>
        <div className="flip-card-wrapper" style={{ width: "100%", height: "100%" }}>
          <div className="flip-card-inner">

            {/* FRONT */}
            <div className="flip-card-front" style={{
              background: "linear-gradient(145deg, rgba(18,10,35,0.95) 0%, rgba(8,4,18,0.98) 100%)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              gap: "16px", padding: "32px 24px",
            }}>
              {/* Logo placeholders */}
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                {challenge.logos.map((_, li) => (
                  <div key={li} style={{
                    width: "48px", height: "48px", borderRadius: "12px",
                    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "16px", fontWeight: 800, color: "rgba(155,48,255,0.3)",
                    fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
                  }}>
                    {li === 0 ? initials.slice(0, 2) : "++"}
                  </div>
                ))}
              </div>

              <h3 style={{
                fontSize: "15px", fontWeight: 700, color: "#ffffff", textAlign: "center",
                lineHeight: 1.3, letterSpacing: "-0.01em",
                fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
              }}>{challenge.name}</h3>

              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "16px", height: "1px", background: "rgba(155,48,255,0.35)" }} />
                <span style={{
                  fontSize: "8px", letterSpacing: "0.3em", textTransform: "uppercase",
                  color: "rgba(155,48,255,0.4)", fontFamily: "var(--font-inter), 'Inter', sans-serif",
                }}>Hover to explore</span>
                <div style={{ width: "16px", height: "1px", background: "rgba(155,48,255,0.35)" }} />
              </div>
            </div>

            {/* BACK */}
            <div className="flip-card-back" style={{
              background: "linear-gradient(145deg, rgba(30,10,60,0.97) 0%, rgba(10,4,25,0.99) 100%)",
              display: "flex", flexDirection: "column", padding: "22px 20px", gap: "10px",
            }}>
              {/* Header */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                  <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(155,48,255,0.9)", boxShadow: "0 0 6px rgba(155,48,255,0.6)" }} />
                  <span style={{ fontSize: "8px", fontWeight: 600, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(155,48,255,0.65)" }}>Challenge</span>
                </div>
                <h3 style={{
                  fontSize: "14px", fontWeight: 700, color: "#ffffff", lineHeight: 1.2,
                  fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
                }}>{challenge.name}</h3>
              </div>

              <div style={{ width: "100%", height: "1px", background: "rgba(155,48,255,0.1)" }} />

              {/* Overview */}
              <p style={{
                fontSize: "11px", lineHeight: 1.65, color: "rgba(190,175,215,0.55)",
                fontFamily: "var(--font-inter), 'Inter', sans-serif",
                flex: 1,
              }}>{challenge.overview}</p>

              <div style={{ width: "100%", height: "1px", background: "rgba(155,48,255,0.1)" }} />

              {/* Deadlines */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <CalendarIcon />
                  <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)" }}>
                    <span style={{ color: "rgba(155,48,255,0.6)", fontWeight: 600 }}>Phase 1:</span> {challenge.phase1}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <CalendarIcon />
                  <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)" }}>
                    <span style={{ color: "rgba(155,48,255,0.6)", fontWeight: 600 }}>Final:</span> {challenge.finalSubmission}
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => window.open(challenge.specLink, "_blank")}
                style={{
                  marginTop: "4px",
                  padding: "9px 0",
                  width: "100%",
                  background: "linear-gradient(135deg, #9b30ff 0%, #7c3aed 100%)",
                  color: "#ffffff", fontSize: "10px", fontWeight: 700,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  borderRadius: "10px", border: "1px solid rgba(155,48,255,0.4)",
                  cursor: "pointer",
                  boxShadow: "0 0 16px rgba(155,48,255,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                  transition: "box-shadow 0.2s ease",
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 28px rgba(155,48,255,0.4)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 0 16px rgba(155,48,255,0.2)"; }}
              >
                <DownloadIcon />
                Specification Book
              </button>
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────
   PAGE
───────────────────────────────────── */

export default function ChallengesPage() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <>
      <Navbar />
      <main style={{ background: "#000000", minHeight: "100vh" }}>

        {/* Hero — compact */}
        <section style={{
          position: "relative", padding: "120px 24px 40px", textAlign: "center", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)",
            width: "700px", height: "400px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(155,48,255,0.06) 0%, transparent 65%)",
            pointerEvents: "none",
          }} />

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <span style={{ width: "32px", height: "1px", background: "linear-gradient(90deg, transparent, rgba(155,48,255,0.5))" }} />
              <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.38em", textTransform: "uppercase", color: "rgba(155,48,255,0.6)" }}>TSYP 14 · Program</span>
              <span style={{ width: "32px", height: "1px", background: "linear-gradient(90deg, rgba(155,48,255,0.5), transparent)" }} />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: EASE }}
            style={{
              fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1,
              margin: "0 0 16px", fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
            }}
          >
            <span style={{ color: "#ffffff" }}>The </span>
            <span style={{
              background: "linear-gradient(135deg, #9b30ff 20%, #c084fc 80%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Challenges</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: EASE }}
            style={{
              fontSize: "14px", color: "rgba(255,255,255,0.35)", maxWidth: "460px", margin: "0 auto",
              fontFamily: "var(--font-inter), 'Inter', sans-serif", lineHeight: 1.6,
            }}
          >
            Six competitions. Real problems. Hover each card to learn more
            and download the specification book.
          </motion.p>
        </section>

        <div style={{ width: "100%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(155,48,255,0.2) 50%, transparent)" }} />

        {/* Cards grid */}
        <section ref={ref} style={{ padding: "80px 24px 120px" }}>
          <div className="challenges-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
            maxWidth: "960px",
            margin: "0 auto",
          }}>
            {CHALLENGES.map((ch, i) => (
              <ChallengeCard key={ch.id} challenge={ch} index={i} inView={inView} />
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
