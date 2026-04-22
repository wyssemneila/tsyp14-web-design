import HeroSection from "@/components/HeroSection";
import CountdownSection from "@/components/CountdownSection";
import AboutSection from "@/components/AboutSection";
import WhoWeAreSection from "@/components/WhoWeAreSection";
import ThemeSection from "@/components/ThemeSection";
import SpeakersSection from "@/components/SpeakersSection";
import EditionsSection from "@/components/EditionsSection";
import PartnersSection from "@/components/PartnersSection";
import MemoriesSection from "@/components/MemoriesSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <CountdownSection />
        <AboutSection />
        <WhoWeAreSection />
        <ThemeSection />
        <SpeakersSection />
        <EditionsSection />
        <PartnersSection />
        <MemoriesSection />
      </main>
      <Footer />
    </>
  );
}
