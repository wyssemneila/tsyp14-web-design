"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days:    Math.floor(diff / 864e5),
    hours:   Math.floor((diff % 864e5) / 36e5),
    minutes: Math.floor((diff % 36e5)  / 6e4),
    seconds: Math.floor((diff % 6e4)   / 1000),
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const UNITS: { key: keyof TimeLeft; label: string }[] = [
  { key: "days",    label: "Days"    },
  { key: "hours",   label: "Hours"   },
  { key: "minutes", label: "Min"     },
  { key: "seconds", label: "Sec"     },
];

function FlipDigit({ value }: { value: string }) {
  return (
    <AnimatePresence mode="popLayout">
      <motion.span
        key={value}
        initial={{ y: -28, opacity: 0, filter: "blur(4px)" }}
        animate={{ y: 0,   opacity: 1, filter: "blur(0px)" }}
        exit={{    y:  28, opacity: 0, filter: "blur(4px)" }}
        transition={{ duration: 0.32, ease: EASE }}
        className="inline-block"
      >
        {value}
      </motion.span>
    </AnimatePresence>
  );
}

export default function CountdownSection() {
  const targetRef = useRef<Date | null>(null);
  if (!targetRef.current) {
    const t = new Date();
    t.setDate(t.getDate() + 90);
    targetRef.current = t;
  }

  const [time, setTime]   = useState<TimeLeft>(() => calcTimeLeft(targetRef.current!));
  const sectionRef        = useRef<HTMLElement>(null);
  const inView            = useInView(sectionRef, { once: true, margin: "-80px" });

  useEffect(() => {
    const id = setInterval(() => setTime(calcTimeLeft(targetRef.current!)), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="countdown"
      ref={sectionRef}
      className="relative w-full py-32 px-6 md:px-10 overflow-hidden"
      style={{ background: "#050008" }}
    >
      {/* ambient glow blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: "800px", height: "400px",
            background: "radial-gradient(ellipse, rgba(155,48,255,0.12) 0%, rgba(5,0,8,0) 70%)",
          }}
        />
        <div
          className="absolute left-1/4 top-0 rounded-full"
          style={{
            width: "400px", height: "300px",
            background: "radial-gradient(ellipse, rgba(204,0,255,0.07) 0%, rgba(5,0,8,0) 70%)",
          }}
        />
      </div>

      {/* Section label */}
      <motion.div
        className="text-center mb-14 relative"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: EASE }}
      >
        <p
          className="uppercase tracking-[0.4em] text-xs font-semibold mb-4"
          style={{ color: "#9B30FF" }}
        >
          ── IEEE INSAT SB ──
        </p>
        <h2
          className="font-black text-white"
          style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", letterSpacing: "-0.01em" }}
        >
          Event&nbsp;
          <span
            style={{
              background: "linear-gradient(135deg, #CC00FF 0%, #9B30FF 60%, #CC99FF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Countdown
          </span>
        </h2>
        <p
          className="mt-3 font-light tracking-widest text-sm"
          style={{ color: "rgba(204,153,255,0.7)" }}
        >
          The future is approaching fast — be ready.
        </p>
      </motion.div>

      {/* Glass card + digits */}
      <motion.div
        className="relative mx-auto"
        style={{ maxWidth: "860px" }}
        initial={{ opacity: 0, y: 36, scale: 0.96 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
      >
        {/* card */}
        <div
          className="relative rounded-3xl overflow-hidden px-6 md:px-12 py-10 md:py-14"
          style={{
            background: "rgba(15,0,30,0.55)",
            border: "1px solid rgba(155,48,255,0.22)",
            backdropFilter: "blur(24px)",
            boxShadow: "0 0 60px rgba(155,48,255,0.10), inset 0 1px 0 rgba(204,0,255,0.12)",
          }}
        >
          {/* top shimmer line */}
          <div
            className="absolute top-0 left-[10%] right-[10%] h-px"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(204,0,255,0.6), transparent)",
            }}
          />

          {/* digits row */}
          <div className="flex items-center justify-center gap-0 flex-wrap">
            {UNITS.map(({ key, label }, idx) => (
              <div key={key} className="flex items-center">
                {/* digit block */}
                <div className="flex flex-col items-center" style={{ minWidth: "clamp(70px, 16vw, 160px)" }}>
                  <div
                    className="font-black tabular-nums leading-none overflow-hidden"
                    style={{
                      fontSize: "clamp(3.6rem, 9vw, 8rem)",
                      background: "linear-gradient(180deg, #ffffff 0%, #CC99FF 55%, #9B30FF 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      filter: "drop-shadow(0 0 18px rgba(155,48,255,0.55))",
                    }}
                  >
                    <FlipDigit value={pad(time[key])} />
                  </div>
                  <span
                    className="uppercase tracking-[0.28em] font-semibold mt-2"
                    style={{
                      fontSize: "clamp(0.6rem, 1vw, 0.75rem)",
                      color: "rgba(155,48,255,0.85)",
                    }}
                  >
                    {label}
                  </span>
                </div>

                {/* separator */}
                {idx < UNITS.length - 1 && (
                  <div
                    className="flex flex-col gap-2 mb-8 mx-1"
                    aria-hidden
                  >
                    <motion.span
                      className="block w-1.5 h-1.5 rounded-full"
                      style={{ background: "rgba(204,0,255,0.7)" }}
                      animate={{ opacity: [1, 0.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.span
                      className="block w-1.5 h-1.5 rounded-full"
                      style={{ background: "rgba(204,0,255,0.7)" }}
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* bottom divider + date */}
          <div
            className="mt-8 pt-6 flex items-center justify-center gap-4"
            style={{ borderTop: "1px solid rgba(155,48,255,0.15)" }}
          >
            <span
              className="block w-8 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(155,48,255,0.6))" }}
            />
            <p
              className="uppercase tracking-[0.3em] text-xs font-medium"
              style={{ color: "rgba(204,153,255,0.6)" }}
            >
              TSYP 14 · IEEE INSAT · Tunisia
            </p>
            <span
              className="block w-8 h-px"
              style={{ background: "linear-gradient(90deg, rgba(155,48,255,0.6), transparent)" }}
            />
          </div>

          {/* bottom shimmer */}
          <div
            className="absolute bottom-0 left-[10%] right-[10%] h-px"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(155,48,255,0.3), transparent)",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
