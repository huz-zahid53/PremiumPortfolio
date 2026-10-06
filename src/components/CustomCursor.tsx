import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { CursorState } from "@/hooks/useCursor";

type Props = {
  enabled: boolean;
  onApi: (api: { setCursor: (state: CursorState, label?: string) => void }) => void;
};

export function CustomCursor({ enabled, onApi }: Props) {
  const [state, setState] = useState<CursorState>("default");
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);
  const stateRef = useRef(state);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 380, damping: 38, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 380, damping: 38, mass: 0.4 });
  const rx = useSpring(x, { stiffness: 180, damping: 28, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 180, damping: 28, mass: 0.6 });

  useEffect(() => {
    onApi({
      setCursor: (next, nextLabel) => {
        stateRef.current = next;
        setState(next);
        setLabel(nextLabel ?? (next === "view" ? "View" : next === "drag" ? "Drag" : ""));
      },
    });
  }, [onApi]);

  useEffect(() => {
    if (!enabled) return;

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const leave = () => setVisible(false);

    const over = (e: PointerEvent) => {
      const t = (e.target as HTMLElement | null)?.closest?.("[data-cursor]") as HTMLElement | null;
      if (!t) {
        if (stateRef.current !== "default") {
          stateRef.current = "default";
          setState("default");
          setLabel("");
        }
        return;
      }
      const kind = (t.getAttribute("data-cursor") || "hover") as CursorState;
      const custom = t.getAttribute("data-cursor-label") || "";
      stateRef.current = kind;
      setState(kind);
      setLabel(custom || (kind === "view" ? "View" : kind === "drag" ? "Drag" : ""));
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.removeEventListener("mouseleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const expanded = state === "hover" || state === "cta";
  const labeled = state === "view" || state === "drag";

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] hidden lg:block" aria-hidden="true">
      <motion.div
        className="absolute top-0 left-0 h-1.5 w-1.5 rounded-full bg-ivory mix-blend-difference"
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%", opacity: visible ? 1 : 0 }}
      />
      <motion.div
        className="absolute top-0 left-0 flex items-center justify-center rounded-full border border-ivory/40"
        style={{
          x: rx,
          y: ry,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
        animate={{
          width: labeled ? 72 : expanded ? 44 : 28,
          height: labeled ? 72 : expanded ? 44 : 28,
          backgroundColor: labeled ? "rgba(241,238,230,0.92)" : "rgba(0,0,0,0)",
          borderColor: labeled ? "rgba(241,238,230,0.92)" : "rgba(241,238,230,0.35)",
        }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
      >
        {labeled && (
          <span className="font-sans text-[10px] font-medium tracking-[0.18em] text-void uppercase">
            {label}
          </span>
        )}
      </motion.div>
    </div>
  );
}
