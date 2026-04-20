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

      {/* ── FADE group: Base + Elipse + Radial ── */}

      {/* Base — dark oval, white inset rim, exact Framer spec */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "58%",
          transform: "translateX(-50%)",
          width: "185vw",
          height: "calc(185vw / 2.347)",
          backgroundColor: "#0a0a0a",
          borderRadius: "100%",
          boxShadow:
            "inset 0px 2px 20px 0px #ffffff, 0px -10px 50px 1px rgba(255,255,255,0.49)",
          zIndex: 2,
        }}
      >
        {/* Elipse — white-to-transparent gradient on sphere surface */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "100%",
            background: "linear-gradient(180deg, #ffffff 0%, rgba(10,10,10,0) 100%)",
            opacity: 0.18,
          }}
        />

        {/* Radial — blurred white hotspot at center of rim */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "0%",
            transform: "translateX(-50%)",
            width: "38%",
            height: "14%",
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.5) 0%, rgba(10,10,10,0) 100%)",
            filter: "blur(57px)",
          }}
        />
      </div>

      {/* ── FX group: Linear + Blur + Gradient ── */}

      {/* Gradient — purple atmosphere above sphere */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "30%",
          transform: "translateX(-50%)",
          width: "80vw",
          height: "50vh",
          background:
            "radial-gradient(ellipse 70% 80% at 50% 100%, rgba(100,20,210,0.65) 0%, rgba(70,10,160,0.32) 35%, rgba(40,5,110,0.10) 62%, transparent 82%)",
          filter: "blur(40px)",
          zIndex: 3,
        }}
      />

      {/* Blur — atmospheric haze, fades from top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "73vh",
          backdropFilter: "blur(80px)",
          WebkitBackdropFilter: "blur(80px)",
          background:
            "linear-gradient(180deg, #000000 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0) 100%)",
          zIndex: 4,
        }}
      />

      {/* Linear — hard dark fade at very top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "14vh",
          background: "linear-gradient(180deg, #000000 0%, rgba(10,10,10,0) 100%)",
          zIndex: 5,
        }}
      />

    </div>
  );
}
