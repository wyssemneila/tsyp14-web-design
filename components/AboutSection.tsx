"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const FACTS = [
  { label: "Edition",    value: "XIV · 14th"         },
  { label: "Host",       value: "IEEE INSAT SB"       },
  { label: "Partner",    value: "IEEE Tunisia Section" },
  { label: "Location",   value: "Tunis, Tunisia"       },
  { label: "Date",       value: "21 December 2026"     },
];

function FadeUp({
  children,
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: EASE, delay }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        background: "#000000",
        overflow: "hidden",
        fontFamily: "var(--font-inter), 'Inter', sans-serif",
      }}
    >
      {/* ── Top border line ── */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.1, ease: EASE, delay: 0.1 }}
        style={{
          height: "1px",
          background: "linear-gradient(90deg, transparent 0%, rgba(155,48,255,0.4) 30%, rgba(200,80,180,0.3) 60%, transparent 100%)",
          transformOrigin: "left center",
        }}
      />

      {/* ── Giant XIV watermark ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: "-2%",
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: "clamp(180px, 28vw, 380px)",
          fontWeight: 800,
          lineHeight: 1,
          letterSpacing: "-0.06em",
          color: "transparent",
          WebkitTextStroke: "1px rgba(155,48,255,0.07)",
          fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
          userSelect: "none",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        XIV
      </div>

      {/* ── Ambient glow ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "-10%",
          top: "50%",
          transform: "translateY(-50%)",
          width: "500px",
          height: "500px",
          background: "radial-gradient(ellipse, rgba(100,40,200,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── Main content grid ── */}
      <div
        className="about-grid"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1200px",
          margin: "0 auto",
          alignItems: "start",
        }}
      >
        {/* ── Col 1: Eyebrow + edition ── */}
        <div className="about-col-side" style={{ paddingTop: "8px" }}>
          <FadeUp delay={0.1}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "32px",
            }}>
              <div style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "rgba(155,48,255,0.8)",
                boxShadow: "0 0 8px rgba(155,48,255,0.5)",
              }} />
              <span style={{
                fontSize: "9px",
                fontWeight: 600,
                letterSpacing: "0.45em",
                textTransform: "uppercase",
                color: "rgba(155,48,255,0.75)",
              }}>
                About
              </span>
            </div>
          </FadeUp>

          <FadeUp delay={0.18}>
            <div style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              transform: "rotate(180deg)",
              fontSize: "clamp(52px, 7vw, 96px)",
              fontWeight: 800,
              lineHeight: 0.9,
              letterSpacing: "-0.04em",
              color: "transparent",
              WebkitTextStroke: "1.5px rgba(255,255,255,0.12)",
              fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
              userSelect: "none",
              marginTop: "16px",
            }}>
              2026
            </div>
          </FadeUp>
        </div>

        {/* ── Col 2: Title + body ── */}
        <div>
          <FadeUp delay={0.2}>
            <div style={{ marginBottom: "8px" }}>
              <span style={{
                fontSize: "clamp(38px, 5.5vw, 72px)",
                fontWeight: 300,
                lineHeight: 1.05,
                letterSpacing: "-0.035em",
                color: "#ffffff",
                fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
                display: "block",
              }}>
                TSYP Congress
              </span>
              <span style={{
                fontSize: "clamp(38px, 5.5vw, 72px)",
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: "-0.035em",
                background: "linear-gradient(130deg, #e2d9ff 0%, #a78bfa 40%, #7c3aed 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
                display: "block",
              }}>
                14th Edition
              </span>
            </div>
          </FadeUp>

          {/* Decorative line */}
          <FadeUp delay={0.32}>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
              style={{
                height: "1px",
                background: "rgba(155,48,255,0.2)",
                transformOrigin: "left center",
                margin: "28px 0 32px",
              }}
            />
          </FadeUp>

          <FadeUp delay={0.42}>
            <p style={{
              fontSize: "clamp(15px, 1.35vw, 17px)",
              lineHeight: 1.75,
              color: "rgba(200,195,220,0.7)",
              fontWeight: 400,
              maxWidth: "560px",
              margin: 0,
            }}>
              The <strong style={{ color: "rgba(220,210,255,0.9)", fontWeight: 600 }}>14th edition</strong> of the TSYP — Tunisian Student and Young
              Professional Congress — is organized by the{" "}
              <strong style={{ color: "rgba(220,210,255,0.9)", fontWeight: 600 }}>IEEE INSAT Student Branch</strong> in
              collaboration with the IEEE Tunisia Section. It serves as a premier
              platform for IEEE members to explore scientific and engineering
              challenges while emphasizing the ethical use of technology. The
              event fosters national and international networking, encouraging
              knowledge exchange and collaboration.
            </p>
          </FadeUp>
        </div>

        {/* ── Col 3: Facts list ── */}
        <div className="about-col-side" style={{ paddingTop: "8px" }}>
          <FadeUp delay={0.15}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "32px",
            }}>
              <div style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "rgba(155,48,255,0.8)",
                boxShadow: "0 0 8px rgba(155,48,255,0.5)",
              }} />
              <span style={{
                fontSize: "9px",
                fontWeight: 600,
                letterSpacing: "0.45em",
                textTransform: "uppercase",
                color: "rgba(155,48,255,0.75)",
              }}>
                Details
              </span>
            </div>
          </FadeUp>

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {FACTS.map(({ label, value }, i) => (
              <FadeUp key={label} delay={0.25 + i * 0.07}>
                <div style={{
                  padding: "16px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}>
                  <span style={{
                    fontSize: "9px",
                    fontWeight: 600,
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "rgba(155,48,255,0.55)",
                  }}>
                    {label}
                  </span>
                  <span style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "rgba(220,215,240,0.8)",
                    letterSpacing: "0.01em",
                  }}>
                    {value}
                  </span>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom border line ── */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.1, ease: EASE, delay: 0.6 }}
        style={{
          height: "1px",
          background: "linear-gradient(90deg, transparent 0%, rgba(155,48,255,0.25) 40%, rgba(200,80,180,0.2) 70%, transparent 100%)",
          transformOrigin: "left center",
        }}
      />
    </section>
  );
}
