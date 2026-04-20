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
      {/* Purple atmosphere — BEHIND sphere, visible above the rim */}
      <div style={{
        position: "absolute",
        left: "50%",
        top: "25%",
        transform: "translateX(-50%)",
        width: "110vw",
        height: "45vh",
        background: "radial-gradient(ellipse 80% 100% at 50% 100%, rgba(90,15,200,0.95) 0%, rgba(65,8,155,0.6) 22%, rgba(40,4,110,0.25) 50%, transparent 72%)",
        zIndex: 3,
      }} />

      {/* Base sphere — dark, inset white rim only */}
      <div style={{
        position: "absolute",
        left: "50%",
        top: "60%",
        transform: "translateX(-50%)",
        width: "185vw",
        height: "calc(185vw / 2.347)",
        backgroundColor: "#0a0a0a",
        borderRadius: "100%",
        boxShadow: "inset 0px 2px 20px 0px #ffffff",
        zIndex: 4,
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          borderRadius: "100%",
          background: "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, transparent 18%)",
        }} />
        <div style={{
          position: "absolute",
          left: "50%",
          top: "0%",
          transform: "translateX(-50%)",
          width: "38%",
          height: "15%",
          background: "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.5) 0%, transparent 100%)",
          filter: "blur(57px)",
        }} />
      </div>

      {/* Top black fade */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: "22vh",
        background: "linear-gradient(180deg, #000000 0%, transparent 100%)",
        zIndex: 6,
      }} />
    </div>
  );
}
