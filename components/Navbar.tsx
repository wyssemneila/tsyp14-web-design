"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

const LINKS = ["About", "Speakers", "Agenda", "Sponsors", "Contact"];

export default function Navbar() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px",
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(155,48,255,0.12)",
        fontFamily: "var(--font-inter), 'Inter', sans-serif",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
        <Image
          src="/lg.webp"
          alt="IEEE TSYP14"
          width={108}
          height={34}
          style={{ objectFit: "contain" }}
          priority
        />
      </div>

      {/* Nav links */}
      <div style={{
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        alignItems: "center",
        gap: "2px",
      }}>
        {LINKS.map((link) => (
          <a
            key={link}
            href="#"
            onMouseEnter={() => setActive(link)}
            onMouseLeave={() => setActive(null)}
            style={{
              position: "relative",
              padding: "6px 16px",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: active === link ? "#ffffff" : "rgba(255,255,255,0.5)",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
          >
            {link}
            {/* underline dot */}
            <motion.span
              animate={{ opacity: active === link ? 1 : 0, scaleX: active === link ? 1 : 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{
                position: "absolute",
                bottom: 0,
                left: "16px",
                right: "16px",
                height: "1px",
                background: "linear-gradient(90deg, transparent, rgba(155,48,255,0.8), transparent)",
                transformOrigin: "center",
                display: "block",
              }}
            />
          </a>
        ))}
      </div>

      {/* CTA */}
      <motion.button
        whileHover={{ scale: 1.03, boxShadow: "0 0 24px rgba(155,48,255,0.35)" }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.18 }}
        style={{
          padding: "9px 22px",
          background: "linear-gradient(135deg, #9b30ff 0%, #7c3aed 100%)",
          color: "#ffffff",
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          borderRadius: "8px",
          border: "1px solid rgba(155,48,255,0.4)",
          cursor: "pointer",
          flexShrink: 0,
          boxShadow: "0 0 16px rgba(155,48,255,0.2)",
        }}
      >
        Register
      </motion.button>
    </motion.nav>
  );
}
