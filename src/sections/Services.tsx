import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { SectionHeading } from "@/components/SectionHeading";
import { cn } from "@/utils/cn";
import { EASE } from "@/animations/constants";

type Props = {
  onContact: () => void;
};

export function Services({ onContact }: Props) {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <section id="services" className="relative px-5 pt-28 pb-24 md:px-8 md:pt-36 lg:px-12">
      <div className="mx-auto max-w-[1680px]">
        <SectionHeading
          index="02"
          eyebrow="Capabilities"
          title="Expertise, not a catalogue of cards."
          body="We work as a studio: strategy, design, and development in one conversation. Hover a capability to see how it is practised."
          className="mb-16 max-w-3xl md:mb-24"
        />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <ul className="lg:col-span-6">
            {services.map((s, i) => {
              const on = i === active;
              return (
                <li key={s.id} className="border-t border-white/10 last:border-b">
                  <button
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className="flex w-full items-center gap-6 py-5 text-left md:py-6"
                    data-cursor="hover"
                    aria-current={on}
                  >
                    <span
                      className={cn(
                        "w-10 text-[11px] tracking-[0.2em] transition-colors",
                        on ? "text-gold" : "text-mute",
                      )}
                    >
                      {s.number}
                    </span>
                    <span
                      className={cn(
                        "font-display text-[clamp(1.6rem,3vw,2.6rem)] tracking-[-0.03em] transition-colors",
                        on ? "text-ivory" : "text-ivory/45",
                      )}
                    >
                      {s.name}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="relative lg:col-span-6">
            <div className="pointer-events-none absolute -top-10 right-0 font-display text-[clamp(4rem,10vw,9rem)] leading-none text-ivory/[0.04]">
              {current.number}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: EASE.out }}
                className="relative border border-white/10 bg-void-2 p-8 md:p-10"
              >
                <p className="text-[15px] leading-relaxed text-ivory-dim">{current.description}</p>

                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                  <div>
                    <p className="text-[11px] tracking-[0.22em] text-gold uppercase">Capabilities</p>
                    <ul className="mt-3 space-y-1.5 text-sm text-mute">
                      {current.capabilities.map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[11px] tracking-[0.22em] text-gold uppercase">Deliverables</p>
                    <ul className="mt-3 space-y-1.5 text-sm text-mute">
                      {current.deliverables.map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <p className="mt-8 text-sm text-ivory/80">{current.engagement}</p>
                <p className="mt-2 text-[11px] tracking-[0.16em] text-mute uppercase">
                  {current.tech.join(" · ")}
                </p>

                <button
                  onClick={onContact}
                  data-cursor="cta"
                  className="group mt-8 inline-flex items-center gap-2 text-[12px] tracking-[0.18em] text-ivory uppercase"
                >
                  Start with this
                  <ArrowRight className="h-4 w-4 transition-transform duration-400 group-hover:translate-x-1" />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
