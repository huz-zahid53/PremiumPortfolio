import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/utils/cn";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

export function Reveal({ children, className, delay = 0, y = 28 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [delay, reduced, y]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
