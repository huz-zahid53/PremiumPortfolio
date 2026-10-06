import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Options = {
  enabled: boolean;
  stopped?: boolean;
};

export function useLenis({ enabled, stopped = false }: Options) {
  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.4,
      autoRaf: false,
    });

    window.__lenis = lenis;

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      gsap.ticker.remove(ticker);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, [enabled]);

  useEffect(() => {
    const lenis = window.__lenis;
    if (!lenis) return;
    if (stopped) lenis.stop();
    else lenis.start();
  }, [stopped, enabled]);
}

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(el, { offset: 0, duration: 1.15 });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function scrollToTop() {
  const lenis = window.__lenis;
  if (lenis) lenis.scrollTo(0, { immediate: true });
  else window.scrollTo({ top: 0, behavior: "auto" });
}
