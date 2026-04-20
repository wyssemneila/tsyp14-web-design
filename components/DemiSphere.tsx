import Image from "next/image";

export default function DemiSphere() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 2,
        pointerEvents: "none",
      }}
    >
      <Image
        src="/sphere.png"
        alt=""
        fill
        priority
        style={{
          objectFit: "cover",
          objectPosition: "center 60%",
          maskImage:
            "radial-gradient(ellipse 75% 65% at 50% 65%, black 15%, rgba(0,0,0,0.45) 50%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 65% at 50% 65%, black 15%, rgba(0,0,0,0.45) 50%, transparent 78%)",
          opacity: 0.6,
        }}
      />
    </div>
  );
}
