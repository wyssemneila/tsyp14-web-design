"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const links = ["Home", "About", "Schedule", "Docs"];

export default function Navbar() {
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
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 36px",
        height: "54px",
        background: "rgba(3, 0, 16, 0.35)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
        <Image
          src="/lg.webp"
          alt="IEEE TSYP14"
          width={130}
          height={42}
          style={{ objectFit: "contain" }}
          priority
        />
      </div>

      {/* Nav links */}
      <div style={{ display: "flex", alignItems: "center", gap: "36px" }}>
        {links.map((link) => (
          <a
            key={link}
            href="#"
            style={{
              fontSize: "14px",
              fontWeight: 500,
              color: "rgba(255,255,255,0.8)",
              textDecoration: "none",
              letterSpacing: "0.02em",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLAnchorElement).style.color = "#ffffff")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLAnchorElement).style.color =
                "rgba(255,255,255,0.8)")
            }
          >
            {link}
          </a>
        ))}
      </div>

      {/* Register button — outlined like p1's Connect Wallet */}
      <button
        style={{
          padding: "8px 22px",
          background: "rgba(255,255,255,0.06)",
          color: "#ffffff",
          fontSize: "13px",
          fontWeight: 500,
          borderRadius: "8px",
          border: "1px solid rgba(255,255,255,0.65)",
          cursor: "pointer",
          letterSpacing: "0.03em",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          transition: "background 0.2s, border-color 0.2s, transform 0.15s",
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          const b = e.currentTarget;
          b.style.background = "rgba(255,255,255,0.14)";
          b.style.borderColor = "rgba(255,255,255,0.9)";
          b.style.transform = "scale(1.03)";
        }}
        onMouseLeave={(e) => {
          const b = e.currentTarget;
          b.style.background = "rgba(255,255,255,0.06)";
          b.style.borderColor = "rgba(255,255,255,0.65)";
          b.style.transform = "scale(1)";
        }}
      >
        Register
      </button>
    </motion.nav>
  );
}
