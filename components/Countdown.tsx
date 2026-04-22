"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Unit = { label: string; value: number };

function Digit({ value }: { value: number }) {
  const display = String(value).padStart(2, "0");
  return (
    <div style={{ position: "relative", height: "36px", overflow: "hidden", minWidth: "44px", display: "flex", justifyContent: "center" }}>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={display}
          initial={{ y: -28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 28, opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: "28px",
            fontWeight: 700,
            color: "#ffffff",
            fontVariantNumeric: "tabular-nums",
            lineHeight: "36px",
            letterSpacing: "-0.02em",
            position: "absolute",
          }}
        >
          {display}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export default function Countdown() {
  const [units, setUnits] = useState<Unit[]>([
    { label: "Days", value: 0 },
    { label: "Hours", value: 0 },
    { label: "Min", value: 0 },
    { label: "Sec", value: 0 },
  ]);

  useEffect(() => {
    const target = new Date("2026-12-21T00:00:00");
    const tick = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) return;
      setUnits([
        { label: "Days",  value: Math.floor(diff / 86400000) },
        { label: "Hours", value: Math.floor((diff % 86400000) / 3600000) },
        { label: "Min",   value: Math.floor((diff % 3600000) / 60000) },
        { label: "Sec",   value: Math.floor((diff % 60000) / 1000) },
      ]);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
      {/* Label */}
      <p style={{ fontSize: "11px", fontWeight: 500, color: "rgba(255,255,255,0.4)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
        Event starts in &nbsp;·&nbsp; 21 December 2026
      </p>

      {/* Glass card */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          padding: "12px 20px",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "16px",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        {units.map(({ label, value }, i) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {/* Unit block */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", padding: "6px 10px" }}>
              <Digit value={value} />
              <span style={{ fontSize: "9px", fontWeight: 500, color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {label}
              </span>
            </div>
            {/* Separator dot between units (not after last) */}
            {i < units.length - 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", paddingBottom: "14px" }}>
                <div style={{ width: "3px", height: "3px", borderRadius: "50%", background: "rgba(155,48,255,0.7)" }} />
                <div style={{ width: "3px", height: "3px", borderRadius: "50%", background: "rgba(155,48,255,0.7)" }} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
