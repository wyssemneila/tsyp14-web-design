"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const LINKS = ["About", "Speakers", "Agenda", "Sponsors", "Contact"];

export default function Navbar() {
  const [active, setActive] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 100,
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(155,48,255,0.12)",
          fontFamily: "var(--font-inter), 'Inter', sans-serif",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          <Image src="/lg.webp" alt="IEEE TSYP14" width={108} height={34}
            style={{ objectFit: "contain" }} priority />
        </div>

        {/* Desktop nav links */}
        <div className="nav-links" style={{
          position: "absolute", left: "50%", transform: "translateX(-50%)",
          alignItems: "center", gap: "2px",
        }}>
          {LINKS.map((link) => (
            <a key={link} href="#"
              onMouseEnter={() => setActive(link)}
              onMouseLeave={() => setActive(null)}
              style={{
                position: "relative", padding: "6px 16px",
                fontSize: "11px", fontWeight: 500, letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: active === link ? "#ffffff" : "rgba(255,255,255,0.5)",
                textDecoration: "none", transition: "color 0.2s ease",
              }}
            >
              {link}
              <motion.span
                animate={{ opacity: active === link ? 1 : 0, scaleX: active === link ? 1 : 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                style={{
                  position: "absolute", bottom: 0, left: "16px", right: "16px",
                  height: "1px",
                  background: "linear-gradient(90deg, transparent, rgba(155,48,255,0.8), transparent)",
                  transformOrigin: "center", display: "block",
                }}
              />
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <motion.button
          whileHover={{ scale: 1.03, boxShadow: "0 0 24px rgba(155,48,255,0.35)" }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.18 }}
          className="nav-links"
          style={{
            padding: "9px 22px",
            background: "linear-gradient(135deg, #9b30ff 0%, #7c3aed 100%)",
            color: "#ffffff", fontSize: "11px", fontWeight: 600,
            letterSpacing: "0.1em", textTransform: "uppercase",
            borderRadius: "8px", border: "1px solid rgba(155,48,255,0.4)",
            cursor: "pointer", flexShrink: 0,
            boxShadow: "0 0 16px rgba(155,48,255,0.2)",
          }}
        >
          Register
        </motion.button>

        {/* Hamburger — mobile only */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          style={{
            background: "none", border: "none", cursor: "pointer",
            padding: "10px", flexDirection: "column",
            gap: "5px", alignItems: "center", justifyContent: "center",
            minWidth: "44px", minHeight: "44px",
          }}
        >
          {[0, 1, 2].map(i => (
            <motion.span
              key={i}
              animate={menuOpen
                ? i === 0 ? { rotate: 45, y: 10 }
                : i === 1 ? { opacity: 0 }
                : { rotate: -45, y: -10 }
                : { rotate: 0, y: 0, opacity: 1 }
              }
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: "block", width: "22px", height: "1.5px",
                background: "rgba(255,255,255,0.85)", borderRadius: "2px",
              }}
            />
          ))}
        </button>
      </motion.nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="nav-mobile-menu open"
            onClick={() => setMenuOpen(false)}
          >
            {LINKS.map((link, i) => (
              <motion.a
                key={link}
                href="#"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontSize: "22px", fontWeight: 600, letterSpacing: "0.1em",
                  textTransform: "uppercase", color: "rgba(255,255,255,0.85)",
                  textDecoration: "none", fontFamily: "var(--font-inter), 'Inter', sans-serif",
                  minHeight: "44px", display: "flex", alignItems: "center",
                }}
              >
                {link}
              </motion.a>
            ))}

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: LINKS.length * 0.06, duration: 0.35 }}
              onClick={() => setMenuOpen(false)}
              style={{
                marginTop: "8px", padding: "14px 36px",
                background: "linear-gradient(135deg, #9b30ff 0%, #7c3aed 100%)",
                color: "#ffffff", fontSize: "12px", fontWeight: 600,
                letterSpacing: "0.12em", textTransform: "uppercase",
                borderRadius: "10px", border: "1px solid rgba(155,48,255,0.4)",
                cursor: "pointer", minWidth: "160px", minHeight: "48px",
              }}
            >
              Register
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
