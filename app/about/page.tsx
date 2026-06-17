"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ─────────────────────────────────────
   DATA
───────────────────────────────────── */

interface Member {
  name: string;
  role: string;
  department: string;
  bio: string;
  color: string;
}

const TEAM_CATEGORIES = [
  { key: "executive", label: "Executive Board" },
  { key: "technical", label: "Technical Team" },
  { key: "logistics", label: "Logistics & Operations" },
  { key: "media", label: "Media & Communications" },
];

const TEAM: Record<string, Member[]> = {
  executive: [
    { name: "Ahmed Ben Salah", role: "General Chair", department: "IEEE TSYP 14", bio: "Leading the vision and strategy of TSYP 14, ensuring a world-class experience for all attendees.", color: "#9b30ff" },
    { name: "Fatma Khelifi", role: "Vice Chair", department: "IEEE TSYP 14", bio: "Coordinating cross-functional teams and managing partnerships with international IEEE sections.", color: "#7c3aed" },
    { name: "Youssef Dridi", role: "Secretary General", department: "IEEE TSYP 14", bio: "Overseeing documentation, governance, and internal communications across all committees.", color: "#6d28d9" },
    { name: "Mariem Bouaziz", role: "Treasurer", department: "IEEE TSYP 14", bio: "Managing budget allocation, sponsorship funds, and financial transparency for the congress.", color: "#8b5cf6" },
  ],
  technical: [
    { name: "Khalil Hammami", role: "Technical Program Chair", department: "Technical Committee", bio: "Curating the technical sessions, workshops, and keynote speaker lineup.", color: "#9b30ff" },
    { name: "Nour El Houda Saidi", role: "Workshop Coordinator", department: "Technical Committee", bio: "Designing hands-on workshop experiences in AI, IoT, and sustainable energy.", color: "#7c3aed" },
    { name: "Mohamed Amine Trabelsi", role: "Hackathon Lead", department: "Technical Committee", bio: "Organizing the 24-hour hackathon challenge with industry-relevant problem statements.", color: "#6d28d9" },
    { name: "Syrine Mansour", role: "Research Track Lead", department: "Technical Committee", bio: "Managing paper submissions, peer reviews, and research presentation sessions.", color: "#8b5cf6" },
  ],
  logistics: [
    { name: "Rami Gharbi", role: "Logistics Director", department: "Operations", bio: "Coordinating venue setup, transportation, accommodation, and on-site operations.", color: "#9b30ff" },
    { name: "Ines Chaabane", role: "Hospitality Manager", department: "Operations", bio: "Ensuring a seamless experience for international delegates from arrival to departure.", color: "#7c3aed" },
    { name: "Omar Bouzid", role: "Venue Coordinator", department: "Operations", bio: "Managing the Medina Congress Center spaces, AV equipment, and session scheduling.", color: "#6d28d9" },
    { name: "Amira Rezgui", role: "Catering & Events", department: "Operations", bio: "Planning networking dinners, cultural evenings, and the gala ceremony.", color: "#8b5cf6" },
  ],
  media: [
    { name: "Sami Jelassi", role: "Media Director", department: "Communications", bio: "Leading the media strategy across social platforms, press releases, and live coverage.", color: "#9b30ff" },
    { name: "Rim Aouini", role: "Creative Lead", department: "Communications", bio: "Designing the visual identity, promotional materials, and brand experience.", color: "#7c3aed" },
    { name: "Hedi Mbarek", role: "Content Strategist", department: "Communications", bio: "Creating compelling narratives and content for audience engagement.", color: "#6d28d9" },
    { name: "Yasmine Lahmar", role: "Photography & Video", department: "Communications", bio: "Capturing the congress moments through professional photography and videography.", color: "#8b5cf6" },
  ],
};

const STATS = [
  { value: "14th", label: "Edition" },
  { value: "500+", label: "Attendees" },
  { value: "20+", label: "Countries" },
  { value: "50+", label: "Speakers" },
];

const VALUES = [
  { icon: "innovation", title: "Innovation", desc: "Pushing boundaries in technology and engineering to shape the future." },
  { icon: "community", title: "Community", desc: "Building a network of young professionals united by shared passion." },
  { icon: "excellence", title: "Excellence", desc: "Delivering a world-class congress experience at every level." },
  { icon: "impact", title: "Impact", desc: "Creating lasting change through knowledge exchange and collaboration." },
];

/* ─────────────────────────────────────
   ICONS
───────────────────────────────────── */

function ValueIcon({ type }: { type: string }) {
  const s = { width: 32, height: 32, viewBox: "0 0 24 24", fill: "none", stroke: "rgba(155,48,255,0.85)", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (type) {
    case "innovation":
      return <svg {...s}><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M16.36 16.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M16.36 7.64l1.42-1.42"/></svg>;
    case "community":
      return <svg {...s}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>;
    case "excellence":
      return <svg {...s}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
    case "impact":
      return <svg {...s}><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>;
    default:
      return null;
  }
}

function LinkedInIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z"/></svg>;
}

function MailIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
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
      <span style={{ color: "transparent", WebkitTextStroke: "1.5px rgba(155,48,255,0.5)" }}>{outlined}</span>
    </h2>
  );
}

function GradientDivider() {
  return <div style={{ width: "100%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(155,48,255,0.25) 50%, transparent)", margin: "0 auto" }} />;
}

/* ─────────────────────────────────────
   HERO SECTION
───────────────────────────────────── */

function AboutHero() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} style={{
      position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      padding: "140px 24px 100px", overflow: "hidden",
    }}>
      {/* Ambient glow */}
      <div style={{
        position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
        width: "700px", height: "700px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(155,48,255,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      {/* Scan lines */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.03, pointerEvents: "none",
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(155,48,255,0.15) 2px, rgba(155,48,255,0.15) 4px)",
      }} />

      <div style={{ position: "relative", textAlign: "center", maxWidth: "900px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease: EASE }}>
          <SectionEyebrow label="TSYP 14 · About Us" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          style={{
            fontSize: "clamp(40px, 7vw, 88px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1,
            margin: "0 0 24px", fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
          }}
        >
          <span style={{ color: "#ffffff" }}>Meet the </span>
          <span style={{ color: "transparent", WebkitTextStroke: "1.5px rgba(155,48,255,0.6)" }}>Team</span>
          <br />
          <span style={{
            background: "linear-gradient(135deg, #9b30ff, #c084fc)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>Behind TSYP 14</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          style={{
            fontSize: "17px", lineHeight: 1.7, color: "rgba(255,255,255,0.5)", maxWidth: "620px", margin: "0 auto 48px",
            fontFamily: "var(--font-inter), 'Inter', sans-serif",
          }}
        >
          A passionate team of young IEEE professionals from across Tunisia,
          united to organize the 14th edition of the Tunisian Students and Young Professionals Congress.
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          className="about-stats-row"
          style={{
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", maxWidth: "600px", margin: "0 auto",
          }}
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4 + i * 0.08, duration: 0.5, ease: EASE }}
              style={{ textAlign: "center" }}
            >
              <div style={{
                fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, letterSpacing: "-0.03em",
                background: "linear-gradient(135deg, #9b30ff, #c084fc)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
              }}>{s.value}</div>
              <div style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginTop: "4px" }}>{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────
   VALUES SECTION
───────────────────────────────────── */

function ValuesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} style={{ padding: "80px 24px 100px", position: "relative" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease: EASE }}>
          <SectionEyebrow label="Our Values" />
          <SectionTitle solid="What Drives" outlined="Us" />
        </motion.div>

        <div className="about-values-grid" style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginTop: "56px",
        }}>
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.6, ease: EASE }}
              style={{
                padding: "36px 24px",
                background: "rgba(255,255,255,0.02)",
                borderRadius: "16px",
                border: "1px solid rgba(155,48,255,0.1)",
                textAlign: "center",
                transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
              }}
              className="about-value-card"
            >
              <div style={{
                width: "56px", height: "56px", borderRadius: "14px", margin: "0 auto 20px",
                background: "rgba(155,48,255,0.08)", border: "1px solid rgba(155,48,255,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <ValueIcon type={v.icon} />
              </div>
              <h3 style={{
                fontSize: "16px", fontWeight: 700, color: "#ffffff", margin: "0 0 10px",
                fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
              }}>{v.title}</h3>
              <p style={{
                fontSize: "13px", lineHeight: 1.6, color: "rgba(255,255,255,0.4)", margin: 0,
                fontFamily: "var(--font-inter), 'Inter', sans-serif",
              }}>{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────
   TEAM SECTION (Interactive Cards)
───────────────────────────────────── */

function MemberCard({ member, index, inView }: { member: Member; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  const initials = member.name.split(" ").map(n => n[0]).join("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 + index * 0.08, duration: 0.6, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: "20px",
        overflow: "hidden",
        cursor: "pointer",
        background: "rgba(255,255,255,0.02)",
        border: `1px solid ${hovered ? "rgba(155,48,255,0.35)" : "rgba(155,48,255,0.08)"}`,
        boxShadow: hovered ? "0 0 40px rgba(155,48,255,0.12), 0 20px 60px rgba(0,0,0,0.4)" : "0 4px 20px rgba(0,0,0,0.2)",
        transition: "border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
      }}
    >
      {/* Avatar area */}
      <div style={{
        position: "relative",
        height: "220px",
        background: `linear-gradient(135deg, ${member.color}18 0%, rgba(0,0,0,0.3) 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}>
        {/* Ambient glow behind avatar */}
        <div style={{
          position: "absolute",
          width: "180px", height: "180px", borderRadius: "50%",
          background: `radial-gradient(circle, ${member.color}20 0%, transparent 70%)`,
          transition: "opacity 0.35s ease",
          opacity: hovered ? 1 : 0.4,
        }} />

        {/* Grid pattern */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.04, pointerEvents: "none",
          backgroundImage: `
            linear-gradient(rgba(155,48,255,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(155,48,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "30px 30px",
        }} />

        {/* Avatar circle with initials */}
        <motion.div
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.35, ease: EASE }}
          style={{
            position: "relative", zIndex: 1,
            width: "100px", height: "100px", borderRadius: "50%",
            background: `linear-gradient(135deg, ${member.color}, ${member.color}88)`,
            border: "2px solid rgba(255,255,255,0.15)",
            boxShadow: `0 0 30px ${member.color}33`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <span style={{
            fontSize: "32px", fontWeight: 800, color: "#ffffff",
            fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
            letterSpacing: "-0.02em",
          }}>{initials}</span>
        </motion.div>

        {/* Role badge */}
        <div style={{
          position: "absolute", bottom: "14px", left: "50%", transform: "translateX(-50%)",
          padding: "5px 14px", borderRadius: "20px",
          background: "rgba(0,0,0,0.5)", backdropFilter: "blur(12px)",
          border: "1px solid rgba(155,48,255,0.2)",
          fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
          color: member.color,
          whiteSpace: "nowrap",
        }}>
          {member.role}
        </div>
      </div>

      {/* Info area */}
      <div style={{ padding: "24px 20px 20px" }}>
        <h3 style={{
          fontSize: "17px", fontWeight: 700, color: "#ffffff", margin: "0 0 4px",
          fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
        }}>{member.name}</h3>
        <p style={{
          fontSize: "11px", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase",
          color: "rgba(155,48,255,0.5)", margin: "0 0 14px",
        }}>{member.department}</p>

        {/* Bio - revealed on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              style={{
                fontSize: "12px", lineHeight: 1.6, color: "rgba(255,255,255,0.4)", margin: "0 0 16px",
                fontFamily: "var(--font-inter), 'Inter', sans-serif", overflow: "hidden",
              }}
            >
              {member.bio}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Social links */}
        <div style={{ display: "flex", gap: "8px" }}>
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            href="#"
            style={{
              width: "34px", height: "34px", borderRadius: "10px",
              background: "rgba(155,48,255,0.08)", border: "1px solid rgba(155,48,255,0.12)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "rgba(155,48,255,0.6)", textDecoration: "none",
              transition: "background 0.2s ease, color 0.2s ease",
            }}
          >
            <LinkedInIcon />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            href="#"
            style={{
              width: "34px", height: "34px", borderRadius: "10px",
              background: "rgba(155,48,255,0.08)", border: "1px solid rgba(155,48,255,0.12)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "rgba(155,48,255,0.6)", textDecoration: "none",
              transition: "background 0.2s ease, color 0.2s ease",
            }}
          >
            <MailIcon />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

function TeamSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState("executive");

  return (
    <section ref={ref} style={{ padding: "80px 24px 100px", position: "relative" }}>
      {/* Ambient glow */}
      <div style={{
        position: "absolute", top: "30%", right: "-10%",
        width: "600px", height: "600px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(155,48,255,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ textAlign: "center", marginBottom: "48px" }}
        >
          <SectionEyebrow label="Our Team" />
          <SectionTitle solid="Organizing" outlined="Committee" />
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="about-tabs"
          style={{
            display: "flex", justifyContent: "center", gap: "6px", marginBottom: "48px",
            padding: "5px",
            background: "rgba(255,255,255,0.02)",
            borderRadius: "14px",
            border: "1px solid rgba(155,48,255,0.08)",
            width: "fit-content",
            margin: "0 auto 48px",
            flexWrap: "wrap",
          }}
        >
          {TEAM_CATEGORIES.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              style={{
                position: "relative",
                padding: "10px 20px",
                borderRadius: "10px",
                border: "none",
                background: activeCategory === cat.key
                  ? "linear-gradient(135deg, rgba(155,48,255,0.2), rgba(124,58,237,0.12))"
                  : "transparent",
                color: activeCategory === cat.key ? "#ffffff" : "rgba(255,255,255,0.4)",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.25s ease",
                boxShadow: activeCategory === cat.key ? "0 0 16px rgba(155,48,255,0.1)" : "none",
                outline: activeCategory === cat.key ? "1px solid rgba(155,48,255,0.3)" : "1px solid transparent",
                fontFamily: "var(--font-inter), 'Inter', sans-serif",
              }}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Cards grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="about-team-grid"
            style={{
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px",
            }}
          >
            {TEAM[activeCategory].map((member, i) => (
              <MemberCard key={member.name} member={member} index={i} inView={inView} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────
   MISSION SECTION
───────────────────────────────────── */

function MissionSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} style={{ padding: "80px 24px 100px", position: "relative" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease: EASE }}>
          <SectionEyebrow label="Our Mission" />
          <SectionTitle solid="Empowering" outlined="Tomorrow" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.6, ease: EASE }}
          style={{
            marginTop: "48px",
            padding: "48px 40px",
            borderRadius: "24px",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(155,48,255,0.1)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Corner accent */}
          <div style={{
            position: "absolute", top: 0, left: 0,
            width: "80px", height: "80px",
            borderTop: "2px solid rgba(155,48,255,0.2)",
            borderLeft: "2px solid rgba(155,48,255,0.2)",
            borderTopLeftRadius: "24px",
          }} />
          <div style={{
            position: "absolute", bottom: 0, right: 0,
            width: "80px", height: "80px",
            borderBottom: "2px solid rgba(155,48,255,0.2)",
            borderRight: "2px solid rgba(155,48,255,0.2)",
            borderBottomRightRadius: "24px",
          }} />

          <p style={{
            fontSize: "20px", lineHeight: 1.8, color: "rgba(255,255,255,0.6)", margin: "0 0 24px",
            fontFamily: "var(--font-inter), 'Inter', sans-serif", fontWeight: 300,
          }}>
            &ldquo;The Tunisian Students and Young Professionals Congress is an annual IEEE event that brings together
            the brightest minds in engineering, technology, and innovation. Our mission is to foster
            <span style={{ color: "#c084fc", fontWeight: 500 }}> collaboration</span>,
            <span style={{ color: "#c084fc", fontWeight: 500 }}> knowledge exchange</span>, and
            <span style={{ color: "#c084fc", fontWeight: 500 }}> professional growth</span> among
            the next generation of technology leaders.&rdquo;
          </p>
          <div style={{
            width: "40px", height: "2px", margin: "0 auto 16px",
            background: "linear-gradient(90deg, transparent, rgba(155,48,255,0.4), transparent)",
          }} />
          <p style={{
            fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase",
            color: "rgba(155,48,255,0.5)", margin: 0,
          }}>IEEE Tunisia Section</p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────
   CTA SECTION
───────────────────────────────────── */

function JoinSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} style={{ padding: "60px 24px 120px" }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: EASE }}
        style={{
          maxWidth: "800px", margin: "0 auto", textAlign: "center",
          padding: "64px 40px",
          borderRadius: "28px",
          background: "linear-gradient(135deg, rgba(155,48,255,0.08) 0%, rgba(124,58,237,0.04) 100%)",
          border: "1px solid rgba(155,48,255,0.15)",
          position: "relative", overflow: "hidden",
        }}
      >
        <div style={{
          position: "absolute", top: "-50%", left: "-20%",
          width: "400px", height: "400px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(155,48,255,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <h2 style={{
          fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 16px",
          fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif", color: "#ffffff",
        }}>
          Want to Be Part of <span style={{ color: "#9b30ff" }}>TSYP 14</span>?
        </h2>
        <p style={{
          fontSize: "15px", lineHeight: 1.7, color: "rgba(255,255,255,0.45)", margin: "0 0 36px", maxWidth: "500px", marginLeft: "auto", marginRight: "auto",
          fontFamily: "var(--font-inter), 'Inter', sans-serif",
        }}>
          Join hundreds of young professionals and students for an unforgettable experience in Hammamet, Tunisia.
        </p>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(155,48,255,0.35)" }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: "14px 36px",
              background: "linear-gradient(135deg, #9b30ff 0%, #7c3aed 100%)",
              color: "#ffffff", fontSize: "12px", fontWeight: 600,
              letterSpacing: "0.1em", textTransform: "uppercase",
              borderRadius: "12px", border: "1px solid rgba(155,48,255,0.4)",
              cursor: "pointer",
              boxShadow: "0 0 20px rgba(155,48,255,0.2)",
            }}
          >
            Register Now
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: "14px 36px",
              background: "rgba(255,255,255,0.04)",
              color: "rgba(255,255,255,0.7)", fontSize: "12px", fontWeight: 600,
              letterSpacing: "0.1em", textTransform: "uppercase",
              borderRadius: "12px", border: "1px solid rgba(155,48,255,0.15)",
              cursor: "pointer",
            }}
          >
            Contact Us
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────
   PAGE
───────────────────────────────────── */

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(155,48,255,0.06) 0%, #000000 70%)",
        minHeight: "100vh",
      }}>
        <AboutHero />
        <GradientDivider />
        <ValuesSection />
        <GradientDivider />
        <TeamSection />
        <GradientDivider />
        <MissionSection />
        <JoinSection />
      </main>
      <Footer />
    </>
  );
}
