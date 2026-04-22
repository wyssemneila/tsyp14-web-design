"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useMotionValue, useAnimation } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface Speaker {
  id: number;
  name: string;
  position: string;
  country: string;
  countryCode: string;
  image: string;
  initials: string;
  gradient: string;
}

const SPEAKERS: Speaker[] = [
  { id: 1,  name: "Dr. Ahmed Khalil",   position: "AI Research Director",        country: "Tunisia",  countryCode: "tn", image: "", initials: "AK", gradient: "135deg,#9b30ff,#7c3aed" },
  { id: 2,  name: "Sarah Mitchell",     position: "IEEE Fellow & Professor",      country: "USA",      countryCode: "us", image: "", initials: "SM", gradient: "135deg,#7c3aed,#c026d3" },
  { id: 3,  name: "Prof. Yuki Tanaka",  position: "Quantum Computing Lead",       country: "Japan",    countryCode: "jp", image: "", initials: "YT", gradient: "135deg,#c026d3,#9b30ff" },
  { id: 4,  name: "Fatima Al-Hassan",   position: "CTO, NeuralTech MENA",         country: "UAE",      countryCode: "ae", image: "", initials: "FA", gradient: "135deg,#6d28d9,#9b30ff" },
  { id: 5,  name: "Dr. Pierre Dubois",  position: "Director, CNRS Innovation",    country: "France",   countryCode: "fr", image: "", initials: "PD", gradient: "135deg,#9b30ff,#6d28d9" },
  { id: 6,  name: "Amara Diallo",       position: "ML Engineer, Google DeepMind", country: "Senegal",  countryCode: "sn", image: "", initials: "AD", gradient: "135deg,#7c3aed,#9b30ff" },
  { id: 7,  name: "Dr. Chen Wei",       position: "Biotech Research Lead",        country: "China",    countryCode: "cn", image: "", initials: "CW", gradient: "135deg,#c026d3,#7c3aed" },
  { id: 8,  name: "Lena Hoffmann",      position: "CTO, EuroTech Systems",        country: "Germany",  countryCode: "de", image: "", initials: "LH", gradient: "135deg,#9b30ff,#c026d3" },
  { id: 9,  name: "Omar Ben Salah",     position: "IEEE Tunisia Section Chair",   country: "Tunisia",  countryCode: "tn", image: "", initials: "OB", gradient: "135deg,#6d28d9,#7c3aed" },
  { id: 10, name: "Dr. Priya Sharma",   position: "Robotics Professor, IIT",      country: "India",    countryCode: "in", image: "", initials: "PS", gradient: "135deg,#7c3aed,#c026d3" },
  { id: 11, name: "Carlos Mendez",      position: "Space Tech Lead, ESA",         country: "Spain",    countryCode: "es", image: "", initials: "CM", gradient: "135deg,#9b30ff,#7c3aed" },
  { id: 12, name: "Dr. Aisha Keita",    position: "Cybersecurity Expert",         country: "Morocco",  countryCode: "ma", image: "", initials: "AK", gradient: "135deg,#c026d3,#6d28d9" },
  { id: 13, name: "James Okonkwo",      position: "Blockchain Architect",         country: "Nigeria",  countryCode: "ng", image: "", initials: "JO", gradient: "135deg,#7c3aed,#9b30ff" },
  { id: 14, name: "Dr. Eva Lindqvist",  position: "Climate Tech Researcher",      country: "Sweden",   countryCode: "se", image: "", initials: "EL", gradient: "135deg,#9b30ff,#c026d3" },
  { id: 15, name: "Ali Hamdouni",       position: "Smart Cities Director",        country: "Tunisia",  countryCode: "tn", image: "", initials: "AH", gradient: "135deg,#6d28d9,#9b30ff" },
  { id: 16, name: "Dr. Kofi Mensah",    position: "Energy Innovation Lead",       country: "Ghana",    countryCode: "gh", image: "", initials: "KM", gradient: "135deg,#9b30ff,#7c3aed" },
  { id: 17, name: "Maria Santos",       position: "FinTech & AI Strategist",      country: "Brazil",   countryCode: "br", image: "", initials: "MS", gradient: "135deg,#c026d3,#9b30ff" },
  { id: 18, name: "Dr. Rami Al-Farsi",  position: "IEEE Region 8 Director",       country: "Jordan",   countryCode: "jo", image: "", initials: "RF", gradient: "135deg,#7c3aed,#6d28d9" },
  { id: 19, name: "Nour Bensalem",      position: "Women in Engineering Lead",    country: "Tunisia",  countryCode: "tn", image: "", initials: "NB", gradient: "135deg,#9b30ff,#c026d3" },
  { id: 20, name: "Dr. Ivan Petrov",    position: "Photonics Research Chair",     country: "Russia",   countryCode: "ru", image: "", initials: "IP", gradient: "135deg,#6d28d9,#c026d3" },
];

const CARD_W = 220;
const CARD_GAP = 14;
const STEP = CARD_W + CARD_GAP;

function ArrowBtn({ dir, onClick }: { dir: "left" | "right"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === "left" ? "Previous speakers" : "Next speakers"}
      style={{
        width: "44px", height: "44px", borderRadius: "50%",
        background: "rgba(155,48,255,0.1)",
        border: "1px solid rgba(155,48,255,0.3)",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", flexShrink: 0,
        transition: "background 0.25s, border-color 0.25s, transform 0.2s",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.background = "rgba(155,48,255,0.22)";
        (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(155,48,255,0.65)";
        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.08)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.background = "rgba(155,48,255,0.1)";
        (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(155,48,255,0.3)";
        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(155,48,255,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {dir === "left"
          ? <polyline points="15 18 9 12 15 6" />
          : <polyline points="9 18 15 12 9 6" />}
      </svg>
    </button>
  );
}

function SpeakerCard({ speaker, isDragging }: { speaker: Speaker; isDragging: boolean }) {
  return (
    <div
      className="speaker-card"
      style={{ pointerEvents: isDragging ? "none" : "auto" }}
    >
      <div className="speaker-top-glow" aria-hidden />
      <div className="speaker-scan" aria-hidden />

      {/* Avatar */}
      <div style={{ position: "relative", width: "100%", aspectRatio: "3/3.2", overflow: "hidden", borderRadius: "12px 12px 0 0", flexShrink: 0 }}>
        {speaker.image ? (
          <img src={speaker.image} alt={speaker.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
        ) : (
          <div style={{
            width: "100%", height: "100%",
            background: `linear-gradient(${speaker.gradient})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative",
          }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.14) 0%, transparent 55%)" }} />
            <span style={{
              fontSize: "42px", fontWeight: 800, color: "rgba(255,255,255,0.88)",
              letterSpacing: "-0.02em",
              fontFamily: "var(--font-jakarta),'Plus Jakarta Sans',sans-serif",
              position: "relative", zIndex: 1,
              textShadow: "0 4px 24px rgba(0,0,0,0.35)",
            }}>{speaker.initials}</span>
          </div>
        )}

        {/* Photo bottom fade */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "55%",
          background: "linear-gradient(to top, rgba(6,2,22,0.9), transparent)",
          pointerEvents: "none",
        }} />

        {/* Flag badge */}
        <div style={{
          position: "absolute", bottom: "10px", right: "10px",
          background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.14)",
          borderRadius: "6px", padding: "3px 8px", backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          display: "flex", alignItems: "center", gap: "5px",
        }}>
          <img
            src={`https://flagcdn.com/w20/${speaker.countryCode}.png`}
            alt={speaker.country}
            width={16} height={12}
            style={{ borderRadius: "2px", objectFit: "cover", display: "block" }}
            loading="lazy"
          />
          <span style={{
            fontSize: "8px", fontWeight: 600, letterSpacing: "0.08em",
            color: "rgba(255,255,255,0.7)", textTransform: "uppercase",
            fontFamily: "var(--font-inter),'Inter',sans-serif", lineHeight: 1,
          }}>{speaker.country}</span>
        </div>
      </div>

      {/* Text */}
      <div style={{ padding: "14px 16px 18px", display: "flex", flexDirection: "column", gap: "4px" }}>
        <p style={{
          fontSize: "13px", fontWeight: 700, color: "#fff", margin: 0,
          letterSpacing: "-0.01em", lineHeight: 1.3,
          fontFamily: "var(--font-jakarta),'Plus Jakarta Sans',sans-serif",
        }}>{speaker.name}</p>
        <p style={{
          fontSize: "10px", fontWeight: 500, color: "rgba(155,48,255,0.75)",
          margin: 0, letterSpacing: "0.03em", lineHeight: 1.4,
          fontFamily: "var(--font-inter),'Inter',sans-serif",
        }}>{speaker.position}</p>
      </div>
    </div>
  );
}

export default function SpeakersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  const x = useMotionValue(0);
  const controls = useAnimation();
  const [isDragging, setIsDragging] = useState(false);
  const [maxDrag, setMaxDrag] = useState(0);

  useEffect(() => {
    const measure = () => {
      const el = containerRef.current;
      if (!el) return;
      const totalCards = SPEAKERS.length * (CARD_W + CARD_GAP) - CARD_GAP;
      const visible = el.clientWidth;
      const padding = Math.min(Math.max(el.clientWidth * 0.04, 24), 64) * 2;
      setMaxDrag(Math.max(0, totalCards - visible + padding));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const slide = (dir: "left" | "right") => {
    const cur = x.get();
    const next = dir === "left"
      ? Math.min(cur + STEP * 3, 0)
      : Math.max(cur - STEP * 3, -maxDrag);
    controls.start({ x: next, transition: { duration: 0.55, ease: EASE } });
  };

  return (
    <section
      ref={sectionRef}
      style={{ position: "relative", width: "100%", padding: "100px 0 110px", background: "#000", overflow: "hidden" }}
    >
      {/* Ambient */}
      <div aria-hidden style={{
        position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)",
        width: "900px", height: "500px",
        background: "radial-gradient(ellipse, rgba(124,58,237,0.08) 0%, transparent 65%)",
        pointerEvents: "none", filter: "blur(40px)",
      }} />

      {/* Header */}
      <div style={{ padding: "0 clamp(24px,4vw,64px)", marginBottom: "48px", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "20px", flexWrap: "wrap" }}>
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
              <div style={{ width: "28px", height: "1px", background: "linear-gradient(90deg, transparent, rgba(155,48,255,0.5))" }} />
              <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.38em", textTransform: "uppercase", color: "rgba(155,48,255,0.6)", fontFamily: "var(--font-inter),'Inter',sans-serif" }}>
                Featured Speakers
              </span>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.08 }}
            style={{ fontSize: "clamp(30px,4.5vw,58px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05, margin: 0, fontFamily: "var(--font-jakarta),'Plus Jakarta Sans',sans-serif" }}
          >
            <span style={{ color: "#fff" }}>Talks &amp; </span>
            <span style={{ color: "transparent", WebkitTextStroke: "1px rgba(155,48,255,0.7)" }}>Discussion</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.16 }}
            style={{ marginTop: "10px", fontSize: "12px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", fontFamily: "var(--font-inter),'Inter',sans-serif", textTransform: "uppercase" }}
          >
            20 world-class speakers · drag to explore
          </motion.p>
        </div>

        {/* Arrow buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
          style={{ display: "flex", gap: "10px", flexShrink: 0 }}
        >
          <ArrowBtn dir="left"  onClick={() => slide("left")} />
          <ArrowBtn dir="right" onClick={() => slide("right")} />
        </motion.div>
      </div>

      {/* Draggable track */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
      >
        <div
          ref={containerRef}
          style={{
            overflow: "hidden",
            cursor: isDragging ? "grabbing" : "grab",
            userSelect: "none",
            WebkitUserSelect: "none",
            maskImage: "linear-gradient(90deg, transparent, black 4%, black 96%, transparent)",
            WebkitMaskImage: "linear-gradient(90deg, transparent, black 4%, black 96%, transparent)",
          }}
        >
          <motion.div
            drag="x"
            dragConstraints={{ left: -maxDrag, right: 0 }}
            dragElastic={0.06}
            dragTransition={{ bounceStiffness: 350, bounceDamping: 35 }}
            animate={controls}
            style={{ x, display: "flex", gap: `${CARD_GAP}px`, padding: "16px clamp(24px,4vw,64px) 28px", width: "max-content" }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
          >
            {SPEAKERS.map(s => (
              <SpeakerCard key={s.id} speaker={s} isDragging={isDragging} />
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Progress bar — tracks drag position */}
      <div style={{ padding: "0 clamp(24px,4vw,64px)", marginTop: "8px" }}>
        <div style={{ height: "2px", background: "rgba(155,48,255,0.1)", borderRadius: "2px", overflow: "hidden" }}>
          <motion.div
            style={{
              height: "100%", borderRadius: "2px",
              background: "linear-gradient(90deg, #9b30ff, #c026d3)",
              scaleX: maxDrag > 0
                ? (1 - (x.get() / -maxDrag)) * (5 / SPEAKERS.length) + (5 / SPEAKERS.length)
                : 5 / SPEAKERS.length,
              transformOrigin: "left",
              width: `${(5 / SPEAKERS.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </section>
  );
}
