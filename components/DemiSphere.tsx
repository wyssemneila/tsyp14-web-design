import Image from "next/image";

export default function DemiSphere() {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "55%",
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
          objectPosition: "center bottom",
          maskImage:
            "radial-gradient(ellipse 100% 90% at 50% 100%, black 25%, rgba(0,0,0,0.55) 55%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 100% 90% at 50% 100%, black 25%, rgba(0,0,0,0.55) 55%, transparent 80%)",
          opacity: 0.95,
        }}
      />
    </div>
  );
}
