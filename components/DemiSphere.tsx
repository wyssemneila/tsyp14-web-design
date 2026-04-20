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
      {/* Purple atmospheric glow — sits behind sphere */}
      <div style={{
        position: "absolute",
        left: "50%",
        top: "38%",
        transform: "translateX(-50%)",
        width: "100vw",
        height: "62vh",
        background: "radial-gradient(ellipse 80% 100% at 50% 100%, rgba(80,10,180,0.85) 0%, rgba(60,5,140,0.45) 30%, rgba(30,2,80,0.15) 60%, transparent 80%)",
        zIndex: 1,
      }} />

      {/* Base sphere — #0a0a0a + white inset rim (exact Framer) */}
      <div style={{
        position: "absolute",
        left: "50%",
        top: "60%",
        transform: "translateX(-50%)",
        width: "185vw",
        height: "calc(185vw / 2.347)",
        backgroundColor: "#0a0a0a",
        borderRadius: "100%",
        boxShadow: "inset 0px 2px 20px 0px #ffffff, 0px -10px 50px 1px rgba(255,255,255,0.49)",
        zIndex: 4,
      }}>
        {/* Elipse — white fade on top of sphere */}
        <div style={{
          position: "absolute",
          inset: 0,
          borderRadius: "100%",
          background: "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(10,10,10,0) 20%)",
        }} />

        {/* Radial — white hotspot center of rim */}
        <div style={{
          position: "absolute",
          left: "50%",
          top: "0%",
          transform: "translateX(-50%)",
          width: "38%",
          height: "15%",
          background: "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.5) 0%, rgba(10,10,10,0) 100%)",
          filter: "blur(57px)",
        }} />
      </div>

      {/* Top linear fade — black at top, fades out */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "25vh",
        background: "linear-gradient(180deg, #000000 0%, rgba(10,10,10,0) 100%)",
        zIndex: 6,
      }} />
    </div>
  );
}
