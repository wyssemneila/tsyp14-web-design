export default function DemiSphere() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 2,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* ── Purple atmosphere rising from sphere ── */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "45%",
          transform: "translateX(-50%)",
          width: "90vw",
          height: "55vh",
          background:
            "radial-gradient(ellipse 65% 85% at 50% 100%, rgba(120,30,230,0.72) 0%, rgba(90,15,190,0.38) 30%, rgba(60,5,140,0.13) 58%, transparent 78%)",
          filter: "blur(32px)",
          zIndex: 1,
        }}
      />

      {/* ── Base sphere — explicit vw/vw dimensions (no aspect-ratio) ── */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "58%",
          transform: "translateX(-50%)",
          width: "185vw",
          height: "calc(185vw / 2.35)",  /* explicit height = 78.7vw */
          background:
            "radial-gradient(ellipse 100% 60% at 50% 0%, #2a0a5e 0%, #160535 22%, #0d0320 50%, #060110 100%)",
          borderRadius: "100%",
          boxShadow:
            "inset 0px 2px 28px 3px rgba(255,255,255,0.95), inset 0px 0px 80px 0px rgba(160,100,255,0.18), 0px -10px 120px 30px rgba(130,50,255,0.28)",
          zIndex: 3,
        }}
      >
        {/* Top rim gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "100%",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(200,160,255,0.22) 5%, rgba(130,60,240,0.05) 15%, transparent 28%)",
          }}
        />

        {/* Central hotspot on rim */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "0%",
            transform: "translateX(-50%)",
            width: "30%",
            height: "18%",
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.85) 0%, rgba(220,200,255,0.3) 45%, transparent 100%)",
            filter: "blur(10px)",
          }}
        />
      </div>

      {/* ── Extra purple depth layer ── */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "55%",
          transform: "translateX(-50%)",
          width: "60vw",
          height: "35vh",
          background:
            "radial-gradient(ellipse 80% 70% at 50% 100%, rgba(155,48,255,0.30) 0%, rgba(100,20,210,0.12) 50%, transparent 80%)",
          filter: "blur(48px)",
          zIndex: 2,
        }}
      />

      {/* ── Top fade to black ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "120px",
          background: "linear-gradient(180deg, #000000 0%, transparent 100%)",
          zIndex: 5,
        }}
      />
    </div>
  );
}
