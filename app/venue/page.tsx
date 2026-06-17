"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ─────────────────────────────────────
   DATA
───────────────────────────────────── */

const VENUE_FEATURES = [
  { icon: "capacity", label: "Capacity", value: "1 200+", desc: "Seats across multiple halls" },
  { icon: "halls", label: "Conference Halls", value: "8", desc: "Equipped with AV systems" },
  { icon: "workshops", label: "Workshop Rooms", value: "12", desc: "Hands-on session spaces" },
  { icon: "wifi", label: "High-Speed WiFi", value: "1 Gbps", desc: "Full venue coverage" },
  { icon: "parking", label: "Parking", value: "500+", desc: "Free secured spots" },
  { icon: "catering", label: "Catering", value: "3", desc: "On-site restaurants" },
];

const VENUE_MAPS = [
  { src: "/venue/map-floor-0.png", label: "Ground Floor" },
  { src: "/venue/map-floor-1.png", label: "First Floor" },
];

const TUNISIA_GALLERY = [
  "/venue/tunisia-1.jpg",
  "/venue/tunisia-2.jpg",
  "/venue/tunisia-3.jpg",
  "/venue/tunisia-4.jpg",
  "/venue/tunisia-5.jpg",
  "/venue/tunisia-6.jpg",
];

const VISA_FREE = [
  "Algeria", "Angola", "Antigua and Barbuda", "Argentina", "Austria", "Bahrain",
  "Bangladesh", "Barbados", "Belgium", "Belize", "Benin", "Bosnia and Herzegovina",
  "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Cameroon", "Canada", "Cape Verde",
  "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros",
  "Congo", "Costa Rica", "Croatia", "Cyprus", "Czech Republic", "Denmark",
  "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador",
  "Estonia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Germany", "Greece",
  "Guatemala", "Guinea", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland",
  "India", "Indonesia", "Iran", "Iraq", "Ireland", "Italy", "Ivory Coast",
  "Jamaica", "Japan", "Jordan", "Kenya", "Kuwait", "Latvia", "Lebanon", "Libya",
  "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Madagascar", "Malawi",
  "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico",
  "Monaco", "Montenegro", "Morocco", "Mozambique", "Namibia", "Netherlands",
  "New Zealand", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman",
  "Pakistan", "Panama", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia",
  "San Marino", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone",
  "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain",
  "Suriname", "Sweden", "Switzerland", "Syria", "Tanzania", "Thailand", "Togo",
  "Trinidad and Tobago", "Turkey", "Uganda", "Ukraine", "United Arab Emirates",
  "United Kingdom", "United States", "Uruguay", "Vatican City", "Venezuela",
  "Vietnam", "Yemen", "Zambia", "Zimbabwe",
];

const CURRENCIES: Record<string, { name: string; rate: number }> = {
  USD: { name: "US Dollar", rate: 3.12 },
  EUR: { name: "Euro", rate: 3.42 },
  GBP: { name: "British Pound", rate: 3.95 },
  CAD: { name: "Canadian Dollar", rate: 2.28 },
  AED: { name: "UAE Dirham", rate: 0.85 },
  SAR: { name: "Saudi Riyal", rate: 0.83 },
  JPY: { name: "Japanese Yen", rate: 0.021 },
  INR: { name: "Indian Rupee", rate: 0.037 },
  CNY: { name: "Chinese Yuan", rate: 0.43 },
  MAD: { name: "Moroccan Dirham", rate: 0.31 },
  EGP: { name: "Egyptian Pound", rate: 0.064 },
  DZD: { name: "Algerian Dinar", rate: 0.023 },
  LYD: { name: "Libyan Dinar", rate: 0.65 },
};

/* ─────────────────────────────────────
   ICONS (inline SVGs)
───────────────────────────────────── */

function FeatureIcon({ type }: { type: string }) {
  const s = { width: 28, height: 28, viewBox: "0 0 24 24", fill: "none", stroke: "rgba(155,48,255,0.85)", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (type) {
    case "capacity":
      return <svg {...s}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>;
    case "halls":
      return <svg {...s}><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>;
    case "workshops":
      return <svg {...s}><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>;
    case "wifi":
      return <svg {...s}><path d="M5 12.55a11 11 0 0114.08 0"/><path d="M1.42 9a16 16 0 0121.16 0"/><path d="M8.53 16.11a6 6 0 016.95 0"/><circle cx="12" cy="20" r="1"/></svg>;
    case "parking":
      return <svg {...s}><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 17V7h4a3 3 0 010 6H9"/></svg>;
    case "catering":
      return <svg {...s}><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>;
    default:
      return null;
  }
}

function LocationIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>;
}
function CalendarIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
}
function ExternalIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>;
}
function ChevronLeft() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(155,48,255,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>;
}
function ChevronRight() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(155,48,255,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>;
}
function CheckCircle() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;
}
function XCircle() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>;
}
function AlertIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(155,48,255,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
}

/* ─────────────────────────────────────
   REUSABLE PATTERNS
───────────────────────────────────── */

function SectionEyebrow({ label }: { label: string }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
      <span style={{ width: "32px", height: "1px", background: "linear-gradient(90deg, transparent, rgba(155,48,255,0.5))", display: "block" }} />
      <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.38em", textTransform: "uppercase", color: "rgba(155,48,255,0.6)", fontFamily: "var(--font-inter), 'Inter', sans-serif" }}>
        {label}
      </span>
      <span style={{ width: "32px", height: "1px", background: "linear-gradient(90deg, rgba(155,48,255,0.5), transparent)", display: "block" }} />
    </div>
  );
}

function SectionTitle({ solid, outlined }: { solid: string; outlined: string }) {
  return (
    <h2 style={{
      fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05, margin: 0,
      fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
    }}>
      <span style={{ color: "#ffffff" }}>{solid} </span>
      <span style={{ color: "transparent", WebkitTextStroke: "1px rgba(155,48,255,0.75)" }}>{outlined}</span>
    </h2>
  );
}

function GradientDivider() {
  return (
    <div style={{
      height: "1px",
      background: "linear-gradient(90deg, transparent 0%, rgba(155,48,255,0.4) 30%, rgba(200,80,180,0.3) 60%, transparent 100%)",
    }} />
  );
}

/* ─────────────────────────────────────
   SECTION 1 — VENUE HERO
───────────────────────────────────── */

function VenueHero() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} style={{
      position: "relative", width: "100%", minHeight: "100dvh",
      display: "flex", flexDirection: "column", overflow: "hidden",
      fontFamily: "var(--font-inter), 'Inter', sans-serif",
    }}>
      <div style={{ position: "absolute", inset: 0, background: "#000000", zIndex: 0 }} />
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: "radial-gradient(ellipse 60% 50% at 70% 40%, rgba(100,60,200,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <Navbar />

      <div style={{
        flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", zIndex: 10,
        padding: "120px clamp(20px, 5vw, 64px) 80px",
        maxWidth: "1200px", margin: "0 auto", width: "100%",
      }}>
        <div className="venue-hero-grid" style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "clamp(32px, 5vw, 80px)", alignItems: "center", width: "100%",
        }}>
          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <SectionEyebrow label="TSYP 14 · Venue" />

            <h1 style={{
              fontSize: "clamp(36px, 6vw, 80px)", fontWeight: 800,
              lineHeight: 1.05, letterSpacing: "-0.035em",
              fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
              margin: "0 0 8px",
            }}>
              <span style={{ color: "#ffffff", display: "block" }}>Medina</span>
              <span style={{ color: "#ffffff", display: "block" }}>Congress</span>
              <span className="gradient-flow" style={{
                display: "block",
                fontSize: "clamp(36px, 6vw, 80px)", fontWeight: 800,
                lineHeight: 1.05, letterSpacing: "-0.035em",
                fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
              }}>Center</span>
            </h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
              style={{ height: "1px", background: "rgba(155,48,255,0.25)", transformOrigin: "left center", margin: "28px 0" }}
            />

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "rgba(180,150,255,0.7)", fontSize: "14px", fontWeight: 500 }}>
                <LocationIcon /> Yasmine Hammamet, Tunisia
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "rgba(180,150,255,0.7)", fontSize: "14px", fontWeight: 500 }}>
                <CalendarIcon /> 21 December 2026
              </div>
            </div>

            <motion.a
              href="https://maps.google.com/?q=Medina+Congress+Center+Yasmine+Hammamet"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, boxShadow: "0 0 28px rgba(155,48,255,0.4)" }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                marginTop: "32px", padding: "12px 28px",
                background: "linear-gradient(135deg, #9b30ff 0%, #7c3aed 100%)",
                color: "#fff", fontSize: "11px", fontWeight: 600,
                letterSpacing: "0.12em", textTransform: "uppercase",
                borderRadius: "10px", border: "1px solid rgba(155,48,255,0.4)",
                cursor: "pointer", textDecoration: "none",
                boxShadow: "0 0 20px rgba(155,48,255,0.25)",
              }}
            >
              Open in Maps <ExternalIcon />
            </motion.a>
          </motion.div>

          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 1.0, ease: EASE, delay: 0.2 }}
            style={{ position: "relative" }}
          >
            <div style={{
              position: "absolute", inset: "-20px", borderRadius: "32px",
              background: "radial-gradient(ellipse 80% 80% at 50% 60%, rgba(155,48,255,0.15) 0%, transparent 70%)",
              filter: "blur(30px)", pointerEvents: "none",
            }} />
            <div style={{
              position: "relative", borderRadius: "20px", overflow: "hidden",
              border: "1px solid rgba(155,48,255,0.2)",
              boxShadow: "0 0 40px rgba(155,48,255,0.1), 0 24px 64px rgba(0,0,0,0.5)",
              aspectRatio: "4/3",
            }}>
              <img
                src="/venue/venue-hero.jpg"
                alt="Medina Congress Center"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 40%)",
                pointerEvents: "none",
              }} />
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: "2px",
                background: "linear-gradient(90deg, transparent, rgba(155,48,255,0.7), transparent)",
                boxShadow: "0 0 20px rgba(155,48,255,0.4)",
              }} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────
   SECTION 2 — VENUE FEATURES
───────────────────────────────────── */

function VenueFeatures() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} style={{
      position: "relative", width: "100%", padding: "100px 0",
      background: "#000", overflow: "hidden",
    }}>
      <div aria-hidden style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        width: "800px", height: "500px",
        background: "radial-gradient(ellipse, rgba(100,20,200,0.07) 0%, transparent 70%)",
        pointerEvents: "none", filter: "blur(40px)",
      }} />

      <GradientDivider />

      <div style={{ textAlign: "center", padding: "80px 24px 64px", position: "relative", zIndex: 2 }}>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease: EASE }}>
          <SectionEyebrow label="Facilities" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: EASE, delay: 0.08 }}>
          <SectionTitle solid="World-Class" outlined="Infrastructure" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 0.16 }}
          style={{ marginTop: "14px", fontSize: "13px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", textTransform: "uppercase" }}
        >
          Everything you need in one place
        </motion.p>
      </div>

      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "20px", maxWidth: "1100px", margin: "0 auto",
        padding: "0 clamp(20px, 5vw, 56px)", position: "relative", zIndex: 2,
      }}>
        {VENUE_FEATURES.map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 + i * 0.08 }}
            className="venue-feature-card"
            style={{
              background: "rgba(6, 2, 22, 0.82)",
              border: "1px solid rgba(155,48,255,0.14)",
              borderRadius: "16px",
              padding: "28px 24px",
              display: "flex", alignItems: "flex-start", gap: "18px",
              position: "relative", overflow: "hidden",
              transition: "border-color 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.4s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: "radial-gradient(circle, rgba(155,48,255,0.06) 1px, transparent 1px)",
              backgroundSize: "28px 28px", pointerEvents: "none", opacity: 0.4,
            }} />

            <div style={{
              width: "52px", height: "52px", borderRadius: "14px",
              background: "rgba(155,48,255,0.08)", border: "1px solid rgba(155,48,255,0.18)",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              position: "relative", zIndex: 1,
            }}>
              <FeatureIcon type={f.icon} />
            </div>

            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{
                fontSize: "9px", fontWeight: 600, letterSpacing: "0.3em",
                textTransform: "uppercase", color: "rgba(155,48,255,0.55)", marginBottom: "6px",
              }}>{f.label}</div>
              <div style={{
                fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 800,
                color: "#fff", lineHeight: 1, letterSpacing: "-0.02em",
                fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
              }}>{f.value}</div>
              <div style={{
                fontSize: "12px", color: "rgba(200,195,220,0.5)", marginTop: "6px",
              }}>{f.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ marginTop: "80px" }}><GradientDivider /></div>
    </section>
  );
}

/* ─────────────────────────────────────
   SECTION 3 — VENUE MAP
───────────────────────────────────── */

function VenueMap() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [activeMap, setActiveMap] = useState(0);

  return (
    <section ref={ref} style={{
      position: "relative", width: "100%", padding: "100px 0 120px",
      background: "#000", overflow: "hidden",
    }}>
      <div aria-hidden style={{
        position: "absolute", top: "40%", right: "10%",
        width: "600px", height: "400px",
        background: "radial-gradient(ellipse, rgba(155,48,255,0.06) 0%, transparent 70%)",
        pointerEvents: "none", filter: "blur(50px)",
      }} />

      <div style={{ textAlign: "center", padding: "0 24px", marginBottom: "48px", position: "relative", zIndex: 2 }}>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease: EASE }}>
          <SectionEyebrow label="Floor Plans" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: EASE, delay: 0.08 }}>
          <SectionTitle solid="Venue" outlined="Map" />
        </motion.div>
      </div>

      {/* Floor tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
        style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "36px", position: "relative", zIndex: 2 }}
      >
        {VENUE_MAPS.map((m, i) => (
          <button
            key={m.label}
            onClick={() => setActiveMap(i)}
            style={{
              padding: "10px 24px", borderRadius: "10px",
              fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
              cursor: "pointer",
              border: `1px solid ${activeMap === i ? "rgba(155,48,255,0.5)" : "rgba(155,48,255,0.15)"}`,
              background: activeMap === i
                ? "linear-gradient(135deg, rgba(155,48,255,0.2) 0%, rgba(124,58,237,0.1) 100%)"
                : "rgba(255,255,255,0.02)",
              color: activeMap === i ? "#fff" : "rgba(255,255,255,0.4)",
              transition: "all 0.3s ease",
              boxShadow: activeMap === i ? "0 0 20px rgba(155,48,255,0.15)" : "none",
            }}
          >
            {m.label}
          </button>
        ))}
      </motion.div>

      {/* Map display */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
        style={{
          maxWidth: "1000px", margin: "0 auto",
          padding: "0 clamp(20px, 5vw, 56px)", position: "relative", zIndex: 2,
        }}
      >
        <div style={{
          borderRadius: "20px", overflow: "hidden",
          border: "1px solid rgba(155,48,255,0.18)",
          background: "rgba(6, 2, 22, 0.6)",
          boxShadow: "0 0 40px rgba(155,48,255,0.08), 0 24px 64px rgba(0,0,0,0.4)",
          position: "relative",
        }}>
          <AnimatePresence mode="wait">
            <motion.img
              key={activeMap}
              src={VENUE_MAPS[activeMap].src}
              alt={VENUE_MAPS[activeMap].label}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: EASE }}
              style={{ width: "100%", display: "block" }}
            />
          </AnimatePresence>

          <div style={{
            position: "absolute", top: 0, left: "15%", right: "15%", height: "2px",
            background: "linear-gradient(90deg, transparent, rgba(155,48,255,0.5), transparent)",
          }} />
        </div>

        {/* Navigation arrows */}
        <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "20px" }}>
          <button
            onClick={() => setActiveMap(p => (p - 1 + VENUE_MAPS.length) % VENUE_MAPS.length)}
            style={{
              width: "44px", height: "44px", borderRadius: "50%",
              background: "rgba(155,48,255,0.1)", border: "1px solid rgba(155,48,255,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
              transition: "all 0.25s",
            }}
          ><ChevronLeft /></button>
          <button
            onClick={() => setActiveMap(p => (p + 1) % VENUE_MAPS.length)}
            style={{
              width: "44px", height: "44px", borderRadius: "50%",
              background: "rgba(155,48,255,0.1)", border: "1px solid rgba(155,48,255,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
              transition: "all 0.25s",
            }}
          ><ChevronRight /></button>
        </div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────
   SECTION 4 — DISCOVER TUNISIA
───────────────────────────────────── */

function DiscoverTunisia() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} style={{
      position: "relative", width: "100%", padding: "100px 0 60px",
      background: "#000", overflow: "hidden",
    }}>
      <GradientDivider />

      <div aria-hidden style={{
        position: "absolute", bottom: "20%", left: "10%",
        width: "600px", height: "400px",
        background: "radial-gradient(ellipse, rgba(124,58,237,0.06) 0%, transparent 70%)",
        pointerEvents: "none", filter: "blur(50px)",
      }} />

      <div style={{
        maxWidth: "1200px", margin: "0 auto",
        padding: "80px clamp(20px, 5vw, 56px) 0",
        position: "relative", zIndex: 2,
      }}>
        <div className="venue-discover-grid" style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "clamp(32px, 5vw, 80px)", alignItems: "start",
        }}>
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <SectionEyebrow label="Discover" />
            <h2 style={{
              fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 800,
              lineHeight: 1.05, letterSpacing: "-0.035em",
              fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
              margin: 0,
            }}>
              <span style={{ color: "#ffffff" }}>Tunisia </span>
              <span className="gradient-flow" style={{
                fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
                fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 800,
                lineHeight: 1.05, letterSpacing: "-0.035em",
              }}>تونس</span>
            </h2>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
              style={{ height: "1px", background: "rgba(155,48,255,0.2)", transformOrigin: "left center", margin: "28px 0 24px" }}
            />

            <p style={{
              fontSize: "clamp(14px, 1.4vw, 16px)", lineHeight: 1.8,
              color: "rgba(200,195,220,0.65)", fontWeight: 400, margin: 0, maxWidth: "500px",
            }}>
              Tunisia offers stunning beaches and vast deserts. Explore ancient sites
              like <strong style={{ color: "rgba(220,210,255,0.9)", fontWeight: 600 }}>Carthage</strong>,
              stroll through vibrant Medinas, or unwind by the sea.
              The culture blends <strong style={{ color: "rgba(220,210,255,0.9)", fontWeight: 600 }}>Arab, Berber, and French</strong> influences.
              Enjoy delicious food, unique architecture, and lively festivals.
              Ride camels or visit charming villages — there&apos;s something for everyone!
            </p>

            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "28px" }}>
              {["Beaches", "Desert", "History", "Culture", "Cuisine", "Architecture"].map((tag, i) => (
                <span key={tag} style={{
                  fontSize: i < 3 ? "9px" : "8px",
                  fontWeight: i < 3 ? 600 : 500,
                  letterSpacing: i < 3 ? "0.28em" : "0.15em",
                  textTransform: "uppercase",
                  color: i < 3 ? "rgba(155,48,255,0.75)" : "rgba(155,48,255,0.42)",
                  padding: i < 3 ? "5px 13px" : "4px 11px",
                  border: `1px solid ${i < 3 ? "rgba(155,48,255,0.22)" : "rgba(155,48,255,0.1)"}`,
                  borderRadius: "100px",
                  background: i < 3 ? "rgba(155,48,255,0.07)" : "rgba(155,48,255,0.03)",
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <span style={{ width: "32px", height: "1px", background: "linear-gradient(90deg, transparent, rgba(155,48,255,0.5))", display: "block" }} />
              <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.38em", textTransform: "uppercase", color: "rgba(155,48,255,0.6)" }}>
                Find Us Here
              </span>
            </div>

            <div style={{
              borderRadius: "16px", overflow: "hidden",
              border: "1px solid rgba(155,48,255,0.18)",
              boxShadow: "0 0 30px rgba(155,48,255,0.08), 0 16px 48px rgba(0,0,0,0.4)",
              position: "relative",
            }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3234.5!2d10.56!3d36.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDI0JzAwLjAiTiAxMMKwMzMnMzYuMCJF!5e0!3m2!1sen!2stn!4v1"
                width="100%" height="380"
                style={{ border: 0, display: "block", filter: "invert(0.9) hue-rotate(180deg) saturate(0.3) brightness(0.8)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Venue location"
              />
              <div style={{
                position: "absolute", top: 0, left: "15%", right: "15%", height: "2px",
                background: "linear-gradient(90deg, transparent, rgba(155,48,255,0.5), transparent)",
              }} />
            </div>

            <a
              href="https://maps.google.com/?q=Medina+Congress+Center+Yasmine+Hammamet+Tunisia"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                marginTop: "16px", fontSize: "11px", fontWeight: 600,
                letterSpacing: "0.08em", color: "rgba(155,48,255,0.75)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
            >
              Open in Google Maps <ExternalIcon />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Tunisia gallery marquee */}
      <div style={{ marginTop: "80px" }}>
        <div style={{
          overflow: "hidden", width: "100%",
          maskImage: "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
        }}>
          <div className="venue-gallery-track" style={{
            display: "flex", gap: "16px", width: "max-content",
            padding: "6px 0",
          }}>
            {[...TUNISIA_GALLERY, ...TUNISIA_GALLERY].map((src, i) => (
              <div key={i} className="memory-card" style={{
                width: "clamp(280px, 25vw, 380px)", aspectRatio: "16/10",
                borderRadius: "16px", overflow: "hidden", flexShrink: 0,
                border: "1px solid rgba(155,48,255,0.1)",
              }}>
                <img src={src} alt="Tunisia" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" />
                <div className="memory-top-glow" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────
   SECTION 5 — VISA CHECKER
───────────────────────────────────── */

function VisaChecker() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<null | boolean>(null);
  const [checkedCountry, setCheckedCountry] = useState("");

  const handleCheck = () => {
    if (!query.trim()) return;
    const match = VISA_FREE.find(c => c.toLowerCase() === query.trim().toLowerCase());
    setCheckedCountry(query.trim());
    setResult(!!match);
  };

  const suggestions = query.length >= 2
    ? VISA_FREE.filter(c => c.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
    : [];

  return (
    <section ref={ref} style={{
      position: "relative", width: "100%", padding: "100px 0 120px",
      background: "#000", overflow: "hidden",
    }}>
      <GradientDivider />

      <div aria-hidden style={{
        position: "absolute", top: "30%", right: "15%",
        width: "500px", height: "400px",
        background: "radial-gradient(ellipse, rgba(155,48,255,0.06) 0%, transparent 70%)",
        pointerEvents: "none", filter: "blur(50px)",
      }} />

      <div style={{
        maxWidth: "1100px", margin: "0 auto",
        padding: "80px clamp(20px, 5vw, 56px) 0",
        position: "relative", zIndex: 2,
      }}>
        <div className="venue-visa-grid" style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "clamp(32px, 5vw, 80px)", alignItems: "start",
        }}>
          {/* Text + form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <SectionEyebrow label="Guidelines" />
            <h2 style={{
              fontSize: "clamp(28px, 4.5vw, 56px)", fontWeight: 800,
              lineHeight: 1.1, letterSpacing: "-0.03em",
              fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
              margin: "0 0 8px",
            }}>
              <span style={{ color: "#ffffff" }}>Visa Requirements for</span><br />
              <span className="gradient-flow" style={{
                fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
                fontSize: "clamp(28px, 4.5vw, 56px)", fontWeight: 800,
                lineHeight: 1.1, letterSpacing: "-0.03em",
              }}>Visiting Tunisia</span>
            </h2>

            <p style={{
              fontSize: "14px", lineHeight: 1.7, color: "rgba(200,195,220,0.6)",
              margin: "20px 0 28px", maxWidth: "480px",
            }}>
              Find out if you need a visa to travel to Tunisia or qualify for visa-free entry.
            </p>

            {/* Search input */}
            <div style={{ position: "relative", maxWidth: "420px" }}>
              <div style={{
                display: "flex", alignItems: "center",
                background: "rgba(6, 2, 22, 0.82)",
                border: "1px solid rgba(155,48,255,0.2)",
                borderRadius: "12px", overflow: "hidden",
                transition: "border-color 0.3s",
              }}>
                <input
                  type="text"
                  value={query}
                  onChange={e => { setQuery(e.target.value); setResult(null); }}
                  onKeyDown={e => e.key === "Enter" && handleCheck()}
                  placeholder="Start typing your country..."
                  style={{
                    flex: 1, padding: "14px 18px",
                    background: "transparent", border: "none", outline: "none",
                    color: "#fff", fontSize: "14px",
                    fontFamily: "var(--font-inter), 'Inter', sans-serif",
                  }}
                />
                <button
                  onClick={handleCheck}
                  style={{
                    padding: "14px 24px",
                    background: "linear-gradient(135deg, #9b30ff 0%, #7c3aed 100%)",
                    border: "none", color: "#fff",
                    fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em",
                    textTransform: "uppercase", cursor: "pointer",
                    transition: "opacity 0.2s",
                  }}
                >
                  Check
                </button>
              </div>

              {/* Autocomplete */}
              {suggestions.length > 0 && result === null && (
                <div style={{
                  position: "absolute", top: "100%", left: 0, right: 0, marginTop: "4px",
                  background: "rgba(12, 6, 30, 0.95)", border: "1px solid rgba(155,48,255,0.2)",
                  borderRadius: "10px", overflow: "hidden", zIndex: 20,
                  backdropFilter: "blur(16px)",
                }}>
                  {suggestions.map(c => (
                    <button
                      key={c}
                      onClick={() => { setQuery(c); setResult(null); }}
                      style={{
                        width: "100%", padding: "10px 18px",
                        background: "transparent", border: "none",
                        color: "rgba(220,215,240,0.8)", fontSize: "13px",
                        textAlign: "left", cursor: "pointer",
                        transition: "background 0.15s",
                        fontFamily: "var(--font-inter), 'Inter', sans-serif",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = "rgba(155,48,255,0.1)")}
                      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Result */}
            <AnimatePresence mode="wait">
              {result !== null && (
                <motion.div
                  key={String(result)}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    marginTop: "20px", padding: "14px 18px",
                    borderRadius: "12px",
                    background: result ? "rgba(34,197,94,0.08)" : "rgba(239,68,68,0.08)",
                    border: `1px solid ${result ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)"}`,
                  }}
                >
                  {result ? <CheckCircle /> : <XCircle />}
                  <span style={{ fontSize: "13px", color: result ? "rgba(34,197,94,0.9)" : "rgba(239,68,68,0.9)", fontWeight: 500 }}>
                    {result
                      ? `${checkedCountry} citizens enjoy visa-free entry to Tunisia.`
                      : `${checkedCountry} citizens may need a visa. Check with the Tunisian embassy.`
                    }
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Disclaimers */}
            <div style={{ marginTop: "28px", display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                <div style={{ flexShrink: 0, marginTop: "2px" }}><AlertIcon /></div>
                <p style={{ fontSize: "11px", lineHeight: 1.6, color: "rgba(200,195,220,0.45)", margin: 0 }}>
                  Always check with the Tunisian embassy or consulate in your country for the most up-to-date visa information before planning your trip.
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                <div style={{ flexShrink: 0, marginTop: "2px" }}><AlertIcon /></div>
                <p style={{ fontSize: "11px", lineHeight: 1.6, color: "rgba(200,195,220,0.45)", margin: 0 }}>
                  The TSYP 14 organizers cannot assist with individual visa applications. However, we can provide an invitation letter to support your visa application.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Decorative passport visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <div style={{
              position: "relative", width: "100%", maxWidth: "400px", aspectRatio: "1",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {/* Orbiting ring */}
              <div style={{
                position: "absolute", inset: "10%",
                border: "1px solid rgba(155,48,255,0.12)",
                borderRadius: "50%",
              }} />
              <div style={{
                position: "absolute", inset: "25%",
                border: "1px solid rgba(155,48,255,0.08)",
                borderRadius: "50%",
              }} />
              <div style={{
                position: "absolute", inset: "0",
                border: "1px dashed rgba(155,48,255,0.06)",
                borderRadius: "50%",
              }} />

              {/* Center globe */}
              <div style={{
                width: "120px", height: "120px", borderRadius: "50%",
                background: "linear-gradient(135deg, rgba(155,48,255,0.2), rgba(124,58,237,0.1))",
                border: "1px solid rgba(155,48,255,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 0 60px rgba(155,48,255,0.2), 0 0 120px rgba(155,48,255,0.08)",
              }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(155,48,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
                </svg>
              </div>

              {/* Floating country badges */}
              {[
                { label: "🇹🇳", x: "5%", y: "15%" },
                { label: "🇫🇷", x: "80%", y: "10%" },
                { label: "🇺🇸", x: "85%", y: "65%" },
                { label: "🇯🇵", x: "10%", y: "75%" },
                { label: "🇩🇪", x: "50%", y: "5%" },
                { label: "🇧🇷", x: "45%", y: "88%" },
              ].map((b, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
                  style={{
                    position: "absolute", left: b.x, top: b.y,
                    width: "40px", height: "40px", borderRadius: "12px",
                    background: "rgba(6, 2, 22, 0.9)",
                    border: "1px solid rgba(155,48,255,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "20px",
                    boxShadow: "0 0 20px rgba(155,48,255,0.1)",
                  }}
                >
                  {b.label}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────
   SECTION 6 — CURRENCY CONVERTER
───────────────────────────────────── */

function CurrencyConverter() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [from, setFrom] = useState("USD");
  const [amount, setAmount] = useState("");

  const converted = amount ? (parseFloat(amount) * (CURRENCIES[from]?.rate || 0)).toFixed(2) : "0.00";

  return (
    <section ref={ref} style={{
      position: "relative", width: "100%", padding: "0 0 120px",
      background: "#000", overflow: "hidden",
    }}>
      <GradientDivider />

      <div style={{
        maxWidth: "1100px", margin: "0 auto",
        padding: "80px clamp(20px, 5vw, 56px) 0",
        position: "relative", zIndex: 2,
      }}>
        <div className="venue-currency-grid" style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "clamp(32px, 5vw, 80px)", alignItems: "center",
        }}>
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <SectionEyebrow label="Currency" />
            <h2 style={{
              fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 800,
              lineHeight: 1.1, letterSpacing: "-0.03em",
              fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
              margin: "0 0 8px",
            }}>
              <span style={{ color: "#ffffff" }}>Dinar </span>
              <span className="gradient-flow" style={{
                fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
                fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 800,
                lineHeight: 1.1, letterSpacing: "-0.03em",
              }}>دينار</span>
            </h2>

            <p style={{
              fontSize: "14px", lineHeight: 1.7, color: "rgba(200,195,220,0.6)",
              margin: "20px 0 28px", maxWidth: "460px",
            }}>
              The national currency is the <strong style={{ color: "rgba(220,210,255,0.9)", fontWeight: 600 }}>Tunisian Dinar (TND)</strong>,
              which is very friendly to foreign currencies.
            </p>

            {/* Currency selectors */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap", marginBottom: "16px" }}>
              <span style={{ fontSize: "12px", color: "rgba(155,48,255,0.6)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>From</span>
              <select
                value={from}
                onChange={e => setFrom(e.target.value)}
                style={{
                  padding: "10px 16px", borderRadius: "10px",
                  background: "rgba(6, 2, 22, 0.82)",
                  border: "1px solid rgba(155,48,255,0.2)",
                  color: "#fff", fontSize: "13px",
                  fontFamily: "var(--font-inter), 'Inter', sans-serif",
                  outline: "none", cursor: "pointer",
                  appearance: "auto",
                }}
              >
                {Object.entries(CURRENCIES).map(([code, { name }]) => (
                  <option key={code} value={code}>{name} ({code})</option>
                ))}
              </select>

              <span style={{ fontSize: "12px", color: "rgba(155,48,255,0.6)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>To</span>
              <div style={{
                padding: "10px 16px", borderRadius: "10px",
                background: "rgba(155,48,255,0.08)",
                border: "1px solid rgba(155,48,255,0.25)",
                color: "rgba(155,48,255,0.85)", fontSize: "13px",
                fontWeight: 600,
              }}>
                Tunisian Dinar (TND)
              </div>
            </div>

            {/* Amount input */}
            <div style={{
              background: "rgba(6, 2, 22, 0.82)",
              border: "1px solid rgba(155,48,255,0.2)",
              borderRadius: "12px", overflow: "hidden",
              maxWidth: "420px",
            }}>
              <input
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="Enter amount"
                style={{
                  width: "100%", padding: "16px 18px",
                  background: "transparent", border: "none", outline: "none",
                  color: "#fff", fontSize: "16px",
                  fontFamily: "var(--font-inter), 'Inter', sans-serif",
                }}
              />
            </div>

            {/* Result */}
            <motion.div
              animate={{ opacity: 1 }}
              style={{
                marginTop: "20px", display: "flex", alignItems: "baseline", gap: "8px",
              }}
            >
              <span style={{
                fontSize: "11px", fontWeight: 600, letterSpacing: "0.2em",
                textTransform: "uppercase", color: "rgba(155,48,255,0.55)",
              }}>Converted amount:</span>
              <span style={{
                fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800,
                color: "#fff", letterSpacing: "-0.02em",
                fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
              }}>
                {converted}
              </span>
              <span style={{
                fontSize: "14px", fontWeight: 600, color: "rgba(155,48,255,0.7)",
              }}>TND</span>
            </motion.div>
          </motion.div>

          {/* Decorative bills visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}
          >
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr",
              gap: "12px", maxWidth: "360px",
            }}>
              {[5, 10, 20, 50].map((bill, i) => (
                <motion.div
                  key={bill}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
                  style={{
                    aspectRatio: "1.6",
                    borderRadius: "12px",
                    background: `linear-gradient(135deg, rgba(155,48,255,${0.08 + i * 0.04}), rgba(124,58,237,${0.04 + i * 0.03}))`,
                    border: "1px solid rgba(155,48,255,0.18)",
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center", gap: "4px",
                    boxShadow: "0 0 20px rgba(155,48,255,0.06)",
                  }}
                >
                  <span style={{
                    fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800,
                    color: "rgba(155,48,255,0.7)", fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
                  }}>{bill}</span>
                  <span style={{
                    fontSize: "8px", fontWeight: 600, letterSpacing: "0.2em",
                    textTransform: "uppercase", color: "rgba(155,48,255,0.4)",
                  }}>TND</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────
   PAGE
───────────────────────────────────── */

export default function VenuePage() {
  return (
    <>
      <main>
        <VenueHero />
        <VenueFeatures />
        <VenueMap />
        <DiscoverTunisia />
        <VisaChecker />
        <CurrencyConverter />
      </main>
      <Footer />
    </>
  );
}
