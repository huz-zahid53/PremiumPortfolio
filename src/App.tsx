import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Preloader } from "@/components/Preloader";
import { Header } from "@/components/Header";
import { MobileMenu } from "@/components/MobileMenu";
import { CustomCursor } from "@/components/CustomCursor";
import { Grain } from "@/components/Grain";
import { Home } from "@/pages/Home";
import { CaseStudy } from "@/pages/CaseStudy";
import { useHashRoute } from "@/hooks/useHashRoute";
import { useLenis } from "@/hooks/useLenis";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { CursorContext, type CursorApi, type CursorState } from "@/hooks/useCursor";
import { EASE } from "@/animations/constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const reduced = useReducedMotion();
  const isTouch = useMediaQuery("(pointer: coarse)");
  const isNarrow = useMediaQuery("(max-width: 899px)");
  const { route, openProject, goHome, goSection } = useHashRoute();
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cursorApi, setCursorApi] = useState<CursorApi>({ setCursor: () => {} });
  const handleReady = useCallback(() => setReady(true), []);

  const cursorEnabled = ready && !reduced && !isTouch && !isNarrow;

  useLenis({ enabled: ready && !reduced, stopped: menuOpen });

  useEffect(() => {
    document.documentElement.classList.toggle("has-custom-cursor", cursorEnabled);
    return () => document.documentElement.classList.remove("has-custom-cursor");
  }, [cursorEnabled]);

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "ORRA",
      description:
        "ORRA is a design and development studio. We create websites, products, and digital experiences with editorial precision and technical depth.",
      url: "https://orra.studio/",
      email: "hello@orra.studio",
      areaServed: "Worldwide",
      serviceType: ["Digital design", "Web development", "Creative development"],
    });
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => window.clearTimeout(t);
  }, [ready, route]);

  const onCursorApi = useCallback((api: CursorApi) => {
    setCursorApi(api);
  }, []);

  const ctx = useMemo(
    () => ({
      setCursor: (state: CursorState, label?: string) => cursorApi.setCursor(state, label),
    }),
    [cursorApi],
  );

  return (
    <CursorContext.Provider value={ctx}>
      <div className="min-h-screen bg-void text-ivory">
        <a
          href="#work"
          className="fixed top-4 left-4 z-[120] -translate-y-24 bg-ivory px-4 py-2 text-sm text-void transition-transform focus:translate-y-0"
        >
          Skip to work
        </a>
        <Preloader reduced={reduced} onDone={handleReady} />
        <Grain />
        <CustomCursor enabled={cursorEnabled} onApi={onCursorApi} />
        <Header
          onSection={goSection}
          onHome={() => goHome()}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} onSection={goSection} />

        <AnimatePresence mode="wait">
          {route.view === "home" ? (
            <Home
              key="home"
              ready={ready}
              onOpen={openProject}
              onSection={goSection}
              onHome={() => goHome()}
            />
          ) : (
            <motion.div
              key={route.slug}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE.out }}
            >
              <CaseStudy
                slug={route.slug}
                onBack={() => goHome("work")}
                onOpen={openProject}
                onSection={goSection}
                onHome={() => goHome()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </CursorContext.Provider>
  );
}
