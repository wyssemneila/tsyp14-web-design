"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const links = ["Home", "Features", "Roadmap", "Docs"];

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: "52px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 28px",
        /* Nearly invisible — matches p1 exactly */
        background: "rgba(8, 0, 20, 0.3)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      {/* Logo left */}
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

      {/* Nav links center — exact p1 style */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "28px",
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        {links.map((link) => (
          <a
            key={link}
            href="#"
            style={{
              fontSize: "13px",
              fontWeight: 400,
              color: "rgba(255,255,255,0.75)",
              textDecoration: "none",
              letterSpacing: "0.01em",
              whiteSpace: "nowrap",
              transition: "color 0.18s",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLAnchorElement).style.color = "#ffffff")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLAnchorElement).style.color =
                "rgba(255,255,255,0.75)")
            }
          >
            {link}
          </a>
        ))}
      </div>

      {/* Register button right — white border outline like p1 Connect Wallet */}
      <button
        style={{
          padding: "7px 18px",
          background: "rgba(255,255,255,0.05)",
          color: "#ffffff",
          fontSize: "13px",
          fontWeight: 400,
          borderRadius: "8px",
          border: "1px solid rgba(255,255,255,0.6)",
          cursor: "pointer",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          letterSpacing: "0.02em",
          whiteSpace: "nowrap",
          transition: "background 0.18s, border-color 0.18s",
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.12)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.85)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.05)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)";
        }}
      >
        Register
      </button>
    </motion.nav>
  );
}
