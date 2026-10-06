import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import architecture from "@/assets/images/cta-architecture.jpg";
import { MagneticButton } from "@/components/MagneticButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  onContact: () => void;
};

export function FinalCTA({ onContact }: Props) {
  const ref = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    const el = ref.current;
    const img = imgRef.current;
    if (!el || !img || reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        img,
        { scale: 1.18 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={ref} className="relative min-h-[88vh] overflow-hidden">
      <img
        ref={imgRef}
        src={architecture}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-void/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-void/30" />

      <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-[1680px] flex-col justify-end px-5 py-20 md:px-8 lg:px-12">
        <p className="text-[11px] tracking-[0.28em] text-gold uppercase">Next</p>
        <h2 className="mt-6 max-w-[12ch] font-display text-[clamp(3.2rem,8vw,8rem)] leading-[0.86] tracking-[-0.05em] text-ivory">
          Let’s build something exceptional.
        </h2>
        <p className="mt-8 max-w-md text-[15px] leading-relaxed text-ivory/75">
          If you have a product, a site, or a problem that needs a considered digital form — tell us what you are making.
        </p>
        <MagneticButton
          onClick={onContact}
          data-cursor="cta"
          className="mt-10 h-14 w-fit bg-ivory px-8 text-[12px] tracking-[0.2em] text-void uppercase"
        >
          Start a project
          <ArrowRight className="ml-3 h-4 w-4" />
        </MagneticButton>
      </div>
    </section>
  );
}
