import HeroSection from "@/components/HeroSection";
import CountdownSection from "@/components/CountdownSection";
import AboutSection from "@/components/AboutSection";
import WhoWeAreSection from "@/components/WhoWeAreSection";
import ThemeSection from "@/components/ThemeSection";
import MemoriesSection from "@/components/MemoriesSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <CountdownSection />
      <AboutSection />
      <WhoWeAreSection />
      <ThemeSection />
      <MemoriesSection />
    </main>
  );
}
