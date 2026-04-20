"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const EDITIONS   = Array.from({ length: 13 }, (_, i) => i + 1);
const SCROLL_STEP = 320;
const EASE        = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function EditionsCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-80px" });

  // Drag state
  const isDragging  = useRef(false);
  const dragStartX  = useRef(0);
  const dragScrollL = useRef(0);

  const [atStart, setAtStart] = useState(true);
  const [atEnd,   setAtEnd]   = useState(false);

  function updateEdges() {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }

  function scrollBy(dir: 1 | -1) {
    trackRef.current?.scrollBy({
      left: dir * SCROLL_STEP,
      behavior: "smooth",
    });
  }

  /* ── Mouse drag ── */
  function onMouseDown(e: React.MouseEvent) {
    const el = trackRef.current;
    if (!el) return;
    isDragging.current  = true;
    dragStartX.current  = e.pageX - el.offsetLeft;
    dragScrollL.current = el.scrollLeft;
    el.style.cursor = "grabbing";
    el.style.scrollBehavior = "auto";
  }

  function onMouseMove(e: React.MouseEvent) {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const x  = e.pageX - trackRef.current.offsetLeft;
    const dx = (x - dragStartX.current) * 1.3;
    trackRef.current.scrollLeft = dragScrollL.current - dx;
  }

  function onMouseUp() {
    if (!trackRef.current) return;
    isDragging.current = false;
    trackRef.current.style.cursor = "grab";
    trackRef.current.style.scrollBehavior = "smooth";
  }

  /* ── Touch drag ── */
  const touchStartX   = useRef(0);
  const touchScrollL  = useRef(0);

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current  = e.touches[0].pageX;
    touchScrollL.current = trackRef.current?.scrollLeft ?? 0;
  }
  function onTouchMove(e: React.TouchEvent) {
    if (!trackRef.current) return;
    const dx = touchStartX.current - e.touches[0].pageX;
    trackRef.current.scrollLeft = touchScrollL.current + dx;
  }

  return (
    <section
      id="editions"
      ref={sectionRef}
      className="w-full py-28 px-0 overflow-hidden"
      style={{ background: "#050008" }}
    >
      {/* Header */}
      <div className="px-6 md:px-10">
        <motion.h2
          className="title-underline inline-block text-white font-bold text-center w-full"
          style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: EASE }}
        >
          Previous Editions
        </motion.h2>
        <motion.p
          className="text-center mt-4 mb-14 font-light tracking-wide"
          style={{ color: "#CC99FF" }}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.12, ease: EASE }}
        >
          A journey through innovation
        </motion.p>
      </div>

      {/* Carousel wrapper */}
      <div className="relative px-6 md:px-14">
        {/* Left arrow */}
        <button
          onClick={() => scrollBy(-1)}
          disabled={atStart}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 items-center justify-center
                     w-12 h-12 rounded-full cursor-pointer transition-all duration-250 disabled:opacity-30"
          style={{
            background: "rgba(13,0,32,0.85)",
            border: "1px solid #9B30FF",
            backdropFilter: "blur(6px)",
            color: "#fff",
          }}
          onMouseEnter={(e) => {
            if (!atStart)
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 0 22px rgba(204,0,255,0.55)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
          }}
          aria-label="Previous editions"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Track */}
        <div
          ref={trackRef}
          onScroll={updateEdges}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          className="flex gap-6 overflow-x-auto pb-6"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            cursor: "grab",
            scrollBehavior: "smooth",
            paddingLeft: "4px",
            paddingRight: "4px",
          }}
          aria-label="Previous editions carousel"
        >
          {EDITIONS.map((n, i) => (
            <motion.div
              key={n}
              initial={{ opacity: 0, y: 40, scale: 0.94 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.55,
                delay: 0.06 * Math.min(i, 6),
                ease: EASE,
              }}
              className="edition-card relative flex flex-col items-center justify-center gap-4 rounded-2xl shrink-0 overflow-hidden"
              style={{
                width: "280px",
                height: "380px",
                padding: "28px 20px",
                background: "linear-gradient(145deg, #0d0020, #1a0033)",
                border: "1px solid rgba(155,48,255,0.28)",
                boxShadow: "0 0 30px rgba(155,48,255,0.10)",
              }}
              whileHover={{
                y: -8,
                borderColor: "#CC00FF",
                boxShadow: "0 0 50px rgba(204,0,255,0.28), 0 20px 40px rgba(0,0,0,0.5)",
                transition: { duration: 0.28, ease: "easeOut" },
              }}
            >
              {/* Logo box */}
              <div
                className="flex items-center justify-center relative overflow-hidden rounded-xl"
                style={{
                  width: "140px",
                  height: "140px",
                  background: "#0a0018",
                  border: "2px solid #9B30FF",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, rgba(155,48,255,0.18), transparent 70%)",
                  }}
                />
                <span
                  className="text-sm font-semibold tracking-wider relative z-10"
                  style={{ color: "#9B30FF" }}
                >
                  Logo
                </span>
              </div>

              {/* Title */}
              <p
                className="font-bold text-white text-center"
                style={{ fontSize: "1.5rem" }}
              >
                TSYP {n}
              </p>

              {/* Sub */}
              <p
                className="font-light tracking-wider text-center"
                style={{ color: "#CC99FF", fontSize: "0.82rem" }}
              >
                Edition {n}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scrollBy(1)}
          disabled={atEnd}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 items-center justify-center
                     w-12 h-12 rounded-full cursor-pointer transition-all duration-250 disabled:opacity-30"
          style={{
            background: "rgba(13,0,32,0.85)",
            border: "1px solid #9B30FF",
            backdropFilter: "blur(6px)",
            color: "#fff",
          }}
          onMouseEnter={(e) => {
            if (!atEnd)
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 0 22px rgba(204,0,255,0.55)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
          }}
          aria-label="Next editions"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}
