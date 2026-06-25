"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ─────────────────────────────────────
   DATA — 10 challenges
───────────────────────────────────── */

interface Challenge {
  id: string;
  name: string;
  overview: string;
  phase1: string;
  finalSubmission: string;
  specLink: string;
  glowColor: string;
}

const CHALLENGES: Challenge[] = [
  { id: "robotics", name: "Robotics Challenge", overview: "Design and program an autonomous robot to navigate an obstacle course and complete time-critical missions.", phase1: "Jan 15, 2027", finalSubmission: "Feb 28, 2027", specLink: "#", glowColor: "rgba(155,48,255,0.35)" },
  { id: "ai-hackathon", name: "AI Hackathon", overview: "Build an AI-powered solution tackling real-world problems in healthcare, education, or smart cities.", phase1: "Jan 10, 2027", finalSubmission: "Mar 5, 2027", specLink: "#", glowColor: "rgba(0,120,255,0.35)" },
  { id: "cybersecurity", name: "CyberSecurity CTF", overview: "Capture-the-flag covering web exploitation, reverse engineering, cryptography, and forensics.", phase1: "Jan 5, 2027", finalSubmission: "Feb 20, 2027", specLink: "#", glowColor: "rgba(255,40,80,0.35)" },
  { id: "iot", name: "IoT Smart Solutions", overview: "Prototype an IoT system addressing energy efficiency, water management, or urban mobility.", phase1: "Jan 12, 2027", finalSubmission: "Mar 1, 2027", specLink: "#", glowColor: "rgba(0,200,120,0.35)" },
  { id: "data-science", name: "Data Science Challenge", overview: "Solve a real-world data problem with ML — from feature engineering to model deployment.", phase1: "Jan 8, 2027", finalSubmission: "Feb 25, 2027", specLink: "#", glowColor: "rgba(200,0,200,0.35)" },
  { id: "ethics", name: "Ethics Competition", overview: "Analyze ethical dilemmas in emerging technologies and propose actionable frameworks.", phase1: "Jan 10, 2027", finalSubmission: "Mar 5, 2027", specLink: "#", glowColor: "rgba(255,180,0,0.35)" },
  { id: "embedded", name: "Embedded Systems", overview: "Design a low-power embedded system for real-time sensor processing and edge computing.", phase1: "Jan 18, 2027", finalSubmission: "Mar 3, 2027", specLink: "#", glowColor: "rgba(0,180,220,0.35)" },
  { id: "sustainability", name: "Green Tech Challenge", overview: "Develop sustainable technology solutions addressing climate change and renewable energy.", phase1: "Jan 20, 2027", finalSubmission: "Mar 8, 2027", specLink: "#", glowColor: "rgba(40,200,80,0.35)" },
  { id: "telecom", name: "5G & Telecom Innovation", overview: "Create innovative applications leveraging 5G networks for low-latency communication.", phase1: "Jan 14, 2027", finalSubmission: "Feb 27, 2027", specLink: "#", glowColor: "rgba(255,100,50,0.35)" },
  { id: "entrepreneurship", name: "Tech Startup Pitch", overview: "Pitch a viable tech startup idea — from market analysis to MVP prototype and business model.", phase1: "Jan 22, 2027", finalSubmission: "Mar 10, 2027", specLink: "#", glowColor: "rgba(100,60,255,0.35)" },
];

/* ─────────────────────────────────────
   ICONS
───────────────────────────────────── */

function CalendarIcon() {
  return <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(155,48,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
}

function DownloadIcon() {
  return <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
}

/* ─────────────────────────────────────
   FLIP CARD — compact
───────────────────────────────────── */

function ChallengeCard({ challenge, index, inView }: { challenge: Challenge; index: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: EASE, delay: 0.05 + index * 0.05 }}
      style={{ position: "relative", minWidth: 0 }}
    >
      {/* Glow */}
      <div style={{
        position: "absolute", inset: "-12px",
        background: `radial-gradient(ellipse 80% 80% at 50% 100%, ${challenge.glowColor} 0%, transparent 70%)`,
        borderRadius: "24px", filter: "blur(16px)", zIndex: 0, pointerEvents: "none",
      }} />

      {/* Animated border */}
      <div className="flip-card-border" style={{ position: "relative", zIndex: 1, height: "290px" }}>
        <div className="flip-card-wrapper" style={{ width: "100%", height: "100%" }}>
          <div className="flip-card-inner">

            {/* FRONT */}
            <div className="flip-card-front" style={{
              background: "linear-gradient(145deg, rgba(18,10,35,0.95) 0%, rgba(8,4,18,0.98) 100%)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              gap: "14px", padding: "24px 16px",
            }}>
              {/* Logo */}
              <div style={{
                width: "90px", height: "90px", borderRadius: "16px",
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
                display: "flex", alignItems: "center", justifyContent: "center",
                overflow: "hidden", padding: "6px",
              }}>
                <img
                  src="/challenges/ieee-ras.png"
                  alt="Challenge logo"
                  style={{ width: "100%", height: "100%", objectFit: "contain", filter: "brightness(0) invert(1) drop-shadow(0 0 8px rgba(255,255,255,0.15))" }}
                />
              </div>

              <h3 style={{
                fontSize: "15px", fontWeight: 700, color: "#ffffff", textAlign: "center",
                lineHeight: 1.3, letterSpacing: "-0.01em",
                fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
              }}>{challenge.name}</h3>

              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <div style={{ width: "14px", height: "1px", background: "rgba(155,48,255,0.35)" }} />
                <span style={{ fontSize: "7px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(155,48,255,0.4)" }}>Hover</span>
                <div style={{ width: "14px", height: "1px", background: "rgba(155,48,255,0.35)" }} />
              </div>
            </div>

            {/* BACK */}
            <div className="flip-card-back" style={{
              background: "linear-gradient(145deg, rgba(30,10,60,0.97) 0%, rgba(10,4,25,0.99) 100%)",
              display: "flex", flexDirection: "column", padding: "16px 14px", gap: "8px",
            }}>
              {/* Title */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "4px" }}>
                  <div style={{ width: "3px", height: "3px", borderRadius: "50%", background: "rgba(155,48,255,0.9)", boxShadow: "0 0 4px rgba(155,48,255,0.6)" }} />
                  <span style={{ fontSize: "7px", fontWeight: 600, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(155,48,255,0.6)" }}>Challenge</span>
                </div>
                <h3 style={{
                  fontSize: "12px", fontWeight: 700, color: "#ffffff", lineHeight: 1.2,
                  fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
                }}>{challenge.name}</h3>
              </div>

              <div style={{ width: "100%", height: "1px", background: "rgba(155,48,255,0.08)" }} />

              {/* Overview */}
              <p style={{
                fontSize: "9.5px", lineHeight: 1.6, color: "rgba(190,175,215,0.5)",
                fontFamily: "var(--font-inter), 'Inter', sans-serif", flex: 1,
              }}>{challenge.overview}</p>

              <div style={{ width: "100%", height: "1px", background: "rgba(155,48,255,0.08)" }} />

              {/* Deadlines */}
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <CalendarIcon />
                  <span style={{ fontSize: "8.5px", color: "rgba(255,255,255,0.4)" }}>
                    <span style={{ color: "rgba(155,48,255,0.6)", fontWeight: 600 }}>Phase 1:</span> {challenge.phase1}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <CalendarIcon />
                  <span style={{ fontSize: "8.5px", color: "rgba(255,255,255,0.4)" }}>
                    <span style={{ color: "rgba(155,48,255,0.6)", fontWeight: 600 }}>Final:</span> {challenge.finalSubmission}
                  </span>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => window.open(challenge.specLink, "_blank")}
                style={{
                  marginTop: "2px", padding: "7px 0", width: "100%",
                  background: "linear-gradient(135deg, #9b30ff 0%, #7c3aed 100%)",
                  color: "#ffffff", fontSize: "8.5px", fontWeight: 700,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  borderRadius: "8px", border: "1px solid rgba(155,48,255,0.4)",
                  cursor: "pointer", boxShadow: "0 0 12px rgba(155,48,255,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "5px",
                  transition: "box-shadow 0.2s ease",
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 24px rgba(155,48,255,0.4)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 0 12px rgba(155,48,255,0.2)"; }}
              >
                <DownloadIcon />
                Spec Book
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

        {/* Hero */}
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
              margin: 0, fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
            }}
          >
            <span style={{ color: "#ffffff" }}>The </span>
            <span style={{
              background: "linear-gradient(135deg, #9b30ff 20%, #c084fc 80%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Challenges</span>
          </motion.h1>
        </section>

        <div style={{ width: "100%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(155,48,255,0.2) 50%, transparent)" }} />

        {/* Cards */}
        <section ref={ref} style={{ padding: "60px 24px 120px" }}>
          <div className="challenges-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
            maxWidth: "1060px",
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
