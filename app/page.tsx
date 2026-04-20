import HeroSection from "@/components/HeroSection";
import CountdownSection from "@/components/CountdownSection";
import AboutSection from "@/components/AboutSection";
import WhoWeAreSection from "@/components/WhoWeAreSection";
import ThemeSection from "@/components/ThemeSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <CountdownSection />
      <AboutSection />
      <WhoWeAreSection />
      <ThemeSection />
    </main>
  );
}
