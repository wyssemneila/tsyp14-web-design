"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const links = ["Home", "Features", "Staking", "Roadmap", "Docs"];

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 32px",
        background: "rgba(7, 7, 26, 0.6)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* ── Logo ── */}
      <div style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
        <Image
          src="/lg.webp"
          alt="IEEE TSYP14"
          width={110}
          height={36}
          style={{ objectFit: "contain" }}
          priority
        />
      </div>

      {/* ── Pill nav group — matches p1 exactly ── */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: "2px",
          padding: "5px 6px",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "999px",
        }}
      >
        {links.map((link) => (
          <a
            key={link}
            href="#"
            style={{
              padding: "5px 14px",
              fontSize: "13px",
              fontWeight: 400,
              color: "rgba(255,255,255,0.75)",
              textDecoration: "none",
              borderRadius: "999px",
              whiteSpace: "nowrap",
              transition: "background 0.18s, color 0.18s",
            }}
            onMouseEnter={(e) => {
              const a = e.currentTarget;
              a.style.color = "#ffffff";
              a.style.background = "rgba(255,255,255,0.08)";
            }}
            onMouseLeave={(e) => {
              const a = e.currentTarget;
              a.style.color = "rgba(255,255,255,0.75)";
              a.style.background = "transparent";
            }}
          >
            {link}
          </a>
        ))}
      </div>

      {/* ── Register button — solid white pill like p1 ── */}
      <button
        style={{
          padding: "8px 20px",
          background: "#ffffff",
          color: "#07071a",
          fontSize: "13px",
          fontWeight: 600,
          borderRadius: "999px",
          border: "none",
          cursor: "pointer",
          letterSpacing: "0.01em",
          flexShrink: 0,
          transition: "opacity 0.18s, transform 0.15s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = "0.88";
          e.currentTarget.style.transform = "scale(1.03)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = "1";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        Register
      </button>
    </motion.nav>
  );
}
