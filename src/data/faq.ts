export type FAQ = {
  number: string;
  category: string;
  question: string;
  answer: string;
};

export const faqs: FAQ[] = [
  {
    number: "01",
    category: "Process",
    question: "How does an engagement start?",
    answer:
      "Send a note through the form or write to hello@orra.studio with context: what you are making, where it hurts, and any timing constraints. If it looks like a fit, we schedule a conversation. If it does not, we will say so. We then follow with a written proposal — scope, sequence, and fee — before any work begins.",
  },
  {
    number: "02",
    category: "Fit",
    question: "Who is this studio for?",
    answer:
      "Teams who care how their product or site feels, and who want design and development in the same conversation. We work well with founders, design-led companies, cultural organisations, and in-house teams who need a focused studio alongside them. We are a poor fit for volume lead-gen, marketplace templates, or work that must look like everyone else.",
  },
  {
    number: "03",
    category: "Time",
    question: "How long does a project take?",
    answer:
      "A considered marketing site is often eight to fourteen weeks. A product or platform is longer, and is usually phased. Partnerships run month to month after a starting period. Timelines are written into the proposal and depend on feedback speed, content, and how decided the problem already is.",
  },
  {
    number: "04",
    category: "Collaboration",
    question: "Do you work with existing teams?",
    answer:
      "Yes. Many engagements sit beside an internal designer, engineer, or founder. We can lead, pair, or take a defined slice — design only, frontend only, or a motion layer on a product you already have. We are used to joining mid-stream, provided the constraints are honest.",
  },
  {
    number: "05",
    category: "Pricing",
    question: "Are the prices on this site fixed?",
    answer:
      "No. They are indicative starting points so you can tell whether a conversation is worth having. The actual fee comes from the brief: surface area, craft, timeline, and whether we are designing, building, or both. If the scope is smaller, the number comes down. If it is a product with real complexity, it will not fit the lowest figure on the page.",
  },
  {
    number: "06",
    category: "Practical",
    question: "What do you need from us to begin?",
    answer:
      "A clear owner on your side, access to the current product or site, and the decision-makers in the room for the first conversations. Brand assets help. A finished brief is not required — writing that together is often part of the work. Content can follow, but it should not be a surprise at week eight.",
  },
  {
    number: "07",
    category: "Craft",
    question: "Do you always use 3D, motion, and custom interaction?",
    answer:
      "No. Those tools are used when they serve the story and the performance budget. A quiet editorial site should not carry a WebGL scene it does not need. We would rather a fast, precise interface than a decorated one.",
  },
  {
    number: "08",
    category: "After",
    question: "What happens after launch?",
    answer:
      "Handover includes the codebase, the system, and a working session with whoever will own it. If you want us to stay, we shift into a care retainer: iteration, maintenance, and new slices without restarting the relationship. If you do not, the work is yours.",
  },
];
