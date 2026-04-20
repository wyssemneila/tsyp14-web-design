"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function ThemeSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<any>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  useEffect(() => {
    function initTubes() {
      if (canvasRef.current && (window as any).__TubesCursor) {
        appRef.current = (window as any).__TubesCursor(canvasRef.current, {
          tubes: {
            colors: ["#9b30ff", "#7c3aed", "#c026d3", "#6d28d9"],
            lights: {
              intensity: 180,
              colors: ["#9b30ff", "#b721ff", "#7c3aed", "#c026d3"],
            },
          },
        });
      }
    }

    const timer = setTimeout(() => {
      if ((window as any).__TubesCursor) {
        initTubes();
        return;
      }
      // Inject an ES module script that loads from CDN and exposes on window
      const script = document.createElement("script");
      script.type = "module";
      script.id = "__tubes-loader";
      script.textContent = `
        import TubesCursor from 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js';
        window.__TubesCursor = TubesCursor;
        window.dispatchEvent(new CustomEvent('__tubes_ready'));
      `;
      window.addEventListener("__tubes_ready", initTubes as EventListener, { once: true });
      document.head.appendChild(script);
    }, 150);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("__tubes_ready", initTubes as EventListener);
      if (appRef.current?.dispose) appRef.current.dispose();
    };
  }, []);

  return (
    <section
      id="theme"
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        background: "#000000",
        overflow: "hidden",
        fontFamily: "var(--font-inter), 'Inter', sans-serif",
      }}
    >
      {/* ── Canvas zone ── */}
      <div style={{
        position: "relative",
        width: "100%",
        height: "clamp(420px, 60vh, 680px)",
        overflow: "hidden",
      }}>
        {/* Tubes canvas */}
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
          }}
        />

        {/* Top fade */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "120px",
          background: "linear-gradient(180deg, #000000 0%, transparent 100%)",
          zIndex: 2, pointerEvents: "none",
        }} />

        {/* Bottom fade */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "160px",
          background: "linear-gradient(0deg, #000000 0%, transparent 100%)",
          zIndex: 2, pointerEvents: "none",
        }} />

        {/* Side fades */}
        <div style={{
          position: "absolute", top: 0, left: 0, bottom: 0, width: "120px",
          background: "linear-gradient(90deg, #000000 0%, transparent 100%)",
          zIndex: 2, pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: 0, right: 0, bottom: 0, width: "120px",
          background: "linear-gradient(270deg, #000000 0%, transparent 100%)",
          zIndex: 2, pointerEvents: "none",
        }} />

        {/* THE NOOSPHERE text */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 3,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: "16px", padding: "0 24px",
        }}>
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            style={{ display: "flex", alignItems: "center", gap: "12px" }}
          >
            <span style={{ width: "32px", height: "1px", background: "rgba(155,48,255,0.5)", display: "block" }} />
            <span style={{
              fontSize: "9px", fontWeight: 600, letterSpacing: "0.5em",
              textTransform: "uppercase", color: "rgba(155,48,255,0.75)",
            }}>
              TSYP 14 · Theme
            </span>
            <span style={{ width: "32px", height: "1px", background: "rgba(155,48,255,0.5)", display: "block" }} />
          </motion.div>

          {/* Main title */}
          <motion.h2
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1.0, ease: EASE, delay: 0.2 }}
            style={{
              fontSize: "clamp(52px, 10vw, 130px)",
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              textAlign: "center",
              color: "#ffffff",
              textShadow: "0 0 80px rgba(155,48,255,0.5), 0 0 30px rgba(155,48,255,0.3)",
              fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
              margin: 0,
              userSelect: "none",
            }}
          >
            THE
            <br />
            <span style={{
              background: "linear-gradient(135deg, #ffffff 0%, #e2d9ff 30%, #a78bfa 65%, #7c3aed 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "none",
            }}>
              NOOSPHERE
            </span>
          </motion.h2>
        </div>
      </div>

      {/* ── Description zone ── */}
      <div style={{
        position: "relative",
        zIndex: 4,
        maxWidth: "740px",
        margin: "0 auto",
        padding: "0 32px 100px",
        textAlign: "center",
      }}>
        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
          style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(155,48,255,0.4), transparent)",
            transformOrigin: "center",
            marginBottom: "40px",
          }}
        />

        {/* Three paragraphs, staggered */}
        {[
          "Architects of the Noosphere represents a vision where innovation connects minds to serve humanity with dignity and transparency.",
          "It emphasizes collaboration over rivalry, encouraging meaningful exchange among Student Branches to build a shared intellectual space.",
          "Rooted in Culture, Knowledge, Ethics, and Ideas, it inspires young engineers to shape a future where technology truly serves people.",
        ].map((text, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.55 + i * 0.12 }}
            style={{
              fontSize: "clamp(14px, 1.4vw, 16px)",
              lineHeight: 1.8,
              color: i === 0 ? "rgba(210,200,235,0.75)" : "rgba(175,160,210,0.5)",
              fontWeight: i === 0 ? 400 : 300,
              marginBottom: i < 2 ? "20px" : 0,
              letterSpacing: "0.01em",
            }}
          >
            {text}
          </motion.p>
        ))}

        {/* Pillars row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 0.9 }}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: "clamp(12px, 2vw, 28px)", flexWrap: "wrap", marginTop: "36px",
          }}
        >
          {["Culture", "Knowledge", "Ethics", "Ideas"].map((pillar, i) => (
            <span key={pillar} style={{
              fontSize: "10px", fontWeight: 600, letterSpacing: "0.3em",
              textTransform: "uppercase", color: "rgba(155,48,255,0.65)",
              padding: "6px 14px",
              border: "1px solid rgba(155,48,255,0.18)",
              borderRadius: "100px",
              background: "rgba(155,48,255,0.06)",
            }}>
              {pillar}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
