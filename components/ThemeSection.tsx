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
              fontSize: "clamp(28px, 7vw, 88px)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              textAlign: "center",
              margin: 0,
              userSelect: "none",
              wordBreak: "break-word",
              fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
            }}
          >
            <span style={{ color: "#ffffff", textShadow: "0 0 60px rgba(155,48,255,0.4)" }}>THE </span>
            <span style={{
              background: "linear-gradient(135deg, #ffffff 0%, #e2d9ff 30%, #a78bfa 65%, #7c3aed 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              NOOSPHERE
            </span>
          </motion.h2>
        </div>
      </div>

      {/* ── Description zone ── */}
      <div className="theme-desc-pad" style={{
        position: "relative",
        zIndex: 4,
        maxWidth: "740px",
        margin: "0 auto",
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

        {/* Structured description */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
          className="theme-desc-grid"
          style={{ textAlign: "left", marginBottom: "20px" }}
        >
          <p style={{ fontSize: "clamp(13px, 1.3vw, 15px)", lineHeight: 1.8, color: "rgba(210,200,235,0.72)", fontWeight: 400, margin: 0 }}>
            Architects of the Noosphere is a vision where innovation connects minds to serve humanity with dignity and transparency.
          </p>
          <div className="theme-desc-divider" style={{ width: "1px", background: "linear-gradient(180deg, transparent, rgba(155,48,255,0.25), transparent)" }} />
          <p style={{ fontSize: "clamp(13px, 1.3vw, 15px)", lineHeight: 1.8, color: "rgba(175,160,210,0.5)", fontWeight: 300, margin: 0 }}>
            It inspires young engineers to build a shared intellectual space — where collaboration, ethics, and emerging technology truly serve people.
          </p>
        </motion.div>

        {/* Pillars — two rows by size */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 0.75 }}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: "8px", flexWrap: "wrap", marginTop: "32px",
          }}
        >
          {[
            { label: "Culture", accent: true },
            { label: "Knowledge", accent: true },
            { label: "Ethics", accent: true },
            { label: "Ideas", accent: true },
            { label: "AI & Human Synergy", accent: false },
            { label: "Global Mind", accent: false },
            { label: "Knowledge Sharing", accent: false },
            { label: "Legacy Information Networks", accent: false },
            { label: "Emerging Technologies", accent: false },
            { label: "Consciousness", accent: false },
          ].map(({ label, accent }) => (
            <span key={label} style={{
              fontSize: accent ? "9px" : "8px",
              fontWeight: accent ? 600 : 500,
              letterSpacing: accent ? "0.28em" : "0.15em",
              textTransform: "uppercase",
              color: accent ? "rgba(155,48,255,0.75)" : "rgba(155,48,255,0.42)",
              padding: accent ? "5px 13px" : "4px 11px",
              border: `1px solid ${accent ? "rgba(155,48,255,0.22)" : "rgba(155,48,255,0.1)"}`,
              borderRadius: "100px",
              background: accent ? "rgba(155,48,255,0.07)" : "rgba(155,48,255,0.03)",
              whiteSpace: "nowrap",
            }}>
              {label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
