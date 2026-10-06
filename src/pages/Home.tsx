import { Hero } from "@/sections/Hero";
import { Manifesto } from "@/sections/Manifesto";
import { FeaturedWork } from "@/sections/FeaturedWork";
import { ProjectRail } from "@/components/ProjectRail";
import { Services } from "@/sections/Services";
import { Pricing } from "@/sections/Pricing";
import { Approach } from "@/sections/Approach";
import { FAQ } from "@/sections/FAQ";
import { FinalCTA } from "@/sections/FinalCTA";
import { Contact } from "@/sections/Contact";
import { InfiniteMarquee } from "@/components/InfiniteMarquee";
import { site } from "@/data/site";
import { Footer } from "@/components/Footer";

type Props = {
  ready: boolean;
  onOpen: (slug: string) => void;
  onSection: (id: string) => void;
  onHome: () => void;
};

export function Home({ ready, onOpen, onSection, onHome }: Props) {
  return (
    <main>
      <Hero ready={ready} onWork={() => onSection("work")} onContact={() => onSection("contact")} />

      <div className="border-y border-white/10 py-6 md:py-8">
        <InfiniteMarquee
          items={["Creative development", "Digital design", "Strategy", "Motion", "Interaction", "Creative technology"]}
          speed={36}
        />
      </div>

      <Manifesto />
      <FeaturedWork onOpen={onOpen} />
      <ProjectRail onOpen={onOpen} />

      <div className="border-y border-white/10 py-5">
        <InfiniteMarquee items={[...site.industries]} speed={40} reverse outlined />
      </div>

      <Services onContact={() => onSection("contact")} />
      <Pricing onContact={() => onSection("contact")} />
      <Approach />
      <FAQ />
      <FinalCTA onContact={() => onSection("contact")} />
      <Contact />
      <Footer onSection={onSection} onHome={onHome} />
    </main>
  );
}
