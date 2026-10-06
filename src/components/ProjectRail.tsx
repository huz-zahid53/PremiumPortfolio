import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { projects, type Project } from "@/data/projects";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Props = {
  onOpen: (slug: string) => void;
};

export function ProjectRail({ onOpen }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const items = Array.from(track.children) as HTMLElement[];
    if (items.length === 0) return;

    let x = 0;
    let vel = 0;
    let dragging = false;
    let last = 0;
    let raf = 0;
    let half = 0;

    const measure = () => {
      half = track.scrollWidth / 2;
    };
    measure();

    const apply = () => {
      if (half > 0) {
        if (x <= -half) x += half;
        if (x > 0) x -= half;
      }
      track.style.transform = `translate3d(${x}px,0,0)`;
    };

    const tick = () => {
      if (!dragging) {
        x -= 0.45 + vel;
        vel *= 0.95;
      }
      apply();
      raf = requestAnimationFrame(tick);
    };

    if (!reduced) raf = requestAnimationFrame(tick);

    const down = (e: PointerEvent) => {
      dragging = true;
      last = e.clientX;
      vel = 0;
      wrap.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - last;
      last = e.clientX;
      x += dx;
      vel = -dx * 0.2;
      apply();
    };
    const up = (e: PointerEvent) => {
      dragging = false;
      try {
        wrap.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    };

    wrap.addEventListener("pointerdown", down);
    wrap.addEventListener("pointermove", move);
    wrap.addEventListener("pointerup", up);
    wrap.addEventListener("pointercancel", up);
    window.addEventListener("resize", measure);

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY) && Math.abs(e.deltaY) < 8) return;
      x -= e.deltaX + e.deltaY * 0.4;
      apply();
    };
    wrap.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      wrap.removeEventListener("pointerdown", down);
      wrap.removeEventListener("pointermove", move);
      wrap.removeEventListener("pointerup", up);
      wrap.removeEventListener("pointercancel", up);
      wrap.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", measure);
      gsap.set(track, { clearProps: "transform" });
    };
  }, [reduced]);

  const loop = [...projects, ...projects];

  return (
    <section className="relative py-10 md:py-16" aria-label="Project rail">
      <div className="mb-8 flex items-end justify-between px-5 md:px-8 lg:px-12">
        <p className="text-[11px] tracking-[0.24em] text-gold uppercase">All selected work</p>
        <p className="hidden text-[11px] tracking-[0.2em] text-mute uppercase md:block">Drag — or scroll sideways</p>
      </div>
      <div
        ref={wrapRef}
        data-cursor="drag"
        className="cursor-grab overflow-hidden active:cursor-grabbing"
      >
        <div ref={trackRef} className="flex w-max gap-4 will-change-transform px-5 md:gap-6 md:px-8">
          {loop.map((p, i) => (
            <RailCard key={`${p.slug}-${i}`} project={p} onOpen={onOpen} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RailCard({ project, onOpen }: { project: Project; onOpen: (slug: string) => void }) {
  return (
    <button
      onClick={() => onOpen(project.slug)}
      data-cursor="view"
      className="group w-[72vw] shrink-0 text-left sm:w-[420px]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-void-3">
        <img
          src={project.image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent opacity-80" />
        <div className="absolute right-4 bottom-4 left-4 flex items-end justify-between">
          <div>
            <p className="text-[10px] tracking-[0.22em] text-gold uppercase">{project.industry}</p>
            <p className="mt-1 font-display text-2xl tracking-tight text-ivory">{project.title}</p>
          </div>
          <span className="text-[11px] tracking-[0.18em] text-ivory/70">{project.number}</span>
        </div>
      </div>
    </button>
  );
}
