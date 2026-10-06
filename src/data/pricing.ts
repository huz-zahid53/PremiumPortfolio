export type PricingTier = {
  number: string;
  name: string;
  from: string;
  cadence: string;
  description: string;
  includes: string[];
  bestFor: string;
  cta: string;
};

export const pricingNote =
  "Figures are indicative starting points, not a public rate card. Every engagement is scoped from the actual work. If a number here is useful, treat it as orientation — we will quote from a brief, not from this page.";

export const pricing: PricingTier[] = [
  {
    number: "01",
    name: "Presence",
    from: "18",
    cadence: "k",
    description:
      "A considered website for a brand that needs to look and feel like itself. Art direction, design, and a production frontend — not a theme with better type.",
    includes: [
      "Discovery and sitemap",
      "Art direction and UI",
      "Custom build",
      "CMS for the pages you will actually edit",
      "Launch support",
    ],
    bestFor: "Studios, houses, and teams replacing a site that no longer represents them.",
    cta: "Start a site",
  },
  {
    number: "02",
    name: "Product",
    from: "42",
    cadence: "k",
    description:
      "A digital product or a substantial web platform. Research through interface through production. Built to be used every day, not launched once.",
    includes: [
      "Product framing",
      "UX and UI",
      "Design system foundations",
      "Production frontend",
      "Handover to your team",
    ],
    bestFor: "Founders and product teams who need a serious first version, or a redesign that holds.",
    cta: "Start a product",
  },
  {
    number: "03",
    name: "Partnership",
    from: "8",
    cadence: "k / mo",
    description:
      "An ongoing design and development cadence. We stay inside the work — shipping, refining, and protecting quality as the product moves.",
    includes: [
      "Reserved monthly capacity",
      "Design and frontend",
      "Iteration against a living backlog",
      "Direct collaboration",
    ],
    bestFor: "Teams who want a senior studio in the loop after launch.",
    cta: "Discuss a retainer",
  },
];
