"use client";

import { useRef } from "react";
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
  image: string;
}

const TEAM: Member[] = [
  { name: "Mohamed Mahdi Braiki", role: "Chair", email: "mohamed.braiki@ieee.org", image: "/team/member-1.jpg" },
  { name: "Siwar Daoudi", role: "Vice Chair", email: "siwar.daoudi@ieee.org", image: "/team/member-2.jpg" },
  { name: "Nacira Jallali", role: "Secretary", email: "nacira.jallali@ieee.org", image: "/team/member-3.jpg" },
  { name: "Fadila Chaouche", role: "Treasurer", email: "fadila.chaouche@ieee.org", image: "/team/member-4.jpg" },
  { name: "Oussama Hamzaoui", role: "IT Manager", email: "oussama.hamzaoui@ieee.org", image: "/team/member-5.jpg" },
  { name: "Anis Abid", role: "Sponsoring Manager", email: "anis.abid@ieee.org", image: "/team/member-6.jpg" },
  { name: "Mohamed Fawzi Saidi", role: "Sponsoring Manager", email: "fawzi.saidi@ieee.org", image: "/team/member-7.jpg" },
  { name: "Ala Ayari", role: "Media Manager", email: "ala.ayari@ieee.org", image: "/team/member-8.jpg" },
  { name: "Mohamed ElMahdi Gaddas", role: "Design Manager", email: "mahdi.gaddas@ieee.org", image: "/team/member-9.jpg" },
  { name: "Wiem Bouguila", role: "Design Manager", email: "wiem.bouguila@ieee.org", image: "/team/member-10.jpg" },
  { name: "Amine Bougatfa", role: "Logistics Manager", email: "amine.bougatfa@ieee.org", image: "/team/member-11.jpg" },
  { name: "Amina Chaari", role: "Logistics Manager", email: "amina.chaari@ieee.org", image: "/team/member-12.jpg" },
  { name: "Yassine Fekih Hassen", role: "Venue Manager", email: "yassine.fekih@ieee.org", image: "/team/member-13.jpg" },
  { name: "Tasnim Ellouze", role: "Ambassadors Coordinator", email: "tasnim.ellouze@ieee.org", image: "/team/member-14.jpg" },
  { name: "Chaima Amel Guesly", role: "Challenges Coordinator", email: "chaima.guesly@ieee.org", image: "/team/member-15.jpg" },
];

/* ─────────────────────────────────────
   ICONS
───────────────────────────────────── */

function MailIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
}

/* ─────────────────────────────────────
   PAGE
───────────────────────────────────── */

export default function AboutPage() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <>
      <Navbar />
      <main style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(155,48,255,0.06) 0%, #000000 70%)",
        minHeight: "100vh",
        padding: "140px 24px 100px",
      }}>
        <div ref={ref} style={{ maxWidth: "1100px", margin: "0 auto" }}>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            style={{ textAlign: "center", marginBottom: "20px" }}
          >
            <h1 style={{
              fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, margin: 0,
              fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
            }}>
              <span style={{ color: "#ffffff" }}>About </span>
              <span style={{ color: "transparent", WebkitTextStroke: "1.5px rgba(155,48,255,0.5)" }}>Us</span>
            </h1>
          </motion.div>

          {/* Team label */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5, ease: EASE }}
            style={{ marginBottom: "40px" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
              <span style={{ width: "32px", height: "1px", background: "linear-gradient(90deg, transparent, rgba(155,48,255,0.5))", display: "block" }} />
              <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.38em", textTransform: "uppercase", color: "rgba(155,48,255,0.6)" }}>Team</span>
            </div>
            <h2 style={{
              fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, margin: 0,
              fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
            }}>
              <span style={{ color: "#ffffff" }}>Tiny </span>
              <span style={{
                background: "linear-gradient(135deg, #9b30ff, #c084fc)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>Committee</span>
            </h2>
          </motion.div>

          {/* Cards grid */}
          <div className="about-team-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "16px",
          }}>
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.12 + i * 0.04, duration: 0.5, ease: EASE }}
                className="about-member-card"
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(155,48,255,0.1)",
                  transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
                }}
              >
                {/* Photo */}
                <div style={{
                  position: "relative",
                  aspectRatio: "3/4",
                  background: "linear-gradient(135deg, rgba(155,48,255,0.08), rgba(0,0,0,0.4))",
                  overflow: "hidden",
                }}>
                  <div style={{
                    width: "100%", height: "100%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "40px", fontWeight: 800, color: "rgba(155,48,255,0.15)",
                    fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
                  }}>
                    {member.name.split(" ").map(n => n[0]).join("")}
                  </div>

                  {/* Role badge */}
                  <div style={{
                    position: "absolute", top: "10px", left: "10px",
                    padding: "4px 10px", borderRadius: "6px",
                    background: "linear-gradient(135deg, #9b30ff, #7c3aed)",
                    fontSize: "8px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
                    color: "#ffffff",
                    boxShadow: "0 2px 8px rgba(155,48,255,0.3)",
                  }}>
                    {member.role}
                  </div>
                </div>

                {/* Info */}
                <div style={{ padding: "14px 12px 16px" }}>
                  <h3 style={{
                    fontSize: "13px", fontWeight: 700, color: "#ffffff", margin: "0 0 6px",
                    fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
                    lineHeight: 1.3,
                  }}>{member.name}</h3>
                  <a
                    href={`mailto:${member.email}`}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "5px",
                      fontSize: "9px", color: "rgba(155,48,255,0.5)", textDecoration: "none",
                      fontFamily: "var(--font-inter), 'Inter', sans-serif",
                      transition: "color 0.2s ease",
                    }}
                  >
                    <MailIcon />
                    <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "140px" }}>{member.email}</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.6, ease: EASE }}
            className="about-contact-grid"
            style={{
              marginTop: "80px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
              padding: "40px",
              borderRadius: "20px",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(155,48,255,0.1)",
            }}
          >
            {/* Contact info */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
                <span style={{ width: "24px", height: "1px", background: "rgba(155,48,255,0.4)" }} />
                <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(155,48,255,0.6)" }}>Contact Us</span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                {/* Email */}
                <div style={{
                  padding: "16px",
                  borderRadius: "12px",
                  background: "rgba(155,48,255,0.04)",
                  border: "1px solid rgba(155,48,255,0.08)",
                }}>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "rgba(155,48,255,0.7)", marginBottom: "6px" }}>
                    <span style={{ marginRight: "6px" }}>✉</span> Email
                  </div>
                  <a href="mailto:tsyp@ieee.tn" style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>tsyp@ieee.tn</a>
                </div>

                {/* Phone */}
                <div style={{
                  padding: "16px",
                  borderRadius: "12px",
                  background: "rgba(155,48,255,0.04)",
                  border: "1px solid rgba(155,48,255,0.08)",
                }}>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "rgba(155,48,255,0.7)", marginBottom: "6px" }}>
                    <span style={{ marginRight: "6px" }}>📞</span> Call / WhatsApp
                  </div>
                  <a href="tel:+21628675588" style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>+216 28 675 588</a>
                </div>

                {/* Social */}
                <div style={{
                  padding: "16px",
                  borderRadius: "12px",
                  background: "rgba(155,48,255,0.04)",
                  border: "1px solid rgba(155,48,255,0.08)",
                }}>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "rgba(155,48,255,0.7)", marginBottom: "8px" }}>
                    <span style={{ marginRight: "6px" }}>🌐</span> Social Media
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    {["f", "📷", "in"].map((s, i) => (
                      <a key={i} href="#" style={{
                        width: "28px", height: "28px", borderRadius: "8px",
                        background: "rgba(155,48,255,0.1)", border: "1px solid rgba(155,48,255,0.15)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "11px", color: "rgba(255,255,255,0.5)", textDecoration: "none",
                        fontWeight: 700,
                      }}>{s}</a>
                    ))}
                  </div>
                </div>

                {/* Suggestion */}
                <div style={{
                  padding: "16px",
                  borderRadius: "12px",
                  background: "rgba(155,48,255,0.04)",
                  border: "1px solid rgba(155,48,255,0.08)",
                }}>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "rgba(155,48,255,0.7)", marginBottom: "6px" }}>
                    <span style={{ marginRight: "6px" }}>💡</span> Suggestion
                  </div>
                  <a href="#" style={{ fontSize: "12px", color: "rgba(155,48,255,0.5)", textDecoration: "none" }}>Fill the form →</a>
                </div>
              </div>
            </div>

            {/* Map */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
                <span style={{ width: "24px", height: "1px", background: "rgba(155,48,255,0.4)" }} />
                <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(155,48,255,0.6)" }}>Find Us Here</span>
              </div>
              <div style={{
                borderRadius: "14px",
                overflow: "hidden",
                border: "1px solid rgba(155,48,255,0.1)",
                height: "220px",
              }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3234.5!2d10.5688!3d36.3932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDIzJzM1LjUiTiAxMMKwMzQnMDcuNyJF!5e0!3m2!1sen!2stn!4v1&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg) saturate(0.3) brightness(0.7)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Venue location"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </main>
      <Footer />
    </>
  );
}
