"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const CARDS = [
  {
    id: "ieee-section",
    logo: "/ieee-tunisia-light.png",
    logoW: 200,
    logoH: 80,
    title: "IEEE Tunisia Section",
    glow: "rgba(0,100,255,0.22)",
    glowStrong: "rgba(0,80,220,0.45)",
    description: `Founded in 2008, the IEEE Tunisia Section is dedicated to spreading IEEE initiatives throughout Tunisia. This is achieved through educational and technical programs, networking opportunities, and the advancement of technology to address humanitarian challenges.\n\nThe section actively supports chapters, student activities, and student awards. IEEE has firmly established its presence in the Tunisian engineering community, with over 43 Student Branches across universities.`,
  },
  {
    id: "ieee-sb",
    logo: "/sb.png",
    logoW: 180,
    logoH: 90,
    title: "IEEE INSAT Student Branch",
    glow: "rgba(155,48,255,0.22)",
    glowStrong: "rgba(130,30,255,0.45)",
    description: `The IEEE INSAT Student Branch is one of the most active student branches in Tunisia, operating under the IEEE Tunisia Section. It brings together passionate engineering students to explore, innovate, and collaborate on technical and scientific projects.\n\nThe branch organizes workshops, competitions, and networking events, fostering a culture of excellence and community within INSAT and beyond.`,
  },
  {
    id: "insat",
    logo: "/insat.png",
    logoW: 160,
    logoH: 90,
    title: "INSAT",
    glow: "rgba(200,50,150,0.22)",
    glowStrong: "rgba(180,30,130,0.45)",
    description: `The National Institute of Applied Science and Technology (INSAT) is a renowned engineering school in Tunisia, based in Tunis and recognized as one of the top institutions in the country.\n\nINSAT is a public institution focused on higher education and research, and it is part of the University of Carthage.`,
  },
];

function FlipCard({ card, index, inView }: { card: typeof CARDS[0]; index: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: EASE, delay: 0.2 + index * 0.12 }}
      style={{ position: "relative", flex: "1 1 0", minWidth: 0, maxWidth: "360px" }}
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
        {/* Card flip wrapper */}
        <div className="flip-card-wrapper" style={{ width: "100%", height: "100%" }}>
          <div className="flip-card-inner">

            {/* FRONT */}
            <div className="flip-card-front" style={{
              background: "linear-gradient(145deg, rgba(18,10,35,0.95) 0%, rgba(8,4,18,0.98) 100%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "24px",
              padding: "40px 32px",
            }}>
              {/* Logo */}
              <div style={{
                position: "relative",
                width: `${card.logoW}px`,
                height: `${card.logoH}px`,
                filter: "drop-shadow(0 0 20px rgba(155,48,255,0.3))",
              }}>
                <Image
                  src={card.logo}
                  alt={card.title}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>

              {/* Title */}
              <span style={{
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "rgba(200,180,255,0.6)",
                textAlign: "center",
                fontFamily: "var(--font-inter), 'Inter', sans-serif",
              }}>
                {card.title}
              </span>

              {/* Hover hint */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginTop: "8px",
              }}>
                <div style={{
                  width: "20px",
                  height: "1px",
                  background: "rgba(155,48,255,0.4)",
                }} />
                <span style={{
                  fontSize: "9px",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "rgba(155,48,255,0.45)",
                  fontFamily: "var(--font-inter), 'Inter', sans-serif",
                }}>
                  Hover to learn more
                </span>
                <div style={{
                  width: "20px",
                  height: "1px",
                  background: "rgba(155,48,255,0.4)",
                }} />
              </div>
            </div>

            {/* BACK */}
            <div className="flip-card-back" style={{
              background: "linear-gradient(145deg, rgba(30,10,60,0.97) 0%, rgba(10,4,25,0.99) 100%)",
              display: "flex",
              flexDirection: "column",
              padding: "32px 28px",
              gap: "16px",
              overflowY: "auto",
            }}>
              {/* Back title */}
              <div>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "14px",
                }}>
                  <div style={{
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background: "rgba(155,48,255,0.9)",
                    boxShadow: "0 0 6px rgba(155,48,255,0.6)",
                  }} />
                  <span style={{
                    fontSize: "9px",
                    fontWeight: 600,
                    letterSpacing: "0.4em",
                    textTransform: "uppercase",
                    color: "rgba(155,48,255,0.7)",
                    fontFamily: "var(--font-inter), 'Inter', sans-serif",
                  }}>
                    About
                  </span>
                </div>
                <h3 style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#ffffff",
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                  fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
                }}>
                  {card.title}
                </h3>
              </div>

              <div style={{
                width: "100%",
                height: "1px",
                background: "rgba(155,48,255,0.15)",
              }} />

              <p style={{
                fontSize: "13px",
                lineHeight: 1.75,
                color: "rgba(200,190,220,0.72)",
                fontFamily: "var(--font-inter), 'Inter', sans-serif",
                whiteSpace: "pre-line",
                flex: 1,
              }}>
                {card.description}
              </p>
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
      style={{
        position: "relative",
        width: "100%",
        background: "#000000",
        padding: "100px 48px 120px",
        overflow: "hidden",
        fontFamily: "var(--font-inter), 'Inter', sans-serif",
      }}
    >
      {/* Ambient background */}
      <div style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: "800px",
        height: "600px",
        background: "radial-gradient(ellipse, rgba(100,20,200,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Section header */}
      <motion.div
        style={{ textAlign: "center", marginBottom: "72px" }}
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, ease: EASE }}
      >
        <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
          <span style={{ width: "32px", height: "1px", background: "rgba(155,48,255,0.45)", display: "block" }} />
          <span style={{
            fontSize: "9px", fontWeight: 600, letterSpacing: "0.5em",
            textTransform: "uppercase", color: "rgba(155,48,255,0.7)",
          }}>
            Who We Are
          </span>
          <span style={{ width: "32px", height: "1px", background: "rgba(155,48,255,0.45)", display: "block" }} />
        </div>

        <h2 style={{
          fontSize: "clamp(2rem, 4vw, 3.5rem)",
          fontWeight: 300,
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          color: "#ffffff",
          fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
        }}>
          The{" "}
          <span style={{
            fontWeight: 800,
            background: "linear-gradient(130deg, #e2d9ff 0%, #a78bfa 45%, #7c3aed 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            Organizations
          </span>{" "}
          Behind TSYP 14
        </h2>

        <p style={{
          marginTop: "16px",
          fontSize: "14px",
          color: "rgba(180,160,220,0.5)",
          letterSpacing: "0.02em",
        }}>
          Hover each card to discover more
        </p>
      </motion.div>

      {/* Cards row */}
      <div style={{
        display: "flex",
        gap: "clamp(20px, 3vw, 36px)",
        justifyContent: "center",
        alignItems: "stretch",
        maxWidth: "1140px",
        margin: "0 auto",
        flexWrap: "wrap",
      }}>
        {CARDS.map((card, i) => (
          <FlipCard key={card.id} card={card} index={i} inView={inView} />
        ))}
      </div>
    </section>
  );
}
