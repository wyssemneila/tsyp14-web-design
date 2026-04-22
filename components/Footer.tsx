"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const SOCIALS = [
  {
    name: "Facebook",
    href: "#",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer style={{
      position: "relative",
      width: "100%",
      background: "#000000",
      borderTop: "1px solid rgba(155,48,255,0.1)",
      fontFamily: "var(--font-inter), 'Inter', sans-serif",
      overflow: "hidden",
    }}>
      {/* Top glow accent */}
      <div aria-hidden style={{
        position: "absolute", top: 0, left: "20%", right: "20%", height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(155,48,255,0.7), rgba(192,38,211,0.5), transparent)",
        boxShadow: "0 0 20px rgba(155,48,255,0.25)",
        pointerEvents: "none",
      }} />

      {/* Ambient glow */}
      <div aria-hidden style={{
        position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "600px", height: "160px",
        background: "radial-gradient(ellipse, rgba(155,48,255,0.07) 0%, transparent 70%)",
        pointerEvents: "none", filter: "blur(40px)",
      }} />

      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "44px clamp(20px, 5vw, 56px) 36px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "24px",
        position: "relative", zIndex: 2,
      }}>
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <Image src="/lg.webp" alt="IEEE TSYP XIV" width={116} height={36}
            style={{ objectFit: "contain", opacity: 0.82 }} />
        </motion.div>

        {/* Divider */}
        <div style={{ width: "100%", height: "1px", background: "rgba(155,48,255,0.07)" }} />

        {/* Bottom row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.14 }}
          className="footer-bottom"
        >
          <p style={{
            fontSize: "10px", color: "rgba(255,255,255,0.2)",
            letterSpacing: "0.08em", margin: 0,
          }}>
            © 2026 IEEE TSYP XIV — INSAT. All Rights Reserved.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {SOCIALS.map(({ name, href, icon }) => (
              <a
                key={name}
                href={href}
                aria-label={name}
                className="footer-social-btn"
              >
                {icon}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
