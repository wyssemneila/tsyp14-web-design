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
          bottom: "14%",
          transform: "translateX(-50%)",
          width: "85%",
          height: "60%",
          background:
            "radial-gradient(ellipse 65% 85% at 50% 100%, rgba(110,20,220,0.65) 0%, rgba(80,10,170,0.35) 30%, rgba(50,5,120,0.12) 58%, transparent 78%)",
          filter: "blur(28px)",
          zIndex: 1,
        }}
      />

      {/* ── Base sphere — large dark oval with white rim ── */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: "-42%",
          transform: "translateX(-50%)",
          width: "185%",
          aspectRatio: "2.35 / 1",
          background: "radial-gradient(ellipse 100% 100% at 50% 50%, #110820 0%, #07040f 40%, #030208 100%)",
          borderRadius: "100%",
          boxShadow:
            "inset 0px 2px 24px 1px rgba(255,255,255,0.9), inset 0px 0px 60px 0px rgba(180,140,255,0.15), 0px -8px 80px 10px rgba(160,100,255,0.12)",
          zIndex: 3,
        }}
      >
        {/* Top rim gradient — white fade on sphere edge */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "100%",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(200,170,255,0.2) 8%, rgba(140,80,220,0.05) 20%, transparent 35%)",
          }}
        />

        {/* Radial hotspot — bright center on the rim */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "0%",
            transform: "translateX(-50%)",
            width: "35%",
            height: "22%",
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.7) 0%, rgba(210,190,255,0.3) 45%, transparent 100%)",
            filter: "blur(14px)",
          }}
        />
      </div>

      {/* ── Extra purple depth above sphere ── */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: "18%",
          transform: "translateX(-50%)",
          width: "55%",
          height: "30%",
          background:
            "radial-gradient(ellipse 80% 70% at 50% 100%, rgba(155,48,255,0.28) 0%, rgba(100,20,200,0.12) 50%, transparent 80%)",
          filter: "blur(40px)",
          zIndex: 2,
        }}
      />

      {/* ── FX Linear — fade at very top ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "130px",
          background: "linear-gradient(180deg, #000000 0%, transparent 100%)",
          zIndex: 5,
        }}
      />
    </div>
  );
}
