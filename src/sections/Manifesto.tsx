import { Reveal } from "@/components/Reveal";
import { site } from "@/data/site";

export function Manifesto() {
  return (
    <section className="relative px-5 py-24 md:px-8 md:py-32 lg:px-12">
      <div className="mx-auto grid max-w-[1680px] gap-12 md:grid-cols-12">
        <div className="md:col-span-2">
          <Reveal>
            <p className="text-[11px] tracking-[0.28em] text-gold uppercase">Studio</p>
          </Reveal>
        </div>
        <div className="md:col-span-9">
          <Reveal>
            <p className="font-display text-[clamp(1.85rem,4.2vw,3.6rem)] leading-[1.12] tracking-[-0.035em] text-ivory text-pretty">
              We take on a few projects at a time. Design and development stay in the same conversation, so the thing that ships still feels like the thing we intended.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-mute">{site.short}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
