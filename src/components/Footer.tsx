import { navigation } from "@/data/navigation";
import { site } from "@/data/site";
import { Logo } from "./Logo";

type Props = {
  onSection: (id: string) => void;
  onHome: () => void;
};

export function Footer({ onSection, onHome }: Props) {
  return (
    <footer className="relative border-t border-white/10 bg-void px-5 pt-20 pb-8 md:px-8 lg:px-12">
      <div className="mx-auto max-w-[1680px]">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <button
              onClick={onHome}
              className="text-ivory"
              data-cursor="hover"
              aria-label="ORRA home"
            >
              <Logo className="text-3xl md:text-4xl" markClassName="h-7 w-7" />
            </button>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-mute">{site.short}</p>
          </div>

          <div className="md:col-span-3">
            <p className="text-[11px] tracking-[0.22em] text-gold uppercase">Navigate</p>
            <ul className="mt-5 space-y-2">
              {navigation.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onSection(item.id)}
                    className="text-ivory/85 transition-colors hover:text-gold"
                    data-cursor="hover"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="text-[11px] tracking-[0.22em] text-gold uppercase">Contact</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-5 block text-xl text-ivory md:text-2xl"
              data-cursor="hover"
            >
              {site.email}
            </a>
            <p className="mt-4 text-sm text-mute">{site.availability}</p>
            <p className="mt-2 text-sm text-mute">Working remotely with teams worldwide.</p>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-[11px] tracking-[0.16em] text-mute uppercase sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <span className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Designed & built with intent
          </span>
        </div>
      </div>
    </footer>
  );
}
