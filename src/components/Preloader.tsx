import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DURATION, EASE } from "@/animations/constants";
import { Logo } from "./Logo";

type Props = {
  reduced: boolean;
  onDone: () => void;
};

export function Preloader({ reduced, onDone }: Props) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (reduced) {
      setProgress(100);
      const t = window.setTimeout(() => {
        setGone(true);
        onDone();
      }, 180);
      return () => window.clearTimeout(t);
    }

    let raf = 0;
    const start = performance.now();
    const duration = DURATION.preloader * 1000;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setLeaving(true);
        window.setTimeout(() => {
          setGone(true);
          onDone();
        }, 620);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone, reduced]);

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-void px-6 py-8 md:px-10"
          initial={{ y: "0%" }}
          animate={{ y: leaving ? "-100%" : "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: EASE.inOut }}
          role="status"
          aria-live="polite"
          aria-label="Loading"
        >
          <div className="flex items-center justify-between">
            <Logo className="text-sm text-ivory" />
            <span className="font-sans text-xs tracking-[0.22em] text-mute uppercase">
              {String(progress).padStart(3, "0")}
            </span>
          </div>

          <div className="flex flex-1 items-center">
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, ease: EASE.out, delay: 0.05 }}
                className="font-display text-[clamp(2.4rem,8vw,7rem)] leading-[0.9] tracking-[-0.04em] text-ivory"
              >
                Loading
                <span className="text-gold">.</span>
              </motion.p>
            </div>
          </div>

          <div>
            <div className="h-px w-full bg-line-strong">
              <div
                className="progress-line h-px bg-gold"
                style={{ transform: `scaleX(${progress / 100})` }}
              />
            </div>
            <div className="mt-4 flex items-center justify-between font-sans text-[11px] tracking-[0.22em] text-mute uppercase">
              <span>Design + development</span>
              <span>Please wait</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
