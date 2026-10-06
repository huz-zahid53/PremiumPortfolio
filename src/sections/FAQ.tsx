import { FAQAccordion } from "@/components/FAQAccordion";
import { SectionHeading } from "@/components/SectionHeading";

export function FAQ() {
  return (
    <section id="faq" className="relative px-5 pt-28 pb-24 md:px-8 md:pt-36 lg:px-12">
      <div className="mx-auto max-w-[1680px]">
        <div className="mb-14 grid gap-10 md:grid-cols-12">
          <SectionHeading
            index="05"
            eyebrow="Questions"
            title="Before you write."
            className="md:col-span-7"
          />
          <p className="max-w-sm text-sm leading-relaxed text-mute md:col-span-5 md:pt-16">
            Practical answers. If yours is not here, the form is.
          </p>
        </div>
        <FAQAccordion />
      </div>
    </section>
  );
}
