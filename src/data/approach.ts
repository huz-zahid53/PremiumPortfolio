export type Step = {
  number: string;
  name: string;
  lead: string;
  body: string;
  activities: string[];
};

export const approach: Step[] = [
  {
    number: "01",
    name: "Discover",
    lead: "Listen before drawing.",
    body: "We learn the product, the people, and the constraints. What exists, what hurts, what must not break. This is interviews, audits, and sitting with the real work — not a deck of assumptions.",
    activities: ["Stakeholder interviews", "Product and site audit", "Audience and context", "Constraint mapping"],
  },
  {
    number: "02",
    name: "Define",
    lead: "Make the problem small enough to solve.",
    body: "We write the brief back to you. Positioning, principles, sitemap or product shape, and a plan that says what we will not do. Alignment here saves months later.",
    activities: ["Positioning", "Experience principles", "IA / product shape", "Phased plan"],
  },
  {
    number: "03",
    name: "Design",
    lead: "Give it a face and a rhythm.",
    body: "Art direction, interface, and prototypes. We design at the fidelity the decision requires — sometimes a spread, sometimes a working flow — and we keep the system tighter than the exploration.",
    activities: ["Art direction", "UI and UX", "Prototypes", "Design system"],
  },
  {
    number: "04",
    name: "Build",
    lead: "Engineer the feeling, not just the layout.",
    body: "Production code with the same decisions as the files. Motion, performance, accessibility, and a CMS or component layer your team can actually live with.",
    activities: ["Frontend engineering", "Motion", "CMS / components", "QA"],
  },
  {
    number: "05",
    name: "Launch",
    lead: "Ship with care.",
    body: "Content, redirects, performance, and a calm release. We stay through the first days in the wild so the work does not meet users alone.",
    activities: ["Launch checklist", "Performance pass", "Handover", "Support window"],
  },
  {
    number: "06",
    name: "Improve",
    lead: "Keep it sharp.",
    body: "After launch we iterate. Not vanity metrics invented for a slide — qualitative signals, real use, and a backlog that respects the original intent.",
    activities: ["Review cadence", "Iteration", "Care retainer", "Next slice"],
  },
];
