"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];
import { MapPin, Globe, Mail } from "lucide-react";

export default function LocationSection() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="location"
      ref={ref}
      className="w-full py-28 px-6 md:px-10"
      style={{
        background:
          "linear-gradient(180deg, #050008 0%, #080010 55%, #050008 100%)",
      }}
    >
      {/* Header */}
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: EASE }}
      >
        <h2
          className="title-underline inline-block font-bold text-white"
          style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
        >
          Find Us Here
        </h2>
        <p
          className="mt-4 font-light tracking-wide max-w-xl mx-auto leading-relaxed"
          style={{ color: "#CC99FF" }}
        >
          Institut National des Sciences Appliquées et de Technologie,
          Tunis, Tunisia
        </p>
      </motion.div>

      {/* Map container */}
      <motion.div
        className="mx-auto overflow-hidden rounded-2xl"
        style={{
          maxWidth: "1100px",
          border: "2px solid rgba(155,48,255,0.28)",
          boxShadow: "0 0 40px rgba(155,48,255,0.16)",
        }}
        initial={{ opacity: 0, y: 36 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.70, delay: 0.15, ease: EASE }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3194.0!2d10.1897!3d36.8432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd34e2a9a1b1b1%3A0x1234567890abcdef!2sINSAT%2C%20Tunis!5e0!3m2!1sen!2stn!4v1234567890"
          className="map-iframe w-full block"
          style={{ height: "clamp(300px, 40vw, 500px)", border: "none" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="INSAT location on Google Maps"
        />
      </motion.div>

      {/* Info row */}
      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10"
        initial={{ opacity: 0, y: 18 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.30, ease: EASE }}
      >
        <div className="flex items-center gap-3">
          <MapPin size={18} color="#9B30FF" className="shrink-0" />
          <span className="text-sm text-white/80 tracking-wide">
            Centre Urbain Nord, Tunis 1080, Tunisia
          </span>
        </div>

        <span
          className="hidden sm:block h-4 w-px"
          style={{ background: "rgba(155,48,255,0.30)" }}
        />

        <div className="flex items-center gap-3">
          <Globe size={18} color="#9B30FF" className="shrink-0" />
          <span className="text-sm text-white/80 tracking-wide">
            insat.rnu.tn
          </span>
        </div>

        <span
          className="hidden sm:block h-4 w-px"
          style={{ background: "rgba(155,48,255,0.30)" }}
        />

        <div className="flex items-center gap-3">
          <Mail size={18} color="#9B30FF" className="shrink-0" />
          <span className="text-sm text-white/80 tracking-wide">
            ieee.insat@gmail.com
          </span>
        </div>
      </motion.div>
    </section>
  );
}
