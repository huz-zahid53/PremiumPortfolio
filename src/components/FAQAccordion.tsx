import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { faqs } from "@/data/faq";
import { cn } from "@/utils/cn";
import { EASE } from "@/animations/constants";

export function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen((c) => (c === i ? null : i));
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(Math.min(faqs.length - 1, i + 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setOpen(Math.max(0, i - 1));
    }
  };

  return (
    <div className="divide-y divide-white/10 border-y border-white/10">
      {faqs.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.number}>
            <h3>
              <button
                className="flex w-full items-start gap-6 py-6 text-left md:py-8"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                onKeyDown={(e) => onKey(e, i)}
                data-cursor="hover"
              >
                <span className="w-10 shrink-0 font-sans text-[11px] tracking-[0.2em] text-gold">
                  {item.number}
                </span>
                <span className="flex-1">
                  <span className="mb-2 block text-[10px] tracking-[0.22em] text-mute uppercase">
                    {item.category}
                  </span>
                  <span className="font-display text-[clamp(1.35rem,2.4vw,2rem)] leading-tight tracking-[-0.03em] text-ivory">
                    {item.question}
                  </span>
                </span>
                <span
                  className={cn(
                    "mt-1 flex h-8 w-8 shrink-0 items-center justify-center border border-white/15 text-ivory transition-transform duration-400",
                    isOpen && "rotate-45",
                  )}
                  aria-hidden
                >
                  +
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE.out }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pr-12 pb-8 pl-16 text-[15px] leading-relaxed text-mute md:pl-[4.5rem]">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
