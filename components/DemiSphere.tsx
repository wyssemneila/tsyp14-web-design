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
      {/* ── Purple atmosphere glow rising above sphere ── */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: "12%",
          transform: "translateX(-50%)",
          width: "90%",
          height: "65%",
          background:
            "radial-gradient(ellipse 70% 90% at 50% 100%, rgba(120,30,230,0.7) 0%, rgba(90,15,190,0.38) 28%, rgba(60,5,140,0.14) 55%, transparent 75%)",
          filter: "blur(30px)",
          zIndex: 1,
        }}
      />

      {/* ── Base sphere oval ── */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: "-40%",
          transform: "translateX(-50%)",
          width: "185%",
          aspectRatio: "2.35 / 1",
          /* Visible dark-purple background — contrasts against #000 */
          background:
            "radial-gradient(ellipse 100% 80% at 50% 0%, #2a0a5e 0%, #160535 25%, #0d0320 55%, #060110 100%)",
          borderRadius: "100%",
          /* White rim inset + outer purple halo */
          boxShadow:
            "inset 0px 2px 22px 2px rgba(255,255,255,0.95), inset 0px 0px 80px 0px rgba(160,100,255,0.2), 0px -6px 100px 20px rgba(130,50,255,0.25)",
          zIndex: 3,
        }}
      >
        {/* Top rim glow on sphere surface */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "100%",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.65) 0%, rgba(200,160,255,0.25) 6%, rgba(130,60,240,0.06) 18%, transparent 30%)",
          }}
        />

        {/* Bright central hotspot on the rim */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "-1%",
            transform: "translateX(-50%)",
            width: "32%",
            height: "20%",
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.8) 0%, rgba(220,200,255,0.35) 40%, transparent 100%)",
            filter: "blur(12px)",
          }}
        />
      </div>

      {/* ── Second purple accent layer above sphere ── */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: "20%",
          transform: "translateX(-50%)",
          width: "60%",
          height: "32%",
          background:
            "radial-gradient(ellipse 80% 70% at 50% 100%, rgba(155,48,255,0.32) 0%, rgba(100,20,210,0.14) 50%, transparent 80%)",
          filter: "blur(44px)",
          zIndex: 2,
        }}
      />

      {/* ── FX Linear — top edge fade to black ── */}
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
