import Image from "next/image";

export default function DemiSphere() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "560px",
        flexShrink: 0,
        overflow: "hidden",
      }}
    >
      <Image
        src="/sphere.webp"
        alt=""
        fill
        priority
        style={{
          objectFit: "cover",
          objectPosition: "center bottom",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 25%, black 55%, black 75%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 25%, black 55%, black 75%, rgba(0,0,0,0) 100%)",
        }}
      />
    </div>
  );
}
