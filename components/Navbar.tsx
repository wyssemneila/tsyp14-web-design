"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home",      href: "#hero" },
  { label: "Countdown", href: "#countdown" },
  { label: "Editions",  href: "#editions" },
  { label: "Location",  href: "#location" },
];

export default function Navbar() {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(5,0,8,0.97)"
          : "rgba(5,0,8,0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(155,48,255,0.25)",
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNav("#hero")}
          className="flex items-center gap-3 cursor-pointer group"
          aria-label="Go to top"
        >
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
            style={{
              border: "1.5px solid rgba(155,48,255,0.7)",
              background: "rgba(155,48,255,0.12)",
            }}
          >
            {/* IEEE mini logo placeholder */}
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
              <rect x="3" y="8" width="4" height="8" rx="1" fill="#9B30FF" />
              <rect x="10" y="5" width="4" height="14" rx="1" fill="#CC00FF" />
              <rect x="17" y="8" width="4" height="8" rx="1" fill="#9B30FF" />
            </svg>
          </div>
          <span
            className="text-sm font-semibold tracking-widest hidden sm:block"
            style={{ color: "#CC99FF" }}
          >
            IEEE INSAT SB
          </span>
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {navItems.map((item) => (
            <li key={item.href}>
              <button
                onClick={() => handleNav(item.href)}
                className="nav-link-hover text-sm font-normal tracking-wide cursor-pointer bg-transparent border-none"
                style={{ color: "rgba(255,255,255,0.78)" }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "#fff")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color =
                    "rgba(255,255,255,0.78)")
                }
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg cursor-pointer"
          style={{
            color: "#CC99FF",
            background: "transparent",
            border: "none",
          }}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div
          className="md:hidden"
          style={{
            background: "rgba(5,0,8,0.98)",
            borderTop: "1px solid rgba(155,48,255,0.18)",
          }}
        >
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNav(item.href)}
              className="w-full text-left px-6 py-4 text-base font-normal tracking-wide cursor-pointer block"
              style={{
                color: "rgba(255,255,255,0.80)",
                background: "transparent",
                border: "none",
                borderBottom: "1px solid rgba(155,48,255,0.08)",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
