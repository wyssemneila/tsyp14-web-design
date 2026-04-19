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
        padding: "0 40px",
        height: "64px",
        background: "rgba(2, 0, 10, 0.55)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.07)",
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

      {/* Register button */}
      <button
        style={{
          padding: "9px 26px",
          background: "rgba(255,255,255,0.96)",
          color: "#05000e",
          fontSize: "14px",
          fontWeight: 600,
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          letterSpacing: "0.025em",
          transition: "background 0.2s, transform 0.15s",
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          const b = e.currentTarget;
          b.style.background = "#ffffff";
          b.style.transform = "scale(1.03)";
        }}
        onMouseLeave={(e) => {
          const b = e.currentTarget;
          b.style.background = "rgba(255,255,255,0.96)";
          b.style.transform = "scale(1)";
        }}
      >
        Register
      </button>
    </motion.nav>
  );
}
