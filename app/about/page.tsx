"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ─────────────────────────────────────
   DATA
───────────────────────────────────── */

interface Member {
  name: string;
  role: string;
  email: string;
}

const TEAM: Member[] = [
  { name: "Ahmed Ben Salah", role: "Chair", email: "ahmed.bensalah@ieee.org" },
  { name: "Fatma Khelifi", role: "Vice Chair", email: "fatma.khelifi@ieee.org" },
  { name: "Youssef Dridi", role: "Secretary", email: "youssef.dridi@ieee.org" },
  { name: "Mariem Bouaziz", role: "Treasurer", email: "mariem.bouaziz@ieee.org" },
  { name: "Khalil Hammami", role: "IT Manager", email: "khalil.hammami@ieee.org" },
  { name: "Nour Saidi", role: "Sponsoring Manager", email: "nour.saidi@ieee.org" },
  { name: "Mohamed Trabelsi", role: "Sponsoring Manager", email: "mohamed.trabelsi@ieee.org" },
  { name: "Syrine Mansour", role: "Media Manager", email: "syrine.mansour@ieee.org" },
  { name: "Rami Gharbi", role: "Media Manager", email: "rami.gharbi@ieee.org" },
  { name: "Ines Chaabane", role: "Design Manager", email: "ines.chaabane@ieee.org" },
  { name: "Omar Bouzid", role: "Logistics Manager", email: "omar.bouzid@ieee.org" },
  { name: "Amira Rezgui", role: "Logistics Manager", email: "amira.rezgui@ieee.org" },
  { name: "Sami Jelassi", role: "Venue Manager", email: "sami.jelassi@ieee.org" },
  { name: "Rim Aouini", role: "Ambassadors Coordinator", email: "rim.aouini@ieee.org" },
  { name: "Hedi Mbarek", role: "Challenges Coordinator", email: "hedi.mbarek@ieee.org" },
];

/* ─────────────────────────────────────
   SVG ICONS (flat outline, modern)
───────────────────────────────────── */

const ico = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "rgba(155,48,255,0.7)", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function IconMail() { return <svg {...ico}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4l-10 7L2 4"/></svg>; }
function IconPhone() { return <svg {...ico}><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>; }
function IconGlobe() { return <svg {...ico}><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>; }
function IconSend() { return <svg {...ico}><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>; }

/* ─────────────────────────────────────
   INTERACTIVE MEMBER CARD
───────────────────────────────────── */

function MemberCard({ member, index, inView }: { member: Member; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  const initials = member.name.split(" ").map(n => n[0]).join("");
  const hue = 265 + (index * 8) % 35;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: 0.05 + index * 0.04, duration: 0.55, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: "20px",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      {/* Spinning conic border */}
      <div style={{
        position: "absolute", inset: -1, borderRadius: "20px",
        background: `conic-gradient(from ${index * 45}deg, transparent 55%, rgba(155,48,255,${hovered ? 0.5 : 0}) 75%, rgba(200,132,252,${hovered ? 0.3 : 0}) 85%, transparent 100%)`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.4s ease",
        animation: hovered ? "borderSpin 3s linear infinite" : "none",
        zIndex: 0,
      }} />

      {/* Inner card */}
      <div style={{
        position: "relative", zIndex: 1,
        borderRadius: "19px",
        background: hovered
          ? "linear-gradient(170deg, rgba(18,6,32,0.98) 0%, rgba(6,2,14,0.98) 100%)"
          : "linear-gradient(170deg, rgba(12,4,22,0.8) 0%, rgba(4,1,10,0.8) 100%)",
        border: `1px solid ${hovered ? "rgba(155,48,255,0.2)" : "rgba(255,255,255,0.03)"}`,
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 24px 64px rgba(155,48,255,0.12), 0 0 1px rgba(155,48,255,0.3)"
          : "0 2px 8px rgba(0,0,0,0.2)",
      }}>
        {/* Photo — rounded square */}
        <div style={{
          margin: "14px 14px 0",
          aspectRatio: "3/4",
          borderRadius: "14px",
          overflow: "hidden",
          position: "relative",
        }}>
          <motion.img
            src="/team/placeholder.jpg"
            alt={member.name}
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ duration: 0.5, ease: EASE }}
            style={{
              width: "100%", height: "100%", objectFit: "cover", display: "block",
              filter: hovered ? "brightness(1.1)" : "brightness(0.85)",
              transition: "filter 0.4s ease",
            }}
          />

          {/* Purple overlay on hover */}
          <div style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(to top, rgba(8,3,18,0.7) 0%, transparent 50%, rgba(155,48,255,${hovered ? 0.05 : 0}) 100%)`,
            transition: "all 0.4s ease",
            pointerEvents: "none",
          }} />
        </div>

        {/* Info area */}
        <div style={{ padding: "16px 16px 18px" }}>
          {/* Role badge */}
          <motion.div
            animate={{ y: hovered ? -3 : 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            style={{
              display: "inline-block",
              padding: "4px 12px", borderRadius: "8px",
              background: hovered
                ? "linear-gradient(135deg, rgba(155,48,255,0.2), rgba(124,58,237,0.1))"
                : "rgba(155,48,255,0.05)",
              border: `1px solid rgba(155,48,255,${hovered ? 0.3 : 0.08})`,
              fontSize: "9px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
              color: hovered ? "#c084fc" : "rgba(155,48,255,0.45)",
              marginBottom: "10px",
              transition: "all 0.3s ease",
            }}
          >
            {member.role}
          </motion.div>

          <h3 style={{
            fontSize: "14px", fontWeight: 700, color: "#ffffff", margin: "0 0 6px",
            fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
            lineHeight: 1.3,
          }}>{member.name}</h3>

          <motion.a
            href={`mailto:${member.email}`}
            animate={{ opacity: hovered ? 1 : 0.3, y: hovered ? 0 : 3 }}
            transition={{ duration: 0.3, ease: EASE }}
            style={{
              display: "inline-flex", alignItems: "center", gap: "5px",
              fontSize: "9px", color: "rgba(155,48,255,0.55)", textDecoration: "none",
              fontFamily: "var(--font-inter), 'Inter', sans-serif",
            }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4l-10 7L2 4"/></svg>
            {member.email}
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────
   PAGE
───────────────────────────────────── */

export default function AboutPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-50px" });
  const teamRef = useRef(null);
  const teamInView = useInView(teamRef, { once: true, margin: "-80px" });
  const contactRef = useRef(null);
  const contactInView = useInView(contactRef, { once: true, margin: "-80px" });

  return (
    <>
      <Navbar />
      <main style={{ background: "#000000", minHeight: "100vh" }}>

        {/* ── Hero — compact one-line ── */}
        <section ref={heroRef} style={{
          position: "relative", padding: "120px 24px 40px", textAlign: "center", overflow: "hidden",
        }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease: EASE }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <span style={{ width: "32px", height: "1px", background: "linear-gradient(90deg, transparent, rgba(155,48,255,0.5))" }} />
              <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.38em", textTransform: "uppercase", color: "rgba(155,48,255,0.6)" }}>TSYP 14 · Organisation Committee</span>
              <span style={{ width: "32px", height: "1px", background: "linear-gradient(90deg, rgba(155,48,255,0.5), transparent)" }} />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: EASE }}
            style={{
              fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1,
              margin: 0, fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
            }}
          >
            <span style={{ color: "#ffffff" }}>The Minds </span>
            <span style={{
              background: "linear-gradient(135deg, #9b30ff 20%, #c084fc 80%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Shaping It</span>
          </motion.h1>
        </section>

        <div style={{ width: "100%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(155,48,255,0.2) 50%, transparent)" }} />

        {/* ── Team Grid ── */}
        <section ref={teamRef} style={{ padding: "80px 24px 100px", position: "relative" }}>
          <div style={{
            position: "absolute", bottom: "20%", left: "-5%",
            width: "500px", height: "500px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(155,48,255,0.04) 0%, transparent 65%)",
            pointerEvents: "none",
          }} />

          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div className="about-team-grid" style={{
              display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "16px",
            }}>
              {TEAM.map((member, i) => (
                <MemberCard key={member.name} member={member} index={i} inView={teamInView} />
              ))}
            </div>
          </div>
        </section>

        <div style={{ width: "100%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(155,48,255,0.2) 50%, transparent)" }} />

        {/* ── Contact — compact ── */}
        <section ref={contactRef} style={{ padding: "60px 24px 100px" }}>
          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={contactInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
              style={{ textAlign: "center", marginBottom: "32px" }}
            >
              <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <span style={{ width: "24px", height: "1px", background: "linear-gradient(90deg, transparent, rgba(155,48,255,0.5))" }} />
                <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.38em", textTransform: "uppercase", color: "rgba(155,48,255,0.6)" }}>Get in Touch</span>
                <span style={{ width: "24px", height: "1px", background: "linear-gradient(90deg, rgba(155,48,255,0.5), transparent)" }} />
              </div>
              <h2 style={{
                fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, margin: 0,
                fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
              }}>
                <span style={{ color: "#ffffff" }}>Let&apos;s </span>
                <span style={{ color: "transparent", WebkitTextStroke: "1.5px rgba(155,48,255,0.5)" }}>Connect</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={contactInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.12, duration: 0.6, ease: EASE }}
              className="about-contact-grid"
              style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}
            >
              {[
                { Icon: IconMail, label: "Email", value: "tsyp14@ieee.org.tn", href: "mailto:tsyp14@ieee.org.tn" },
                { Icon: IconPhone, label: "WhatsApp", value: "+216 XX XXX XXX", href: "tel:+216" },
                { Icon: IconGlobe, label: "Socials", value: "Follow us", href: "#" },
                { Icon: IconSend, label: "Ideas", value: "Suggest →", href: "#" },
              ].map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  whileHover={{ y: -4, scale: 1.03 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "center", gap: "10px",
                    padding: "24px 12px",
                    borderRadius: "16px",
                    background: "rgba(255,255,255,0.015)",
                    border: "1px solid rgba(155,48,255,0.06)",
                    textDecoration: "none", textAlign: "center",
                    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                  }}
                  className="about-contact-card"
                >
                  <div style={{
                    width: "40px", height: "40px", borderRadius: "12px",
                    background: "rgba(155,48,255,0.06)", border: "1px solid rgba(155,48,255,0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <item.Icon />
                  </div>
                  <div style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(155,48,255,0.5)" }}>{item.label}</div>
                  <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>{item.value}</div>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
