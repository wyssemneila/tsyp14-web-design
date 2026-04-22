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
          objectPosition: "center 30%",
          maskImage:
            "radial-gradient(ellipse 90% 80% at 50% 65%, black 30%, rgba(0,0,0,0.6) 60%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 80% at 50% 65%, black 30%, rgba(0,0,0,0.6) 60%, transparent 85%)",
          opacity: 0.95,
        }}
      />
    </div>
  );
}
