"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

const ThemeContext = createContext<{
  theme: Theme;
  toggle: () => void;
}>({ theme: "dark", toggle: () => {} });

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("tsyp-theme") as Theme | null;
    if (stored === "light" || stored === "dark") setTheme(stored);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute("data-theme", theme);
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("tsyp-theme", theme);

    if (theme === "light") {
      applyLightMode();
    } else {
      removeLightMode();
    }

    if (theme === "light") {
      const interval = setInterval(() => applyLightMode(), 1000);
      return () => clearInterval(interval);
    }
  }, [theme, mounted]);

  const toggle = () => setTheme(t => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

function isDarkBg(bg: string): boolean {
  return !!(bg && (
    bg === "rgb(0, 0, 0)" || bg.includes("#000") ||
    bg.includes("rgba(0, 0, 0") || bg.includes("rgba(0,0,0") ||
    bg.includes("rgb(6, 2, 22") || bg.includes("rgb(10, 5, 18") ||
    bg.includes("rgb(2, 1, 10") || bg.includes("rgb(3, 1, 15")
  ));
}

function applyLightMode() {
  const BG = "#eeeaf4";
  const CARD = "#dbb4de";
  const TEXT = "#1a0a2e";
  const TEXT_MUTED = "#3d2a5c";
  const ACCENT = "#a81caf";
  const NAV_BG = "rgba(238,234,244,0.85)";
  const PURPLE = "#c038c7";

  // Navbar → purple background
  document.querySelectorAll<HTMLElement>("nav[style]").forEach(el => {
    if (el.dataset.origBg) return;
    const bg = el.style.background || el.style.backgroundColor;
    if (bg && (bg.includes("rgba(0, 0, 0") || bg.includes("rgba(0,0,0") || bg.includes("rgb(0, 0, 0"))) {
      el.dataset.origBg = bg;
      el.style.background = "#c038c7";
      el.style.borderBottomColor = "rgba(255,255,255,0.15)";
    }
  });

  // Sections and main
  document.querySelectorAll<HTMLElement>("section[style], main[style]").forEach(el => {
    if (el.dataset.origBg) return;
    if (el.closest("footer") || el.classList.contains("hero-min-h")) return;
    const bg = el.style.background || el.style.backgroundColor;
    if (isDarkBg(bg)) {
      el.dataset.origBg = bg;
      el.style.background = BG;
    }
  });

  // Divs
  document.querySelectorAll<HTMLElement>("div[style]").forEach(el => {
    if (el.dataset.origBg) return;
    if (el.closest("footer")) return;
    const bg = el.style.background || el.style.backgroundColor;
    if (isDarkBg(bg)) {
      el.dataset.origBg = bg;
      el.style.background = BG;
    } else if (bg && (bg.includes("rgba(6, 2, 22") || bg.includes("rgba(6,2,22") || bg.includes("rgba(10, 5, 18") || bg.includes("rgba(10,5,18"))) {
      el.dataset.origBg = bg;
      el.style.background = CARD;
      el.style.borderColor = "rgba(168,28,175,0.12)";
      el.style.boxShadow = "0 2px 12px rgba(168,28,175,0.06)";
    }
  });

  document.querySelectorAll<HTMLElement>("h1, h2, h3, h4").forEach(el => {
    if (el.dataset.origColor !== undefined) return;
    if (el.closest("footer") || el.closest("nav") || el.closest(".hero-min-h")) return;
    const c = el.style.color;
    if (!c || c === "#ffffff" || c === "rgb(255, 255, 255)" || c.includes("rgba(255, 255, 255")) {
      el.dataset.origColor = c || "";
      el.style.color = TEXT;
    }
  });

  document.querySelectorAll<HTMLElement>("h1 span[style], h2 span[style], h3 span[style]").forEach(el => {
    if (el.dataset.origColor !== undefined) return;
    if (el.closest("footer") || el.closest("nav") || el.closest(".hero-min-h")) return;
    const c = el.style.color;
    const fill = el.style.getPropertyValue("-webkit-text-fill-color") || (el.style as unknown as Record<string, string>).webkitTextFillColor;
    if (c === "#ffffff" || c === "rgb(255, 255, 255)" || c === "transparent") {
      el.dataset.origColor = c;
      el.style.color = TEXT;
      if (fill) {
        el.dataset.origFill = fill;
        (el.style as unknown as Record<string, string>).webkitTextFillColor = TEXT;
      }
    }
    const stroke = (el.style as unknown as Record<string, string>).webkitTextStroke || el.style.getPropertyValue("-webkit-text-stroke");
    if (stroke && stroke.includes("rgba(155")) {
      el.dataset.origStroke = stroke;
      (el.style as unknown as Record<string, string>).webkitTextStroke = stroke.replace(/rgba\(155,48,255,[^)]+\)/, `rgba(168,28,175,0.5)`);
    }
  });

  document.querySelectorAll<HTMLElement>("p[style]").forEach(el => {
    if (el.dataset.origColor !== undefined) return;
    if (el.closest("footer") || el.closest("nav") || el.closest(".hero-min-h")) return;
    const c = el.style.color;
    if (c && (c.includes("rgba(200") || c.includes("rgba(180") || c.includes("rgba(190") || c.includes("rgba(255, 255, 255") || c === "rgb(255, 255, 255)" || c === "#ffffff")) {
      el.dataset.origColor = c;
      el.style.color = TEXT_MUTED;
    }
  });

  document.querySelectorAll<HTMLElement>("span[style]").forEach(el => {
    if (el.dataset.origColor !== undefined) return;
    if (el.closest("footer") || el.closest("nav") || el.closest(".hero-min-h")) return;
    const c = el.style.color;
    if (c && (c.includes("rgba(255, 255, 255") || c.includes("rgba(200") || c.includes("rgba(180") || c.includes("rgba(155") || c === "rgb(255, 255, 255)" || c === "#ffffff")) {
      el.dataset.origColor = c;
      el.style.color = ACCENT;
    }
  });

  document.querySelectorAll<HTMLElement>("a[style]").forEach(el => {
    if (el.dataset.origColor !== undefined) return;
    if (el.closest("footer") || el.closest("nav")) return;
    const c = el.style.color;
    if (c && (c.includes("rgba(255, 255, 255") || c === "rgb(255, 255, 255)" || c === "#ffffff")) {
      el.dataset.origColor = c;
      el.style.color = TEXT_MUTED;
    }
  });

  document.querySelectorAll<HTMLElement>("div[style], span[style]").forEach(el => {
    if (el.dataset.origColor !== undefined) return;
    if (el.closest("footer") || el.closest("nav") || el.closest(".hero-min-h")) return;
    const c = el.style.color;
    if (c === "#ffffff" || c === "rgb(255, 255, 255)") {
      el.dataset.origColor = c;
      el.style.color = TEXT;
    }
  });

  document.querySelectorAll<HTMLElement>("input[style], select[style]").forEach(el => {
    if (el.dataset.origBg) return;
    el.dataset.origBg = el.style.background || "";
    el.dataset.origColor = el.style.color || "";
    el.style.background = CARD;
    el.style.color = TEXT;
    el.style.borderColor = "rgba(168,28,175,0.2)";
  });

  // Buttons with dark backgrounds (not gradient/purple ones)
  document.querySelectorAll<HTMLElement>("button[style]").forEach(el => {
    if (el.dataset.origBg) return;
    if (el.closest("nav")) return;
    const bg = el.style.background || el.style.backgroundColor;
    if (isDarkBg(bg)) {
      el.dataset.origBg = bg;
      el.style.background = ACCENT;
      el.style.color = "#ffffff";
    }
  });

  document.querySelectorAll<HTMLElement>("img").forEach(el => {
    if (el.dataset.origFilter !== undefined) return;
    const f = el.style.filter;
    if (f && f.includes("invert(1)")) {
      el.dataset.origFilter = f;
      el.style.filter = f.replace("brightness(0) invert(1)", "").trim() || "none";
    }
  });

  // Reduce purple glow orbs
  document.querySelectorAll<HTMLElement>("div[style]").forEach(el => {
    if (el.dataset.origOpacity !== undefined) return;
    if (el.closest("footer")) return;
    const f = el.style.filter;
    if (f && f.includes("blur")) {
      const bg = el.style.background || el.style.backgroundColor;
      if (bg && (bg.includes("155") || bg.includes("124") || bg.includes("purple") || bg.includes("9b30ff"))) {
        el.dataset.origOpacity = el.style.opacity || "1";
        el.style.opacity = "0.08";
      }
    }
  });

  // Countdown digits → purple
  document.querySelectorAll<HTMLElement>(".countdown-units span[style]").forEach(el => {
    if (el.dataset.origColor !== undefined) return;
    const c = el.style.color;
    if (c === "#ffffff" || c === "rgb(255, 255, 255)") {
      el.dataset.origColor = c;
      el.style.color = PURPLE;
    }
  });

  // Countdown fade masks → match light background instead of black
  document.querySelectorAll<HTMLElement>(".countdown-units div[style]").forEach(el => {
    const bg = el.style.background;
    if (bg && bg.includes("linear-gradient") && bg.includes("#000")) {
      el.dataset.origBg = bg;
      el.style.background = bg.replace(/#000/g, BG);
    }
  });

  // Logo scroll bar → purple gradients instead of black shadows
  document.querySelectorAll<HTMLElement>(".logo-scroll-track").forEach(track => {
    const parent = track.parentElement;
    if (!parent) return;
    if (parent.dataset.origBg) return;
    const bg = parent.style.background;
    if (bg && isDarkBg(bg)) {
      parent.dataset.origBg = bg;
      parent.style.background = PURPLE;
    }
    parent.querySelectorAll<HTMLElement>("div[style]").forEach(vignette => {
      const vBg = vignette.style.background;
      if (vBg && vBg.includes("linear-gradient") && vBg.includes("#000")) {
        vignette.dataset.origBg = vBg;
        vignette.style.background = vBg.replace(/#000000/g, PURPLE).replace(/#000/g, PURPLE);
      }
    });
  });

  // Hero base background → purple for light mode
  const heroSection = document.querySelector<HTMLElement>(".hero-min-h");
  if (heroSection) {
    heroSection.querySelectorAll<HTMLElement>(":scope > div[style]").forEach(el => {
      if (el.dataset.origBg) return;
      const bg = el.style.background;
      if (bg === "#000000" || bg === "rgb(0, 0, 0)") {
        el.dataset.origBg = bg;
        el.style.background = PURPLE;
      }
      if (bg && bg.includes("radial-gradient") && bg.includes("rgba(100")) {
        el.dataset.origBg = bg;
        el.style.background = bg.replace("rgba(100,28,210,0.11)", "rgba(255,255,255,0.15)");
      }
    });
  }

  // Noosphere / Theme section → light background
  const themeSection = document.querySelector<HTMLElement>("#theme");
  if (themeSection) {
    if (!themeSection.dataset.origBg) {
      themeSection.dataset.origBg = themeSection.style.background || "";
      themeSection.style.background = BG;
    }
    themeSection.querySelectorAll<HTMLElement>("div[style]").forEach(el => {
      if (el.dataset.origBg) return;
      const bg = el.style.background;
      if (bg && bg.includes("linear-gradient") && bg.includes("#000")) {
        el.dataset.origBg = bg;
        el.style.background = bg.replace(/#000000/g, BG).replace(/#000/g, BG);
      }
    });
  }

  // Footer → purple background, white text
  const footer = document.querySelector<HTMLElement>("footer");
  if (footer && !footer.dataset.origBg) {
    footer.dataset.origBg = footer.style.background || footer.style.backgroundColor || "";
    footer.style.background = PURPLE;
    footer.querySelectorAll<HTMLElement>("[style]").forEach(el => {
      const bg = el.style.background || el.style.backgroundColor;
      if (bg && isDarkBg(bg)) {
        el.dataset.origBg = bg;
        el.style.background = "transparent";
      }
    });
  }

  // Remove ALL black box-shadows (replace with purple-tinted ones)
  document.querySelectorAll<HTMLElement>("[style]").forEach(el => {
    if (el.closest("footer")) return;
    const shadow = el.style.boxShadow;
    if (shadow && (shadow.includes("rgba(0, 0, 0") || shadow.includes("rgba(0,0,0"))) {
      if (!el.dataset.origShadow) {
        el.dataset.origShadow = shadow;
        el.style.boxShadow = shadow
          .replace(/rgba\(0,\s*0,\s*0,\s*[\d.]+\)/g, "rgba(168,28,175,0.08)");
      }
    }
  });
}

function removeLightMode() {
  document.querySelectorAll<HTMLElement>("[data-orig-bg]").forEach(el => {
    el.style.background = el.dataset.origBg || "";
    delete el.dataset.origBg;
  });
  document.querySelectorAll<HTMLElement>("[data-orig-color]").forEach(el => {
    el.style.color = el.dataset.origColor || "";
    delete el.dataset.origColor;
  });
  document.querySelectorAll<HTMLElement>("[data-orig-fill]").forEach(el => {
    (el.style as unknown as Record<string, string>).webkitTextFillColor = el.dataset.origFill || "";
    delete el.dataset.origFill;
  });
  document.querySelectorAll<HTMLElement>("[data-orig-stroke]").forEach(el => {
    (el.style as unknown as Record<string, string>).webkitTextStroke = el.dataset.origStroke || "";
    delete el.dataset.origStroke;
  });
  document.querySelectorAll<HTMLElement>("[data-orig-filter]").forEach(el => {
    el.style.filter = el.dataset.origFilter || "";
    delete el.dataset.origFilter;
  });
  document.querySelectorAll<HTMLElement>("[data-orig-opacity]").forEach(el => {
    el.style.opacity = el.dataset.origOpacity || "";
    delete el.dataset.origOpacity;
  });
  document.querySelectorAll<HTMLElement>("[data-orig-shadow]").forEach(el => {
    el.style.boxShadow = el.dataset.origShadow || "";
    delete el.dataset.origShadow;
  });
}
