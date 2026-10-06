import { cn } from "@/utils/cn";

type Props = {
  className?: string;
  markClassName?: string;
};

export function Logo({ className, markClassName }: Props) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <svg
        viewBox="0 0 20 20"
        className={cn("h-[18px] w-[18px] text-gold", markClassName)}
        fill="none"
        aria-hidden="true"
      >
        <circle cx="10" cy="10" r="7.4" stroke="currentColor" strokeWidth="1.2" />
        <path d="M10 4.2v11.6" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      <span className="font-display tracking-[0.34em]">ORRA</span>
    </span>
  );
}
