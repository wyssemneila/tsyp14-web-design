export default function DemiSphere() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 2,
        pointerEvents: "none",
        overflow: "visible",
      }}
    >
      {/* Exact Framer container: 1200×800px, centered, bottom:-100px */}
      <div style={{
        width: "1200px",
        height: "800px",
        position: "absolute",
        bottom: "-100px",
        left: "calc(50% - 600px)",
        overflow: "hidden",
        backgroundColor: "#0a0a0a",
      }}>

        {/* Purple gradient — atmosphere (simulates Framer's gradient/particles layer) */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(80,10,180,0.75) 0%, rgba(50,5,130,0.35) 35%, transparent 65%)",
          zIndex: 0,
        }} />

        {/* Ellipse — white-to-transparent gradient on sphere surface */}
        {/* framer-9dhxaz: bottom:-662px; left:-443px; right:-443px; height:955px */}
        <div style={{
          background: "linear-gradient(180deg, #ffffff 0%, rgba(10,10,10,0) 100%)",
          borderRadius: "100%",
          height: "955px",
          position: "absolute",
          bottom: "-662px",
          left: "-443px",
          right: "-443px",
          zIndex: 2,
          opacity: 0.9,
        }} />

        {/* Base sphere — framer-ct3gpt: exact Framer CSS */}
        {/* bottom:-668px; left:-521px; right:-521px; height:955px */}
        <div style={{
          height: "955px",
          backgroundColor: "#0a0a0a",
          borderRadius: "100%",
          position: "absolute",
          bottom: "-668px",
          left: "-521px",
          right: "-521px",
          boxShadow: "inset 0 2px 20px #fff, 0 -10px 50px 1px #ffffff7d",
          zIndex: 3,
        }} />

        {/* Radial — blurred white hotspot on rim */}
        {/* framer-1liu9c4: blur(57px); width:787px; height:111px; bottom:265px */}
        <div style={{
          filter: "blur(57px)",
          background: "radial-gradient(50% 50%, rgba(255,255,255,0.5) 0%, rgba(10,10,10,0) 100%)",
          width: "787px",
          height: "111px",
          position: "absolute",
          bottom: "265px",
          left: "calc(47.9167% - 393.5px)",
          overflow: "hidden",
          zIndex: 4,
        }} />

        {/* FX Blur — framer-xs0sb5: backdrop-filter blur(80px), top 588px */}
        <div style={{
          backdropFilter: "blur(80px)",
          WebkitBackdropFilter: "blur(80px)",
          background: "linear-gradient(180deg, #0a0a0a 0%, rgba(0,0,0,0) 100%)",
          height: "588px",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 5,
        }} />

        {/* FX Linear — framer-1az1164: hard dark fade top 100px */}
        <div style={{
          background: "linear-gradient(180deg, #0a0a0a 0%, rgba(10,10,10,0) 100%)",
          height: "100px",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 6,
        }} />

      </div>
    </div>
  );
}
