import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/utils/cn";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  items: string[];
  speed?: number;
  reverse?: boolean;
  className?: string;
  outlined?: boolean;
};

export function InfiniteMarquee({ items, speed = 28, reverse = false, className, outlined }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    const track = trackRef.current;
    const wrap = wrapRef.current;
    if (!track || !wrap || reduced) return;

    const ctx = gsap.context(() => {
      const tween = gsap.to(track, {
        xPercent: reverse ? 50 : -50,
        repeat: -1,
        duration: speed,
        ease: "none",
      });

      const st = ScrollTrigger.create({
        trigger: wrap,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = Math.min(2.4, 1 + Math.abs(self.getVelocity()) / 1400);
          tween.timeScale(v);
        },
      });

      const pause = () => tween.pause();
      const play = () => tween.play();
      wrap.addEventListener("mouseenter", pause);
      wrap.addEventListener("mouseleave", play);

      return () => {
        st.kill();
        wrap.removeEventListener("mouseenter", pause);
        wrap.removeEventListener("mouseleave", play);
      };
    }, wrap);

    return () => ctx.revert();
  }, [reduced, reverse, speed]);

  const row = [...items, ...items];

  return (
    <div ref={wrapRef} className={cn("overflow-hidden select-none", className)} aria-hidden="true">
      <div
        ref={trackRef}
        className="flex w-max items-center gap-8 will-change-transform md:gap-14"
        style={reduced ? { animation: "none" } : undefined}
      >
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-8 md:gap-14">
            <span
              className={cn(
                "font-display text-[clamp(2.6rem,7vw,8rem)] leading-none tracking-[-0.05em] uppercase",
                outlined ? "outline-text" : "text-ivory",
              )}
            >
              {item}
            </span>
            <span className="text-gold">●</span>
          </span>
        ))}
      </div>
    </div>
  );
}
