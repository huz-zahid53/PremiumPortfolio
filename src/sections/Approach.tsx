import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { approach } from "@/data/approach";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

gsap.registerPlugin(ScrollTrigger);

export function Approach() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 899px)");

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;
    if (!section || !track || reduced || isMobile) return;

    const ctx = gsap.context(() => {
      const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 0.65,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          end: () => `+=${getDistance()}`,
          onUpdate: (self) => {
            if (progress) progress.style.transform = `scaleX(${self.progress})`;
          },
        },
      });
    }, section);

    const t = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => {
      window.clearTimeout(t);
      ctx.revert();
    };
  }, [isMobile, reduced]);

  return (
    <section
      id="approach"
      ref={sectionRef}
      className="relative overflow-hidden bg-void-2 md:h-screen"
    >
      <div className="pointer-events-none absolute top-0 right-0 left-0 z-10 px-5 pt-24 md:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1680px] flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-[11px] tracking-[0.28em] text-gold uppercase">04 — Approach</p>
            <h2 className="mt-3 font-display text-[clamp(2rem,4.4vw,4.2rem)] leading-[0.9] tracking-[-0.04em] text-ivory">
              A sequence, not a funnel.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-mute">
            Six movements from first conversation to work that stays sharp after launch.
          </p>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex w-max will-change-transform max-[899px]:mt-40 max-[899px]:w-full max-[899px]:flex-col max-[899px]:px-5 max-[899px]:pb-20 md:h-full"
      >
        {approach.map((step) => (
          <article
            key={step.number}
            className="relative flex w-full shrink-0 flex-col justify-end px-5 pt-48 pb-20 md:h-full md:w-screen md:px-12 md:pt-52 md:pb-24 lg:px-16"
          >
            <p className="absolute top-[38%] left-5 font-display text-[clamp(5rem,14vw,12rem)] leading-none tracking-[-0.07em] text-ivory/[0.06] md:left-12">
              {step.number}
            </p>
            <div className="relative max-w-xl">
              <p className="text-[11px] tracking-[0.24em] text-gold uppercase">{step.name}</p>
              <h3 className="mt-4 font-display text-[clamp(1.8rem,3vw,3rem)] leading-[1.05] tracking-[-0.03em] text-ivory">
                {step.lead}
              </h3>
              <p className="mt-5 text-[15px] leading-relaxed text-mute">{step.body}</p>
              <ul className="mt-8 flex flex-wrap gap-2">
                {step.activities.map((a) => (
                  <li
                    key={a}
                    className="border border-white/10 px-3 py-1.5 text-[11px] tracking-[0.14em] text-ivory/70 uppercase"
                  >
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <div className="pointer-events-none absolute right-0 bottom-0 left-0 hidden h-px bg-white/10 md:block">
        <div
          ref={progressRef}
          className="progress-line h-px origin-left bg-gold"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </section>
  );
}
