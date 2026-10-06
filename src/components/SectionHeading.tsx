import { cn } from "@/utils/cn";
import { Reveal } from "./Reveal";

type Props = {
  index?: string;
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({ index, eyebrow, title, body, align = "left", className }: Props) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      <Reveal>
        <div className="mb-6 flex items-center gap-4 text-[11px] tracking-[0.28em] text-gold uppercase">
          {index && <span className="font-medium">{index}</span>}
          {index && eyebrow && <span className="h-px w-8 bg-gold/50" />}
          {eyebrow && <span>{eyebrow}</span>}
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="font-display text-[clamp(2.4rem,5.4vw,5.6rem)] leading-[0.92] tracking-[-0.04em] text-ivory text-balance">
          {title}
        </h2>
      </Reveal>
      {body && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "mt-6 max-w-xl text-[15px] leading-relaxed text-mute text-pretty",
              align === "center" && "mx-auto",
            )}
          >
            {body}
          </p>
        </Reveal>
      )}
    </div>
  );
}
