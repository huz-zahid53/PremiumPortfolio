import { ContactForm } from "@/components/ContactForm";
import { site } from "@/data/site";
import { SectionHeading } from "@/components/SectionHeading";

export function Contact() {
  return (
    <section id="contact" className="relative px-5 pt-28 pb-28 md:px-8 md:pt-36 lg:px-12">
      <div className="mx-auto grid max-w-[1680px] gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            index="06"
            eyebrow="Contact"
            title="Tell us what you are making."
            body="A few sentences are enough. Context, timing, and what ‘good’ looks like. We reply to work that feels like a fit — and we will say so if it does not."
          />
          <div className="mt-12 space-y-6 border-t border-white/10 pt-8">
            <div>
              <p className="text-[11px] tracking-[0.22em] text-gold uppercase">Email</p>
              <a
                href={`mailto:${site.email}`}
                className="mt-2 block text-xl text-ivory"
                data-cursor="hover"
              >
                {site.email}
              </a>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.22em] text-gold uppercase">Availability</p>
              <p className="mt-2 text-ivory">{site.availability}</p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 lg:pt-10">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
