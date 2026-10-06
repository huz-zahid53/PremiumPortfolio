import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/utils/cn";
import { MAGNETIC } from "@/animations/constants";

type Props = {
  children: ReactNode;
  className?: string;
  magnetic?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  "aria-label"?: string;
  "data-cursor"?: string;
};

export function MagneticButton({
  children,
  className,
  magnetic = true,
  type = "button",
  onClick,
  disabled,
  ...rest
}: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 280, damping: 22, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 280, damping: 22, mass: 0.4 });

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!magnetic || window.matchMedia("(pointer: coarse)").matches) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set(Math.max(-MAGNETIC.max, Math.min(MAGNETIC.max, dx * MAGNETIC.strength)));
    y.set(Math.max(-MAGNETIC.max, Math.min(MAGNETIC.max, dy * MAGNETIC.strength)));
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={cn("relative inline-flex items-center justify-center", className)}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
