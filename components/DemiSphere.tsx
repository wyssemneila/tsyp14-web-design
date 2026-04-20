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
      {/* ── Purple atmosphere glow — rises above the sphere ── */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: "8%",
          transform: "translateX(-50%)",
          width: "90%",
          height: "55%",
          background:
            "radial-gradient(ellipse 70% 90% at 50% 100%, rgba(120,30,220,0.55) 0%, rgba(90,20,180,0.28) 35%, rgba(60,10,140,0.10) 60%, transparent 80%)",
          filter: "blur(32px)",
        }}
      />

      {/* ── Base sphere — dark oval with white rim inset ── */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: "-38%",
          transform: "translateX(-50%)",
          width: "190%",
          aspectRatio: "2.35 / 1",
          background: "#06060e",
          borderRadius: "100%",
          boxShadow:
            "inset 0px 3px 28px 2px rgba(255,255,255,0.85), 0px -12px 60px 4px rgba(200,180,255,0.18)",
        }}
      >
        {/* Ellipse — top-edge gradient glow on sphere surface */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "100%",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(180,140,255,0.15) 12%, transparent 28%)",
          }}
        />

        {/* Radial — bright center hotspot on rim */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "1%",
            transform: "translateX(-50%)",
            width: "38%",
            height: "20%",
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.65) 0%, rgba(200,180,255,0.2) 50%, transparent 100%)",
            filter: "blur(18px)",
          }}
        />
      </div>

      {/* ── FX Blur — atmospheric haze above sphere ── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "62%",
          backdropFilter: "blur(56px)",
          WebkitBackdropFilter: "blur(56px)",
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(5,0,15,0.22) 100%)",
          maskImage:
            "linear-gradient(180deg, transparent 0%, black 35%, black 100%)",
          WebkitMaskImage:
            "linear-gradient(180deg, transparent 0%, black 35%, black 100%)",
        }}
      />

      {/* ── FX Linear — hard fade at very top to blend into black bg ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "140px",
          background: "linear-gradient(180deg, #000000 0%, transparent 100%)",
        }}
      />

      {/* ── FX Gradient — extra purple depth layer ── */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: "12%",
          transform: "translateX(-50%)",
          width: "70%",
          height: "38%",
          background:
            "radial-gradient(ellipse 80% 70% at 50% 100%, rgba(155,48,255,0.22) 0%, rgba(100,20,200,0.10) 50%, transparent 75%)",
          filter: "blur(48px)",
        }}
      />
    </div>
  );
}
