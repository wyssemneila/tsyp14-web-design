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
   INTERACTIVE MEMBER CARD
───────────────────────────────────── */

function MemberCard({ member, index, inView }: { member: Member; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  const initials = member.name.split(" ").map(n => n[0]).join("");
  const hue = 270 + (index * 7) % 30;

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
        background: hovered
          ? "linear-gradient(165deg, rgba(155,48,255,0.06) 0%, rgba(0,0,0,0.6) 100%)"
          : "rgba(255,255,255,0.015)",
        border: `1px solid ${hovered ? "rgba(155,48,255,0.3)" : "rgba(255,255,255,0.04)"}`,
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        transform: hovered ? "translateY(-10px) scale(1.02)" : "translateY(0) scale(1)",
        boxShadow: hovered
          ? "0 20px 60px rgba(155,48,255,0.15), 0 0 0 1px rgba(155,48,255,0.1)"
          : "0 2px 10px rgba(0,0,0,0.2)",
      }}
    >
      {/* Animated border glow on hover */}
      <div style={{
        position: "absolute", inset: -1, borderRadius: "20px",
        background: `conic-gradient(from ${index * 45}deg, transparent 60%, rgba(155,48,255,${hovered ? 0.4 : 0}) 80%, transparent 100%)`,
        transition: "opacity 0.4s ease",
        opacity: hovered ? 1 : 0,
        zIndex: 0,
        animation: hovered ? "borderSpin 3s linear infinite" : "none",
      }} />
      <div style={{
        position: "relative", zIndex: 1,
        background: hovered ? "rgba(8,3,18,0.95)" : "rgba(8,3,18,0.5)",
        borderRadius: "19px",
        overflow: "hidden",
        transition: "background 0.4s ease",
      }}>
        {/* Avatar area */}
        <div style={{
          position: "relative",
          height: "200px",
          display: "flex", alignItems: "center", justifyContent: "center",
          overflow: "hidden",
        }}>
          {/* Mesh background */}
          <div style={{
            position: "absolute", inset: 0,
            background: `
              radial-gradient(circle at 30% 40%, hsla(${hue}, 80%, 50%, ${hovered ? 0.12 : 0.04}) 0%, transparent 60%),
              radial-gradient(circle at 70% 60%, hsla(${hue + 20}, 70%, 40%, ${hovered ? 0.1 : 0.03}) 0%, transparent 50%)
            `,
            transition: "all 0.5s ease",
          }} />

          {/* Floating particles on hover */}
          {hovered && (
            <>
              {[...Array(3)].map((_, pi) => (
                <motion.div
                  key={pi}
                  initial={{ opacity: 0, y: 20, scale: 0 }}
                  animate={{
                    opacity: [0, 0.6, 0],
                    y: [-10, -50 - pi * 15],
                    scale: [0, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5 + pi * 0.3,
                    repeat: Infinity,
                    delay: pi * 0.4,
                    ease: "easeOut",
                  }}
                  style={{
                    position: "absolute",
                    width: 4 + pi * 2, height: 4 + pi * 2,
                    borderRadius: "50%",
                    background: `rgba(155,48,255,0.5)`,
                    left: `${30 + pi * 20}%`,
                    bottom: "30%",
                    pointerEvents: "none",
                  }}
                />
              ))}
            </>
          )}

          {/* Initials / avatar placeholder */}
          <motion.div
            animate={{
              scale: hovered ? 1.1 : 1,
              boxShadow: hovered
                ? `0 0 40px rgba(155,48,255,0.3), 0 0 80px rgba(155,48,255,0.1)`
                : `0 0 0px rgba(155,48,255,0)`,
            }}
            transition={{ duration: 0.4, ease: EASE }}
            style={{
              position: "relative", zIndex: 2,
              width: "90px", height: "90px", borderRadius: "50%",
              background: `linear-gradient(135deg, hsla(${hue}, 80%, 55%, 0.2), hsla(${hue}, 60%, 30%, 0.3))`,
              border: `2px solid hsla(${hue}, 80%, 60%, ${hovered ? 0.5 : 0.15})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "border-color 0.4s ease",
            }}
          >
            <span style={{
              fontSize: "28px", fontWeight: 800, letterSpacing: "-0.02em",
              color: `hsla(${hue}, 80%, 75%, ${hovered ? 1 : 0.6})`,
              fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
              transition: "color 0.3s ease",
            }}>{initials}</span>
          </motion.div>
        </div>

        {/* Info */}
        <div style={{ padding: "0 18px 20px", textAlign: "center" }}>
          {/* Role pill */}
          <motion.div
            animate={{ y: hovered ? -6 : 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            style={{
              display: "inline-block",
              padding: "5px 14px", borderRadius: "20px",
              background: hovered
                ? "linear-gradient(135deg, rgba(155,48,255,0.25), rgba(124,58,237,0.15))"
                : "rgba(155,48,255,0.06)",
              border: `1px solid rgba(155,48,255,${hovered ? 0.35 : 0.1})`,
              fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
              color: hovered ? "#c084fc" : "rgba(155,48,255,0.5)",
              marginBottom: "12px",
              transition: "all 0.3s ease",
            }}
          >
            {member.role}
          </motion.div>

          <h3 style={{
            fontSize: "15px", fontWeight: 700, color: "#ffffff", margin: "0 0 8px",
            fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
            lineHeight: 1.3,
          }}>{member.name}</h3>

          {/* Email - slides up on hover */}
          <motion.a
            href={`mailto:${member.email}`}
            animate={{
              opacity: hovered ? 1 : 0.4,
              y: hovered ? 0 : 4,
            }}
            transition={{ duration: 0.3, ease: EASE }}
            style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              fontSize: "10px", color: "rgba(155,48,255,0.6)", textDecoration: "none",
              fontFamily: "var(--font-inter), 'Inter', sans-serif",
            }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
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
      <main style={{
        background: "#000000",
        minHeight: "100vh",
      }}>

        {/* ── Hero ── */}
        <section ref={heroRef} style={{
          position: "relative",
          padding: "160px 24px 80px",
          textAlign: "center",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)",
            width: "800px", height: "500px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(155,48,255,0.07) 0%, transparent 65%)",
            pointerEvents: "none",
          }} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
              <span style={{ width: "32px", height: "1px", background: "linear-gradient(90deg, transparent, rgba(155,48,255,0.5))" }} />
              <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.38em", textTransform: "uppercase", color: "rgba(155,48,255,0.6)" }}>TSYP 14 · The People</span>
              <span style={{ width: "32px", height: "1px", background: "linear-gradient(90deg, rgba(155,48,255,0.5), transparent)" }} />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: EASE }}
            style={{
              fontSize: "clamp(44px, 8vw, 96px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.95,
              margin: "0 0 28px",
              fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
            }}
          >
            <span style={{ color: "#ffffff" }}>The Minds</span>
            <br />
            <span style={{
              background: "linear-gradient(135deg, #9b30ff 20%, #c084fc 80%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Shaping It</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
            style={{
              fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.4)", maxWidth: "520px", margin: "0 auto",
              fontFamily: "var(--font-inter), 'Inter', sans-serif",
            }}
          >
            Fifteen students from across Tunisia, one shared obsession:
            building something unforgettable.
          </motion.p>
        </section>

        {/* Divider */}
        <div style={{ width: "100%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(155,48,255,0.2) 50%, transparent)" }} />

        {/* ── Team Grid ── */}
        <section ref={teamRef} style={{
          padding: "80px 24px 100px",
          position: "relative",
        }}>
          <div style={{
            position: "absolute", bottom: "20%", left: "-5%",
            width: "500px", height: "500px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(155,48,255,0.04) 0%, transparent 65%)",
            pointerEvents: "none",
          }} />

          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div className="about-team-grid" style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "18px",
            }}>
              {TEAM.map((member, i) => (
                <MemberCard key={member.name} member={member} index={i} inView={teamInView} />
              ))}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div style={{ width: "100%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(155,48,255,0.2) 50%, transparent)" }} />

        {/* ── Contact ── */}
        <section ref={contactRef} style={{ padding: "80px 24px 120px" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={contactInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
              style={{ textAlign: "center", marginBottom: "48px" }}
            >
              <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                <span style={{ width: "32px", height: "1px", background: "linear-gradient(90deg, transparent, rgba(155,48,255,0.5))" }} />
                <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.38em", textTransform: "uppercase", color: "rgba(155,48,255,0.6)" }}>Get in Touch</span>
                <span style={{ width: "32px", height: "1px", background: "linear-gradient(90deg, rgba(155,48,255,0.5), transparent)" }} />
              </div>
              <h2 style={{
                fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05, margin: 0,
                fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
              }}>
                <span style={{ color: "#ffffff" }}>Let&apos;s </span>
                <span style={{ color: "transparent", WebkitTextStroke: "1.5px rgba(155,48,255,0.5)" }}>Connect</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={contactInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.6, ease: EASE }}
              className="about-contact-grid"
              style={{
                display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px",
              }}
            >
              {[
                { icon: "✉", label: "Email", value: "tsyp14@ieee.org.tn", href: "mailto:tsyp14@ieee.org.tn" },
                { icon: "📱", label: "WhatsApp", value: "+216 XX XXX XXX", href: "tel:+216" },
                {
                  icon: "🔗", label: "Follow Us", value: "social",
                  href: "#",
                },
                { icon: "💬", label: "Have Ideas?", value: "Submit a suggestion →", href: "#" },
              ].map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={contactInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.5, ease: EASE }}
                  whileHover={{ scale: 1.02, y: -3 }}
                  style={{
                    display: "block",
                    padding: "24px",
                    borderRadius: "16px",
                    background: "rgba(255,255,255,0.015)",
                    border: "1px solid rgba(155,48,255,0.08)",
                    textDecoration: "none",
                    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                  }}
                  className="about-contact-card"
                >
                  <span style={{ fontSize: "20px", display: "block", marginBottom: "10px" }}>{item.icon}</span>
                  <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(155,48,255,0.6)", marginBottom: "6px" }}>{item.label}</div>
                  {item.value === "social" ? (
                    <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                      {["Facebook", "Instagram", "LinkedIn"].map(s => (
                        <span key={s} style={{
                          padding: "5px 12px", borderRadius: "8px",
                          background: "rgba(155,48,255,0.06)", border: "1px solid rgba(155,48,255,0.1)",
                          fontSize: "10px", color: "rgba(255,255,255,0.5)", fontWeight: 600,
                        }}>{s}</span>
                      ))}
                    </div>
                  ) : (
                    <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>{item.value}</div>
                  )}
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
