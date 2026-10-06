import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navigation, serviceNav } from "@/data/navigation";
import { cn } from "@/utils/cn";
import { EASE } from "@/animations/constants";
import { MagneticButton } from "./MagneticButton";
import { Logo } from "./Logo";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type Props = {
  onSection: (id: string) => void;
  onHome: () => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
};

export function Header({ onSection, onHome, menuOpen, setMenuOpen }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 899px)");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-[background,border-color] duration-500",
        scrolled || menuOpen ? "nav-glass border-b border-white/5" : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-[1680px] items-center justify-between px-5 md:px-8 lg:px-12">
        <button
          onClick={onHome}
          className="text-[15px] text-ivory"
          data-cursor="hover"
          aria-label="ORRA home"
        >
          <Logo />
        </button>

        {!isMobile && (
          <nav className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-8">
            {navigation.map((item) =>
              item.id === "services" ? (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button
                    onClick={() => onSection(item.id)}
                    className="font-sans text-[11px] tracking-[0.22em] text-ivory/80 uppercase transition-colors hover:text-ivory"
                    data-cursor="hover"
                    aria-expanded={servicesOpen}
                    aria-haspopup="true"
                  >
                    {item.label}
                  </button>
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: 6, filter: "blur(6px)" }}
                        transition={{ duration: 0.35, ease: EASE.out }}
                        className="absolute top-[calc(100%+18px)] left-1/2 w-[340px] -translate-x-1/2 overflow-hidden border border-white/10 bg-void-2/95 p-5 shadow-2xl backdrop-blur-xl"
                      >
                        <p className="mb-4 text-[10px] tracking-[0.24em] text-gold uppercase">Capabilities</p>
                        <ul className="space-y-1">
                          {serviceNav.map((s, i) => (
                            <motion.li
                              key={s.label}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.04 * i, duration: 0.35, ease: EASE.out }}
                            >
                              <button
                                onClick={() => {
                                  setServicesOpen(false);
                                  onSection("services");
                                }}
                                className="group flex w-full items-baseline justify-between gap-4 py-2 text-left"
                                data-cursor="hover"
                              >
                                <span className="font-display text-lg tracking-tight text-ivory transition-colors group-hover:text-gold">
                                  {s.label}
                                </span>
                                <span className="text-[11px] text-mute">{s.note}</span>
                              </button>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  key={item.id}
                  onClick={() => onSection(item.id)}
                  className="font-sans text-[11px] tracking-[0.22em] text-ivory/80 uppercase transition-colors hover:text-ivory"
                  data-cursor="hover"
                >
                  {item.label}
                </button>
              ),
            )}
          </nav>
        )}

        <div className="flex items-center gap-4">
          {!isMobile && (
            <MagneticButton
              onClick={() => onSection("contact")}
              data-cursor="cta"
              className="group h-10 overflow-hidden border border-ivory/20 px-5 text-[11px] tracking-[0.22em] text-ivory uppercase"
            >
              <span className="relative">
                <span className="block transition-transform duration-500 group-hover:-translate-y-[120%]">
                  Start a project
                </span>
                <span className="absolute inset-0 translate-y-[120%] transition-transform duration-500 group-hover:translate-y-0">
                  Start a project
                </span>
              </span>
            </MagneticButton>
          )}

          {isMobile && (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative flex h-10 w-10 items-center justify-center"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <span className="sr-only">{menuOpen ? "Close" : "Menu"}</span>
              <span className="relative block h-3 w-6">
                <span
                  className={cn(
                    "absolute top-0 left-0 h-px w-full bg-ivory transition-transform duration-400",
                    menuOpen && "translate-y-[5.5px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-px w-full bg-ivory transition-transform duration-400",
                    menuOpen && "-translate-y-[5.5px] -rotate-45",
                  )}
                />
              </span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
