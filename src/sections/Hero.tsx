import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowRight } from "lucide-react";
import { site } from "@/data/site";
import { EASE } from "@/animations/constants";
import { MagneticButton } from "@/components/MagneticButton";
import { HeroScene } from "@/three/HeroScene";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  ready: boolean;
  onWork: () => void;
  onContact: () => void;
};

export function Hero({ ready, onWork, onContact }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const reduced = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 899px)");
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 20, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 80, damping: 20, mass: 0.6 });
  const bgX = useTransform(sx, (v) => v * 0.25);
  const midX = useTransform(sx, (v) => v * 0.7);
  const bgY = useTransform(sy, (v) => v * 0.2);
  const midY = useTransform(sy, (v) => v * 0.55);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (reduced) return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      mouse.current.x = nx;
      mouse.current.y = ny;
      mx.set(nx * 16);
      my.set(ny * 12);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, reduced]);

  useEffect(() => {
    const section = sectionRef.current;
    const copy = copyRef.current;
    if (!section || !copy || reduced) return;

    const ctx = gsap.context(() => {
      gsap.to(copy, {
        y: 80,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [reduced, ready]);

  const show3d = ready && !reduced && !isMobile;

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pt-28 pb-10 md:pb-14"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-24 h-[70vh] w-[70vh] rounded-full opacity-40"
        style={{
          x: bgX,
          y: bgY,
          background:
            "radial-gradient(circle, rgba(212,180,131,0.16) 0%, rgba(8,8,7,0) 64%)",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-[-20%] left-[-10%] h-[50vh] w-[50vh] rounded-full opacity-30"
        style={{
          x: midX,
          y: midY,
          background: "radial-gradient(circle, rgba(241,238,230,0.06) 0%, rgba(8,8,7,0) 70%)",
        }}
      />

      <div className="pointer-events-none absolute top-[8%] right-[-8%] hidden h-[78vh] w-[54vw] lg:block">
        <ErrorBoundary>
          <HeroScene mouse={mouse} visible={show3d} />
        </ErrorBoundary>
      </div>

      <div ref={copyRef} className="relative z-10 mx-auto w-full max-w-[1680px] px-5 md:px-8 lg:px-12">
        <motion.p
          initial={reduced ? false : { y: 24, opacity: 0 }}
          animate={ready ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: EASE.out, delay: 0.05 }}
          className="mb-8 text-[11px] tracking-[0.28em] text-gold uppercase"
        >
          {site.eyebrow}
        </motion.p>

        <h1 className="font-display max-w-[16ch] text-[clamp(3.4rem,8.4vw,8.6rem)] leading-[0.86] tracking-[-0.055em] text-ivory">
          {site.headline.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={reduced ? false : { y: "110%" }}
                animate={ready ? { y: "0%" } : {}}
                transition={{ duration: 0.95, ease: EASE.out, delay: 0.12 + i * 0.08 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-10 grid max-w-5xl items-end gap-10 md:grid-cols-12">
          <motion.p
            initial={reduced ? false : { y: 20, opacity: 0 }}
            animate={ready ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.45, ease: EASE.out }}
            className="max-w-md text-[15px] leading-relaxed text-ivory-dim md:col-span-6 lg:col-span-5"
          >
            {site.description}
          </motion.p>

          <motion.div
            initial={reduced ? false : { y: 20, opacity: 0 }}
            animate={ready ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.55, ease: EASE.out }}
            className="flex flex-wrap items-center gap-4 md:col-span-6 lg:col-span-7"
          >
            <MagneticButton
              onClick={onContact}
              data-cursor="cta"
              className="h-14 bg-ivory px-7 text-[12px] tracking-[0.2em] text-void uppercase"
            >
              Start a project
              <ArrowRight className="ml-3 h-4 w-4" />
            </MagneticButton>
            <MagneticButton
              onClick={onWork}
              data-cursor="hover"
              className="h-14 border border-ivory/25 px-7 text-[12px] tracking-[0.2em] text-ivory uppercase"
            >
              Explore work
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ delay: 0.85, duration: 0.8 }}
          className="mt-16 flex items-center justify-between border-t border-white/10 pt-6"
        >
          <div className="flex items-center gap-3 text-[11px] tracking-[0.2em] text-mute uppercase">
            <span className="relative flex h-2 w-2">
              {!reduced && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
              )}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            {site.availability}
          </div>
          <button
            onClick={onWork}
            className="hidden items-center gap-3 text-[11px] tracking-[0.2em] text-mute uppercase md:flex"
            data-cursor="hover"
          >
            Scroll
            <ArrowDown className="h-3.5 w-3.5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
