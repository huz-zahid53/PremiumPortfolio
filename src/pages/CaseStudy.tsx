import { useEffect, useLayoutEffect, useRef } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getNextProject, getProject } from "@/data/projects";
import { Footer } from "@/components/Footer";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  slug: string;
  onBack: () => void;
  onOpen: (slug: string) => void;
  onSection: (id: string) => void;
  onHome: () => void;
};

export function CaseStudy({ slug, onBack, onOpen, onSection, onHome }: Props) {
  const project = getProject(slug);
  const next = getNextProject(slug);
  const reduced = useReducedMotion();
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    document.title = project ? `${project.title} — ORRA` : "ORRA";
    return () => {
      document.title = "ORRA — Digital Design & Creative Development";
    };
  }, [project]);

  useLayoutEffect(() => {
    const img = imgRef.current;
    if (!img || reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        img,
        { scale: 1.08 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: img, start: "top top", end: "bottom top", scrub: 0.6 },
        },
      );
    });
    return () => ctx.revert();
  }, [reduced, slug]);

  if (!project) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center px-6">
        <p className="text-mute">That project could not be found.</p>
        <button onClick={onBack} className="mt-6 text-ivory underline underline-offset-4">
          Back to work
        </button>
      </main>
    );
  }

  const blocks = [
    { n: "01", t: "Overview", b: project.summary },
    { n: "02", t: "The challenge", b: project.challenge },
    { n: "03", t: "Objectives", list: project.objectives },
    { n: "04", t: "Strategy", b: project.strategy },
    { n: "05", t: "Design", b: project.design },
    { n: "06", t: "Development", b: project.development },
    { n: "07", t: "Interaction", b: project.interaction },
    { n: "08", t: "Result", b: project.result },
  ];

  return (
    <main className="pt-[72px]">
      <div className="px-5 py-8 md:px-8 lg:px-12">
        <div className="mx-auto max-w-[1680px]">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-[12px] tracking-[0.18em] text-mute uppercase hover:text-ivory"
            data-cursor="hover"
          >
            <ArrowLeft className="h-4 w-4" />
            All work
          </button>

          <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <p className="text-[11px] tracking-[0.24em] text-gold uppercase">
                {project.number} — {project.industry}
              </p>
              <h1 className="mt-4 font-display text-[clamp(3.2rem,8vw,8rem)] leading-[0.86] tracking-[-0.05em] text-ivory">
                {project.title}
              </h1>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-mute md:col-span-4">{project.built}</p>
          </div>
        </div>
      </div>

      <div className="overflow-hidden">
        <img
          ref={imgRef}
          src={project.image}
          alt={`${project.title} visual`}
          className="h-[58vh] w-full object-cover md:h-[78vh]"
        />
      </div>

      <div className="px-5 py-16 md:px-8 md:py-24 lg:px-12">
        <div className="mx-auto max-w-[1680px]">
          <dl className="grid gap-8 border-y border-white/10 py-8 sm:grid-cols-3">
            <div>
              <dt className="text-[11px] tracking-[0.2em] text-mute uppercase">Industry</dt>
              <dd className="mt-2 text-ivory">{project.industry}</dd>
            </div>
            <div>
              <dt className="text-[11px] tracking-[0.2em] text-mute uppercase">Year</dt>
              <dd className="mt-2 text-ivory">{project.year}</dd>
            </div>
            <div>
              <dt className="text-[11px] tracking-[0.2em] text-mute uppercase">Services</dt>
              <dd className="mt-2 text-ivory">{project.services.join(" · ")}</dd>
            </div>
          </dl>

          <div className="mt-20 space-y-20 md:space-y-28">
            {blocks.map((block) => (
              <section key={block.n} className="grid gap-6 md:grid-cols-12">
                <div className="md:col-span-4">
                  <p className="text-[11px] tracking-[0.22em] text-gold">{block.n}</p>
                  <h2 className="mt-3 font-display text-3xl tracking-tight text-ivory md:text-4xl">
                    {block.t}
                  </h2>
                </div>
                <div className="md:col-span-7 md:col-start-6">
                  {"list" in block && block.list ? (
                    <ol className="space-y-3">
                      {block.list.map((item, i) => (
                        <li key={item} className="flex gap-4 text-[16px] leading-relaxed text-ivory-dim">
                          <span className="text-gold">0{i + 1}</span>
                          {item}
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p className="text-[16px] leading-relaxed text-ivory-dim">{block.b}</p>
                  )}
                </div>
              </section>
            ))}

            <section className="grid gap-6 border-t border-white/10 pt-16 md:grid-cols-12">
              <div className="md:col-span-4">
                <p className="text-[11px] tracking-[0.22em] text-gold">09</p>
                <h2 className="mt-3 font-display text-3xl tracking-tight text-ivory md:text-4xl">
                  Technology
                </h2>
              </div>
              <div className="flex flex-wrap gap-2 md:col-span-7 md:col-start-6">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="border border-white/15 px-4 py-2 text-[12px] tracking-[0.16em] text-ivory uppercase"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </section>
          </div>

          <div className="mt-24 overflow-hidden">
            <img src={project.secondary} alt="" className="h-[42vh] w-full object-cover md:h-[56vh]" />
          </div>
        </div>
      </div>

      <section className="border-t border-white/10 px-5 py-20 md:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1680px] flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="text-[11px] tracking-[0.22em] text-gold uppercase">10 — Next project</p>
            <h2 className="mt-4 font-display text-[clamp(2.4rem,5vw,5rem)] tracking-[-0.04em] text-ivory">
              {next.title}
            </h2>
            <p className="mt-3 text-sm text-mute">{next.industry}</p>
          </div>
          <button
            onClick={() => onOpen(next.slug)}
            data-cursor="view"
            className="group inline-flex items-center gap-3 text-[12px] tracking-[0.2em] text-ivory uppercase"
          >
            Continue
            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </div>
        <button onClick={() => onOpen(next.slug)} data-cursor="view" className="mx-auto mt-10 block max-w-[1680px]">
          <img src={next.image} alt="" className="h-[36vh] w-full object-cover md:h-[48vh]" />
        </button>
      </section>

      <Footer onSection={onSection} onHome={onHome} />
    </main>
  );
}
