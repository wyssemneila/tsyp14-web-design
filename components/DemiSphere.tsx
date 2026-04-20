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
      {/* Base sphere — dark #0a0a0a, inset white rim only, no outer white glow */}
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
        zIndex: 3,
      }}>
        {/* Ellipse — white fade on top rim */}
        <div style={{
          position: "absolute",
          inset: 0,
          borderRadius: "100%",
          background: "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(10,10,10,0) 18%)",
        }} />
        {/* Radial hotspot */}
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

      {/* Purple atmosphere — ON TOP of sphere, fades downward to transparent */}
      <div style={{
        position: "absolute",
        left: "50%",
        top: "28%",
        transform: "translateX(-50%)",
        width: "110vw",
        height: "55vh",
        background: "radial-gradient(ellipse 75% 100% at 50% 100%, rgba(90,15,200,0.95) 0%, rgba(65,8,155,0.55) 25%, rgba(40,4,110,0.22) 52%, transparent 75%)",
        zIndex: 5,
      }} />

      {/* Top fade to black */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "30vh",
        background: "linear-gradient(180deg, #000000 0%, transparent 100%)",
        zIndex: 6,
      }} />
    </div>
  );
}
