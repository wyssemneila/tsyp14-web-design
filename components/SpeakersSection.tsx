"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface Speaker {
  id: number;
  name: string;
  position: string;
  country: string;
  countryCode: string;
  image: string;       // put real image path here e.g. "/speakers/john.jpg"
  initials: string;    // fallback if no image
  gradient: string;    // gradient for avatar placeholder
}

// ── Replace with real speaker data ──
const SPEAKERS: Speaker[] = [
  { id: 1,  name: "Dr. Ahmed Khalil",   position: "AI Research Director",        country: "Tunisia",   countryCode: "tn", image: "", initials: "AK", gradient: "135deg,#9b30ff,#7c3aed" },
  { id: 2,  name: "Sarah Mitchell",     position: "IEEE Fellow & Professor",      country: "USA",       countryCode: "us", image: "", initials: "SM", gradient: "135deg,#7c3aed,#c026d3" },
  { id: 3,  name: "Prof. Yuki Tanaka",  position: "Quantum Computing Lead",       country: "Japan",     countryCode: "jp", image: "", initials: "YT", gradient: "135deg,#c026d3,#9b30ff" },
  { id: 4,  name: "Fatima Al-Hassan",   position: "CTO, NeuralTech MENA",         country: "UAE",       countryCode: "ae", image: "", initials: "FA", gradient: "135deg,#6d28d9,#9b30ff" },
  { id: 5,  name: "Dr. Pierre Dubois",  position: "Director, CNRS Innovation",    country: "France",    countryCode: "fr", image: "", initials: "PD", gradient: "135deg,#9b30ff,#6d28d9" },
  { id: 6,  name: "Amara Diallo",       position: "ML Engineer, Google DeepMind", country: "Senegal",   countryCode: "sn", image: "", initials: "AD", gradient: "135deg,#7c3aed,#9b30ff" },
  { id: 7,  name: "Dr. Chen Wei",       position: "Biotech Research Lead",        country: "China",     countryCode: "cn", image: "", initials: "CW", gradient: "135deg,#c026d3,#7c3aed" },
  { id: 8,  name: "Lena Hoffmann",      position: "CTO, EuroTech Systems",        country: "Germany",   countryCode: "de", image: "", initials: "LH", gradient: "135deg,#9b30ff,#c026d3" },
  { id: 9,  name: "Omar Ben Salah",     position: "IEEE Tunisia Section Chair",   country: "Tunisia",   countryCode: "tn", image: "", initials: "OB", gradient: "135deg,#6d28d9,#7c3aed" },
  { id: 10, name: "Dr. Priya Sharma",   position: "Robotics Professor, IIT",      country: "India",     countryCode: "in", image: "", initials: "PS", gradient: "135deg,#7c3aed,#c026d3" },
  { id: 11, name: "Carlos Mendez",      position: "Space Tech Lead, ESA",         country: "Spain",     countryCode: "es", image: "", initials: "CM", gradient: "135deg,#9b30ff,#7c3aed" },
  { id: 12, name: "Dr. Aisha Keita",    position: "Cybersecurity Expert",         country: "Morocco",   countryCode: "ma", image: "", initials: "AK", gradient: "135deg,#c026d3,#6d28d9" },
  { id: 13, name: "James Okonkwo",      position: "Blockchain Architect",         country: "Nigeria",   countryCode: "ng", image: "", initials: "JO", gradient: "135deg,#7c3aed,#9b30ff" },
  { id: 14, name: "Dr. Eva Lindqvist",  position: "Climate Tech Researcher",      country: "Sweden",    countryCode: "se", image: "", initials: "EL", gradient: "135deg,#9b30ff,#c026d3" },
  { id: 15, name: "Ali Hamdouni",       position: "Smart Cities Director",        country: "Tunisia",   countryCode: "tn", image: "", initials: "AH", gradient: "135deg,#6d28d9,#9b30ff" },
  { id: 16, name: "Dr. Kofi Mensah",    position: "Energy Innovation Lead",       country: "Ghana",     countryCode: "gh", image: "", initials: "KM", gradient: "135deg,#9b30ff,#7c3aed" },
  { id: 17, name: "Maria Santos",       position: "FinTech & AI Strategist",      country: "Brazil",    countryCode: "br", image: "", initials: "MS", gradient: "135deg,#c026d3,#9b30ff" },
  { id: 18, name: "Dr. Rami Al-Farsi",  position: "IEEE Region 8 Director",       country: "Jordan",    countryCode: "jo", image: "", initials: "RF", gradient: "135deg,#7c3aed,#6d28d9" },
  { id: 19, name: "Nour Bensalem",      position: "Women in Engineering Lead",    country: "Tunisia",   countryCode: "tn", image: "", initials: "NB", gradient: "135deg,#9b30ff,#c026d3" },
  { id: 20, name: "Dr. Ivan Petrov",    position: "Photonics Research Chair",     country: "Russia",    countryCode: "ru", image: "", initials: "IP", gradient: "135deg,#6d28d9,#c026d3" },
];

/* Split 20 speakers into 4 columns of 5 */
const COLS = [
  { speakers: SPEAKERS.slice(0, 5),   direction: "up",   duration: 32 },
  { speakers: SPEAKERS.slice(5, 10),  direction: "down", duration: 26 },
  { speakers: SPEAKERS.slice(10, 15), direction: "up",   duration: 28 },
  { speakers: SPEAKERS.slice(15, 20), direction: "down", duration: 30 },
] as const;

function SpeakerAvatar({ speaker }: { speaker: Speaker }) {
  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "1 / 1", borderRadius: "12px 12px 0 0", overflow: "hidden", flexShrink: 0 }}>
      {speaker.image ? (
        <img
          src={speaker.image}
          alt={speaker.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          loading="lazy"
        />
      ) : (
        /* Gradient avatar placeholder */
        <div style={{
          width: "100%", height: "100%",
          background: `linear-gradient(${speaker.gradient})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative",
        }}>
          {/* Noise texture overlay */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.12) 0%, transparent 60%)`,
          }} />
          <span style={{
            fontSize: "clamp(28px, 4vw, 40px)",
            fontWeight: 800,
            color: "rgba(255,255,255,0.9)",
            letterSpacing: "-0.02em",
            fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
            position: "relative", zIndex: 1,
            textShadow: "0 2px 20px rgba(0,0,0,0.3)",
          }}>
            {speaker.initials}
          </span>
        </div>
      )}

      {/* Bottom gradient overlay on photo */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "50%",
        background: "linear-gradient(to top, rgba(6,2,22,0.85), transparent)",
        pointerEvents: "none",
      }} />

      {/* Country flag badge */}
      <div style={{
        position: "absolute", bottom: "10px", right: "10px",
        background: "rgba(0,0,0,0.65)",
        border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: "6px",
        padding: "3px 7px",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", gap: "5px",
      }}>
        {/* Flag image from flagcdn */}
        <img
          src={`https://flagcdn.com/w20/${speaker.countryCode}.png`}
          alt={speaker.country}
          width={16}
          height={12}
          style={{ borderRadius: "2px", objectFit: "cover", display: "block" }}
          loading="lazy"
        />
        <span style={{
          fontSize: "8px", fontWeight: 600, letterSpacing: "0.08em",
          color: "rgba(255,255,255,0.7)", textTransform: "uppercase",
          fontFamily: "var(--font-inter), 'Inter', sans-serif",
          lineHeight: 1,
        }}>
          {speaker.country}
        </span>
      </div>
    </div>
  );
}

function SpeakerCard({ speaker }: { speaker: Speaker }) {
  return (
    <div className="speaker-card">
      {/* Scan line on hover */}
      <div className="speaker-scan" aria-hidden />

      {/* Top glow */}
      <div className="speaker-top-glow" aria-hidden />

      <SpeakerAvatar speaker={speaker} />

      {/* Text content */}
      <div style={{ padding: "14px 16px 16px", flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
        <p style={{
          fontSize: "13px", fontWeight: 700,
          color: "#ffffff", margin: 0,
          letterSpacing: "-0.01em",
          fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
          lineHeight: 1.3,
        }}>
          {speaker.name}
        </p>
        <p style={{
          fontSize: "10px", fontWeight: 500,
          color: "rgba(155,48,255,0.75)", margin: 0,
          letterSpacing: "0.04em",
          fontFamily: "var(--font-inter), 'Inter', sans-serif",
          lineHeight: 1.4,
        }}>
          {speaker.position}
        </p>
      </div>
    </div>
  );
}

function VerticalCol({ speakers, direction, duration }: {
  speakers: Speaker[];
  direction: "up" | "down";
  duration: number;
}) {
  const doubled = [...speakers, ...speakers];
  return (
    <div className="speaker-col-wrap">
      <div
        className={direction === "up" ? "speaker-track-up" : "speaker-track-down"}
        style={{ animationDuration: `${duration}s` }}
      >
        {doubled.map((s, i) => (
          <SpeakerCard key={`${s.id}-${i}`} speaker={s} />
        ))}
      </div>
    </div>
  );
}

export default function SpeakersSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        width: "100%",
        padding: "100px 0 0",
        background: "#000000",
        overflow: "hidden",
      }}
    >
      {/* Ambient */}
      <div aria-hidden style={{
        position: "absolute", top: "20%", left: "50%",
        transform: "translateX(-50%)",
        width: "900px", height: "600px",
        background: "radial-gradient(ellipse, rgba(124,58,237,0.08) 0%, transparent 65%)",
        pointerEvents: "none", filter: "blur(40px)",
      }} />

      {/* Header */}
      <div style={{ textAlign: "center", padding: "0 24px", marginBottom: "56px", position: "relative", zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <div style={{ width: "32px", height: "1px", background: "linear-gradient(90deg, transparent, rgba(155,48,255,0.5))" }} />
            <span style={{
              fontSize: "10px", fontWeight: 700, letterSpacing: "0.38em",
              textTransform: "uppercase", color: "rgba(155,48,255,0.6)",
              fontFamily: "var(--font-inter), 'Inter', sans-serif",
            }}>Featured Speakers</span>
            <div style={{ width: "32px", height: "1px", background: "linear-gradient(90deg, rgba(155,48,255,0.5), transparent)" }} />
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE, delay: 0.08 }}
          style={{
            fontSize: "clamp(32px, 5vw, 64px)",
            fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05,
            margin: 0, fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
          }}
        >
          <span style={{ color: "#ffffff" }}>Talks &amp; </span>
          <span style={{ color: "transparent", WebkitTextStroke: "1px rgba(155,48,255,0.7)" }}>Discussion</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 0.16 }}
          style={{
            marginTop: "14px", fontSize: "13px",
            color: "rgba(255,255,255,0.28)", letterSpacing: "0.08em",
            fontFamily: "var(--font-inter), 'Inter', sans-serif", textTransform: "uppercase",
          }}
        >
          20 world-class speakers · global perspectives
        </motion.p>
      </div>

      {/* 4-column vertical carousel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, ease: EASE, delay: 0.3 }}
        className="speakers-grid"
      >
        {COLS.map((col, i) => (
          <VerticalCol key={i} speakers={col.speakers} direction={col.direction} duration={col.duration} />
        ))}
      </motion.div>
    </section>
  );
}
