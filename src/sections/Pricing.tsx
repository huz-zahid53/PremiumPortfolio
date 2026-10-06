import { ArrowRight } from "lucide-react";
import { pricing, pricingNote } from "@/data/pricing";
import { SectionHeading } from "@/components/SectionHeading";

type Props = {
  onContact: () => void;
};

export function Pricing({ onContact }: Props) {
  return (
    <section id="pricing" className="relative px-5 pt-16 pb-24 md:px-8 md:pt-24 lg:px-12">
      <div className="mx-auto max-w-[1680px]">
        <div className="mb-16 grid gap-10 md:grid-cols-12 md:items-end">
          <SectionHeading
            index="03"
            eyebrow="Engagements"
            title="How the work is framed."
            className="md:col-span-7"
          />
          <p className="max-w-md text-sm leading-relaxed text-mute md:col-span-5 md:pb-2">
            {pricingNote}
          </p>
        </div>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {pricing.map((tier) => (
            <article
              key={tier.name}
              className="grid gap-8 py-12 md:grid-cols-12 md:items-start md:py-16"
            >
              <div className="md:col-span-2">
                <p className="text-[11px] tracking-[0.22em] text-gold">{tier.number}</p>
                <h3 className="mt-3 font-display text-3xl tracking-tight text-ivory md:text-4xl">
                  {tier.name}
                </h3>
              </div>

              <div className="md:col-span-4">
                <p className="flex items-baseline gap-1 font-display tracking-[-0.04em] text-ivory">
                  <span className="text-sm tracking-[0.18em] text-mute uppercase">From</span>
                  <span className="text-[clamp(3.2rem,6vw,5.5rem)] leading-none">{tier.from}</span>
                  <span className="text-xl text-mute">{tier.cadence}</span>
                </p>
                <p className="mt-2 text-[11px] tracking-[0.16em] text-mute uppercase">
                  Indicative starting point
                </p>
              </div>

              <div className="md:col-span-4">
                <p className="text-[15px] leading-relaxed text-ivory-dim">{tier.description}</p>
                <ul className="mt-6 space-y-1.5 text-sm text-mute">
                  {tier.includes.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-sm text-ivory/70">{tier.bestFor}</p>
              </div>

              <div className="md:col-span-2 md:flex md:justify-end">
                <button
                  onClick={onContact}
                  data-cursor="cta"
                  className="group inline-flex items-center gap-2 border border-ivory/20 px-4 py-3 text-[11px] tracking-[0.18em] text-ivory uppercase hover:border-ivory"
                >
                  {tier.cta}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-400 group-hover:translate-x-1" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
