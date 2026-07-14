"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";

const LINKS = ["Home", "The Noosphere", "Program", "Venue", "About Us"];

const LINK_HREFS: Record<string, string> = {
  Home: "/",
  "The Noosphere": "/#theme",
  Program: "/#program",
  Venue: "/venue",
  "About Us": "/about",
};

const PROGRAM_DROPDOWN = [
  { label: "Technical Program", href: "/program/technical" },
  { label: "Speakers", href: "/program/speakers" },
  { label: "Challenges", href: "/program/challenges" },
];

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

function ChevronDown({ open }: { open: boolean }) {
  return (
    <motion.svg
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.25, ease: EASE }}
      width="8" height="8" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      style={{ marginLeft: "4px", display: "inline-block", verticalAlign: "middle" }}
    >
      <polyline points="6 9 12 15 18 9" />
    </motion.svg>
  );
}

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isLight = theme === "light";
  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
      className="theme-toggle-btn"
      style={{
        width: "36px", height: "36px", borderRadius: "10px",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", border: "1px solid rgba(155,48,255,0.2)",
        background: "rgba(155,48,255,0.06)",
        color: "rgba(155,48,255,0.8)",
        transition: "all 0.3s ease",
        flexShrink: 0,
      }}
    >
      {isLight ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      )}
    </button>
  );
}

export default function Navbar() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileProgOpen, setMobileProgOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
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

        {/* Desktop nav */}
        <div
          className="nav-links"
          style={{
            position: "absolute", left: "50%", transform: "translateX(-50%)",
            alignItems: "center",
            gap: "2px",
            padding: "4px",
            background: "rgba(255,255,255,0.025)",
            borderRadius: "12px",
            border: "1px solid rgba(155,48,255,0.1)",
          }}
        >
          {LINKS.map((link) => {
            const hasDropdown = link === "Program";

            return (
              <div
                key={link}
                style={{ position: "relative" }}
                onMouseEnter={() => { setHovered(link); if (hasDropdown) setDropdownOpen(true); }}
                onMouseLeave={() => { setHovered(null); if (hasDropdown) setDropdownOpen(false); }}
              >
                {hovered === link && (
                  <motion.div
                    layoutId="nav-pill"
                    style={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(135deg, rgba(155,48,255,0.22) 0%, rgba(124,58,237,0.14) 100%)",
                      borderRadius: "8px",
                      border: "1px solid rgba(155,48,255,0.38)",
                      boxShadow: "0 0 16px rgba(155,48,255,0.14), inset 0 1px 0 rgba(255,255,255,0.06)",
                    }}
                    initial={false}
                    transition={{ duration: 0.2, ease: EASE }}
                  />
                )}
                <a
                  href={hasDropdown ? undefined : (LINK_HREFS[link] || "#")}
                  onClick={hasDropdown ? (e: React.MouseEvent) => e.preventDefault() : undefined}
                  style={{
                    position: "relative", zIndex: 1,
                    display: "flex", alignItems: "center",
                    padding: "7px 12px",
                    fontSize: "10px", fontWeight: 500, letterSpacing: "0.07em",
                    textTransform: "uppercase",
                    color: hovered === link ? "#ffffff" : "rgba(255,255,255,0.48)",
                    textDecoration: "none",
                    transition: "color 0.18s ease",
                    whiteSpace: "nowrap",
                    cursor: hasDropdown ? "default" : "pointer",
                  }}
                >
                  {link}
                  {hasDropdown && <ChevronDown open={dropdownOpen} />}
                </a>

                {/* Dropdown for Program */}
                {hasDropdown && (
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: EASE }}
                        style={{
                          position: "absolute",
                          top: "calc(100% + 8px)",
                          left: "50%",
                          transform: "translateX(-50%)",
                          minWidth: "180px",
                          padding: "6px",
                          borderRadius: "12px",
                          background: "rgba(10,5,18,0.92)",
                          backdropFilter: "blur(20px)",
                          WebkitBackdropFilter: "blur(20px)",
                          border: "1px solid rgba(155,48,255,0.15)",
                          boxShadow: "0 12px 40px rgba(0,0,0,0.5), 0 0 1px rgba(155,48,255,0.2)",
                        }}
                      >
                        {PROGRAM_DROPDOWN.map((item) => (
                          <a
                            key={item.label}
                            href={item.href}
                            style={{
                              display: "block",
                              padding: "10px 14px",
                              borderRadius: "8px",
                              fontSize: "11px", fontWeight: 500, letterSpacing: "0.02em",
                              color: "rgba(255,255,255,0.6)",
                              textDecoration: "none",
                              transition: "all 0.15s ease",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "rgba(155,48,255,0.1)";
                              e.currentTarget.style.color = "#ffffff";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "transparent";
                              e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                            }}
                          >
                            {item.label}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            );
          })}
        </div>

        {/* Desktop CTA + Theme Toggle */}
        <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <ThemeToggle />
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: "0 0 24px rgba(155,48,255,0.35)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.18 }}
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
        </div>

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
            {LINKS.map((link, i) => {
              if (link === "Program") {
                return (
                  <div key={link} onClick={(e) => e.stopPropagation()}>
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      onClick={() => setMobileProgOpen(o => !o)}
                      style={{
                        fontSize: "22px", fontWeight: 600, letterSpacing: "0.1em",
                        textTransform: "uppercase", color: "rgba(255,255,255,0.85)",
                        background: "none", border: "none", cursor: "pointer",
                        fontFamily: "var(--font-inter), 'Inter', sans-serif",
                        minHeight: "44px", display: "flex", alignItems: "center", gap: "8px",
                        padding: 0,
                      }}
                    >
                      {link}
                      <ChevronDown open={mobileProgOpen} />
                    </motion.button>
                    <AnimatePresence>
                      {mobileProgOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: EASE }}
                          style={{ overflow: "hidden", paddingLeft: "20px" }}
                        >
                          {PROGRAM_DROPDOWN.map((item, si) => (
                            <motion.a
                              key={item.label}
                              href={item.href}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: si * 0.05, duration: 0.25 }}
                              onClick={() => setMenuOpen(false)}
                              style={{
                                display: "block",
                                padding: "10px 0",
                                fontSize: "16px", fontWeight: 500, letterSpacing: "0.05em",
                                textTransform: "uppercase", color: "rgba(155,48,255,0.7)",
                                textDecoration: "none",
                                fontFamily: "var(--font-inter), 'Inter', sans-serif",
                              }}
                            >
                              {item.label}
                            </motion.a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              return (
                <motion.a
                  key={link}
                  href={LINK_HREFS[link] || "#"}
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
              );
            })}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: LINKS.length * 0.06, duration: 0.35 }}
              style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "8px" }}
              onClick={(e) => e.stopPropagation()}
            >
              <ThemeToggle />
              <button
                onClick={() => setMenuOpen(false)}
                style={{
                  padding: "14px 36px",
                  background: "linear-gradient(135deg, #9b30ff 0%, #7c3aed 100%)",
                  color: "#ffffff", fontSize: "12px", fontWeight: 600,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  borderRadius: "10px", border: "1px solid rgba(155,48,255,0.4)",
                  cursor: "pointer", minWidth: "160px", minHeight: "48px",
                }}
              >
                Register
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
