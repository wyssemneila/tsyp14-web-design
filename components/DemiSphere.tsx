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
        src="/sphere.webp"
        alt=""
        fill
        priority
        style={{
          objectFit: "cover",
          objectPosition: "center 55%",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 20%, black 60%, transparent 85%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 20%, black 60%, transparent 85%)",
          opacity: 0.95,
        }}
      />
    </div>
  );
}
