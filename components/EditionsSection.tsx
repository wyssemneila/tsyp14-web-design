"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface Edition {
  num: number;
  roman: string;
  year: number;
  date: string;
  location: string;
  participants: string;
  logo: string;
}

// ── Update this data with real edition details ──
const EDITIONS: Edition[] = [
  { num: 1,  roman: "I",     year: 2012, date: "Dec 2012", location: "Tunis",     participants: "200+",  logo: "/lg.webp" },
  { num: 2,  roman: "II",    year: 2013, date: "Dec 2013", location: "Sfax",      participants: "280+",  logo: "/lg.webp" },
  { num: 3,  roman: "III",   year: 2014, date: "Dec 2014", location: "Sousse",    participants: "350+",  logo: "/lg.webp" },
  { num: 4,  roman: "IV",    year: 2015, date: "Dec 2015", location: "Tunis",     participants: "420+",  logo: "/lg.webp" },
  { num: 5,  roman: "V",     year: 2016, date: "Dec 2016", location: "Monastir",  participants: "500+",  logo: "/lg.webp" },
  { num: 6,  roman: "VI",    year: 2017, date: "Dec 2017", location: "Tunis",     participants: "580+",  logo: "/lg.webp" },
  { num: 7,  roman: "VII",   year: 2018, date: "Dec 2018", location: "Hammamet",  participants: "660+",  logo: "/lg.webp" },
  { num: 8,  roman: "VIII",  year: 2019, date: "Dec 2019", location: "Tunis",     participants: "740+",  logo: "/lg.webp" },
  { num: 9,  roman: "IX",    year: 2020, date: "Dec 2020", location: "Online",    participants: "820+",  logo: "/lg.webp" },
  { num: 10, roman: "X",     year: 2021, date: "Dec 2021", location: "Online",    participants: "880+",  logo: "/lg.webp" },
  { num: 11, roman: "XI",    year: 2022, date: "Dec 2022", location: "Tunis",     participants: "940+",  logo: "/lg.webp" },
  { num: 12, roman: "XII",   year: 2023, date: "Dec 2023", location: "Tunis",     participants: "1000+", logo: "/lg.webp" },
  { num: 13, roman: "XIII",  year: 2024, date: "Dec 2024", location: "Tunis",     participants: "1050+", logo: "/lg.webp" },
];

const ROW1 = EDITIONS.slice(0, 7);
const ROW2 = EDITIONS.slice(6);

/* ── SVG icons (no emojis) ── */
function IconPin() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  );
}
function IconCalendar() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  );
}
function IconPeople() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );
}

function EditionCard({ edition }: { edition: Edition }) {
  return (
    <div className="edition-card">
      {/* Animated scan line */}
      <div className="edition-scan-line" aria-hidden />

      {/* Dot grid background */}
      <div className="edition-dot-grid" aria-hidden />

      {/* Corner brackets */}
      <div className="ed-corner ed-corner-tl" aria-hidden />
      <div className="ed-corner ed-corner-tr" aria-hidden />
      <div className="ed-corner ed-corner-bl" aria-hidden />
      <div className="ed-corner ed-corner-br" aria-hidden />

      {/* Top glow accent */}
      <div className="edition-top-glow" aria-hidden />

      {/* Logo + edition badge row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 2 }}>
        <div style={{
          width: "56px", height: "28px", position: "relative",
          filter: "brightness(0) invert(1)", opacity: 0.7,
        }}>
          <Image src={edition.logo} alt={`TSYP ${edition.roman}`} fill style={{ objectFit: "contain" }} />
        </div>
        <div style={{
          fontSize: "9px", fontWeight: 700, letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(155,48,255,0.7)",
          background: "rgba(155,48,255,0.08)",
          border: "1px solid rgba(155,48,255,0.22)",
          borderRadius: "5px", padding: "3px 9px",
          fontFamily: "var(--font-inter), 'Inter', sans-serif",
        }}>
          {edition.year}
        </div>
      </div>

      {/* Roman numeral — the hero */}
      <div style={{
        flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", zIndex: 2,
      }}>
        <span className="edition-roman">
          {edition.roman}
        </span>
      </div>

      {/* Stats */}
      <div style={{
        position: "relative", zIndex: 2,
        borderTop: "1px solid rgba(155,48,255,0.12)",
        paddingTop: "14px",
        display: "flex", flexDirection: "column", gap: "7px",
      }}>
        {[
          { icon: <IconPin />,      text: edition.location },
          { icon: <IconCalendar />, text: edition.date },
          { icon: <IconPeople />,   text: `${edition.participants} Participants` },
        ].map(({ icon, text }) => (
          <div key={text} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ color: "rgba(155,48,255,0.65)", display: "flex", flexShrink: 0 }}>
              {icon}
            </span>
            <span style={{
              fontSize: "10px", fontWeight: 500, letterSpacing: "0.06em",
              color: "rgba(255,255,255,0.5)",
              textTransform: "uppercase",
              fontFamily: "var(--font-inter), 'Inter', sans-serif",
              whiteSpace: "nowrap",
            }}>
              {text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MarqueeRow({ editions, direction }: { editions: Edition[]; direction: "left" | "right" }) {
  const doubled = [...editions, ...editions];
  return (
    <div style={{ overflow: "hidden", width: "100%", maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)" }}>
      <div className={direction === "left" ? "editions-track-left" : "editions-track-right"}>
        {doubled.map((ed, i) => (
          <EditionCard key={`${ed.num}-${i}`} edition={ed} />
        ))}
      </div>
    </div>
  );
}

export default function EditionsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        width: "100%",
        padding: "100px 0 120px",
        background: "#000000",
        overflow: "hidden",
      }}
    >
      {/* Ambient blobs */}
      <div aria-hidden style={{
        position: "absolute", top: "30%", left: "15%",
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)",
        pointerEvents: "none", filter: "blur(40px)",
      }} />
      <div aria-hidden style={{
        position: "absolute", bottom: "20%", right: "10%",
        width: "400px", height: "400px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(192,38,211,0.06) 0%, transparent 70%)",
        pointerEvents: "none", filter: "blur(40px)",
      }} />

      {/* Watermark */}
      <div aria-hidden style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: "clamp(120px, 18vw, 240px)",
        fontWeight: 800,
        color: "transparent",
        WebkitTextStroke: "1px rgba(155,48,255,0.04)",
        fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
        letterSpacing: "-0.04em",
        pointerEvents: "none",
        userSelect: "none",
        whiteSpace: "nowrap",
      }}>
        TSYP
      </div>

      {/* Header */}
      <div style={{ textAlign: "center", padding: "0 24px", marginBottom: "64px", position: "relative", zIndex: 2 }}>
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
            }}>
              Previous Editions
            </span>
            <div style={{ width: "32px", height: "1px", background: "linear-gradient(90deg, rgba(155,48,255,0.5), transparent)" }} />
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE, delay: 0.08 }}
          style={{
            fontSize: "clamp(32px, 5vw, 64px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            margin: 0,
            fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
          }}
        >
          <span style={{ color: "#ffffff" }}>The </span>
          <span style={{
            color: "transparent",
            WebkitTextStroke: "1px rgba(155,48,255,0.7)",
          }}>Chronology</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 0.16 }}
          style={{
            marginTop: "14px",
            fontSize: "13px",
            color: "rgba(255,255,255,0.28)",
            letterSpacing: "0.08em",
            fontFamily: "var(--font-inter), 'Inter', sans-serif",
            textTransform: "uppercase",
          }}
        >
          13 editions · a decade of excellence
        </motion.p>
      </div>

      {/* Marquee rows */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, ease: EASE, delay: 0.3 }}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <MarqueeRow editions={ROW1} direction="left" />
        <MarqueeRow editions={ROW2} direction="right" />
      </motion.div>

      {/* Bottom count bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
        style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: "clamp(24px, 4vw, 56px)", marginTop: "60px",
          padding: "0 24px",
        }}
      >
        {[
          { value: "13",    label: "Editions" },
          { value: "10K+",  label: "Alumni" },
          { value: "100+",  label: "Cities Represented" },
        ].map(({ value, label }, i) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: i < 2 ? "clamp(24px,4vw,56px)" : 0 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{
                fontSize: "clamp(22px, 3vw, 34px)", fontWeight: 800,
                letterSpacing: "-0.03em", color: "#ffffff",
                fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
              }}>{value}</div>
              <div style={{
                fontSize: "10px", fontWeight: 600, letterSpacing: "0.22em",
                textTransform: "uppercase", color: "rgba(155,48,255,0.55)",
                fontFamily: "var(--font-inter), 'Inter', sans-serif",
                marginTop: "4px",
              }}>{label}</div>
            </div>
            {i < 2 && (
              <div style={{ width: "1px", height: "36px", background: "rgba(155,48,255,0.15)", flexShrink: 0 }} />
            )}
          </div>
        ))}
      </motion.div>
    </section>
  );
}
