import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navigation } from "@/data/navigation";
import { site } from "@/data/site";
import { EASE } from "@/animations/constants";

type Props = {
  open: boolean;
  onClose: () => void;
  onSection: (id: string) => void;
};

export function MobileMenu({ open, onClose, onSection }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-40 flex flex-col bg-void px-6 pt-24 pb-10 md:px-10"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease: EASE.inOut }}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <motion.div
            className="pointer-events-none absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background:
                "radial-gradient(600px 400px at 80% 10%, rgba(212,180,131,0.12), transparent 60%)",
            }}
          />

          <nav className="relative flex flex-1 flex-col justify-center">
            {navigation.map((item, i) => (
              <motion.button
                key={item.id}
                onClick={() => {
                  onSection(item.id);
                  onClose();
                }}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.12 + i * 0.06, duration: 0.6, ease: EASE.out }}
                className="group flex items-baseline justify-between border-b border-white/10 py-4 text-left"
              >
                <span className="font-display text-[clamp(2.4rem,10vw,4.5rem)] leading-none tracking-[-0.04em] text-ivory">
                  {item.label}
                </span>
                <span className="font-sans text-[11px] tracking-[0.2em] text-mute">
                  0{i + 1}
                </span>
              </motion.button>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative mt-8 flex items-end justify-between gap-4"
          >
            <div>
              <p className="text-[11px] tracking-[0.22em] text-mute uppercase">Write</p>
              <a href={`mailto:${site.email}`} className="mt-1 block text-ivory">
                {site.email}
              </a>
            </div>
            <button
              onClick={() => {
                onSection("contact");
                onClose();
              }}
              className="border border-ivory px-5 py-3 text-[11px] tracking-[0.2em] text-ivory uppercase"
            >
              Start a project
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
