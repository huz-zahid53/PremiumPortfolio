import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { SectionHeading } from "@/components/SectionHeading";
import { cn } from "@/utils/cn";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  onOpen: (slug: string) => void;
};

export function FeaturedWork({ onOpen }: Props) {
  return (
    <section id="work" className="relative px-5 pt-28 pb-8 md:px-8 md:pt-36 lg:px-12">
      <div className="mx-auto max-w-[1680px]">
        <div className="mb-16 flex flex-col justify-between gap-8 md:mb-24 md:flex-row md:items-end">
          <SectionHeading
            index="01"
            eyebrow="Selected work"
            title="Projects that had to feel like something."
            className="max-w-3xl"
          />
          <p className="max-w-sm text-sm leading-relaxed text-mute md:pb-2">
            A handful of recent surfaces — products, commerce, culture. Each one is a case study, not a thumbnail.
          </p>
        </div>

        <div className="space-y-28 md:space-y-40">
          {projects.map((p) => (
            <ProjectBlock key={p.slug} project={p} onOpen={onOpen} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectBlock({ project, onOpen }: { project: Project; onOpen: (slug: string) => void }) {
  switch (project.layout) {
    case "full":
      return <Full project={project} onOpen={onOpen} />;
    case "split":
      return <Split project={project} onOpen={onOpen} />;
    case "editorial":
      return <Editorial project={project} onOpen={onOpen} />;
    case "asymmetric":
      return <Asymmetric project={project} onOpen={onOpen} />;
    case "horizontal":
      return <Horizontal project={project} onOpen={onOpen} />;
    default:
      return <Immersive project={project} onOpen={onOpen} />;
  }
}

function Meta({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] tracking-[0.2em] text-mute uppercase">
      <span className="text-gold">{project.number}</span>
      <span>{project.industry}</span>
      <span>{project.year}</span>
    </div>
  );
}

function Full({ project, onOpen }: { project: Project; onOpen: (slug: string) => void }) {
  return (
    <article>
      <button onClick={() => onOpen(project.slug)} className="group block w-full text-left" data-cursor="view">
        <ImageReveal src={project.image} alt={`${project.title} — ${project.industry}`} className="aspect-[16/9] md:aspect-[16/7.2]" />
        <div className="mt-8 grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Meta project={project} />
            <h3 className="mt-4 font-display text-[clamp(2.6rem,5vw,5.2rem)] leading-[0.9] tracking-[-0.04em] text-ivory">
              {project.title}
            </h3>
          </div>
          <div className="md:col-span-5">
            <p className="text-[15px] leading-relaxed text-mute">{project.summary}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-[12px] tracking-[0.18em] text-ivory uppercase">
              View case
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
          </div>
        </div>
      </button>
    </article>
  );
}

function Split({ project, onOpen }: { project: Project; onOpen: (slug: string) => void }) {
  return (
    <article className="grid items-center gap-10 lg:grid-cols-12">
      <button
        onClick={() => onOpen(project.slug)}
        data-cursor="view"
        className="group lg:col-span-7"
      >
        <ImageReveal src={project.image} alt={`${project.title} — ${project.industry}`} className="aspect-[4/5] md:aspect-[5/4] lg:aspect-[4/5]" />
      </button>
      <div className="lg:col-span-5 lg:pl-8">
        <Meta project={project} />
        <h3 className="mt-5 font-display text-[clamp(2.4rem,4vw,4.4rem)] leading-[0.9] tracking-[-0.04em] text-ivory">
          {project.title}
        </h3>
        <p className="mt-6 text-[15px] leading-relaxed text-mute">{project.summary}</p>
        <p className="mt-4 text-sm text-ivory/80">{project.built}</p>
        <button
          onClick={() => onOpen(project.slug)}
          data-cursor="view"
          className="group mt-8 inline-flex items-center gap-2 text-[12px] tracking-[0.18em] text-ivory uppercase"
        >
          View case
          <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </button>
      </div>
    </article>
  );
}

function Editorial({ project, onOpen }: { project: Project; onOpen: (slug: string) => void }) {
  return (
    <article className="relative">
      <p className="pointer-events-none absolute -top-10 left-0 font-display text-[clamp(5rem,18vw,16rem)] leading-none tracking-[-0.07em] text-ivory/[0.04] select-none">
        {project.title}
      </p>
      <div className="grid items-end gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Meta project={project} />
          <h3 className="mt-5 font-display text-[clamp(2.8rem,6vw,6rem)] leading-[0.86] tracking-[-0.05em] text-ivory">
            {project.title}
          </h3>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-mute">{project.challenge}</p>
        </div>
        <button
          onClick={() => onOpen(project.slug)}
          data-cursor="view"
          className="group lg:col-span-7"
        >
          <ImageReveal src={project.image} alt={`${project.title} — ${project.industry}`} className="aspect-[16/10]" />
        </button>
      </div>
    </article>
  );
}

function Asymmetric({ project, onOpen }: { project: Project; onOpen: (slug: string) => void }) {
  return (
    <article className="grid gap-8 lg:grid-cols-12">
      <div className="flex flex-col justify-between lg:col-span-4 lg:py-8">
        <div>
          <Meta project={project} />
          <h3 className="mt-5 font-display text-[clamp(2.4rem,4vw,4rem)] leading-[0.9] tracking-[-0.04em] text-ivory">
            {project.title}
          </h3>
        </div>
        <div className="mt-8">
          <p className="text-[15px] leading-relaxed text-mute">{project.summary}</p>
          <button
            onClick={() => onOpen(project.slug)}
            data-cursor="view"
            className="group mt-6 inline-flex items-center gap-2 text-[12px] tracking-[0.18em] text-ivory uppercase"
          >
            View case
            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
      <button onClick={() => onOpen(project.slug)} data-cursor="view" className="group lg:col-span-8">
        <ImageReveal src={project.image} alt={`${project.title} — ${project.industry}`} className="aspect-[16/11]" />
      </button>
    </article>
  );
}

function Horizontal({ project, onOpen }: { project: Project; onOpen: (slug: string) => void }) {
  return (
    <article>
      <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <Meta project={project} />
          <h3 className="mt-4 font-display text-[clamp(2.4rem,5vw,4.8rem)] leading-[0.9] tracking-[-0.04em] text-ivory">
            {project.title}
          </h3>
        </div>
        <p className="max-w-md text-[15px] leading-relaxed text-mute">{project.summary}</p>
      </div>
      <button onClick={() => onOpen(project.slug)} data-cursor="view" className="group block w-full">
        <ImageReveal src={project.image} alt={`${project.title} — ${project.industry}`} className="aspect-[21/9] min-h-[240px]" />
      </button>
    </article>
  );
}

function Immersive({ project, onOpen }: { project: Project; onOpen: (slug: string) => void }) {
  return (
    <article className="relative overflow-hidden">
      <button onClick={() => onOpen(project.slug)} data-cursor="view" className="group relative block w-full">
        <ImageReveal src={project.image} alt={`${project.title} — ${project.industry}`} className="aspect-[16/9] md:aspect-[16/8]" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent" />
        <div className="absolute right-6 bottom-6 left-6 md:right-12 md:bottom-12 md:left-12">
          <Meta project={project} />
          <h3 className="mt-4 font-display text-[clamp(2.6rem,6vw,6rem)] leading-[0.88] tracking-[-0.05em] text-ivory">
            {project.title}
          </h3>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-ivory/75">{project.summary}</p>
        </div>
      </button>
    </article>
  );
}

function ImageReveal({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    const el = wrap.current;
    if (!el || reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { clipPath: "inset(14% 10% 14% 10%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.25,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <div ref={wrap} className={cn("relative overflow-hidden bg-void-3", className)}>
      <img src={src} alt={alt} className="project-img h-full w-full object-cover" />
    </div>
  );
}
