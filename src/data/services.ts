export type Service = {
  number: string;
  name: string;
  id: string;
  description: string;
  capabilities: string[];
  deliverables: string[];
  engagement: string;
  tech: string[];
};

export const services: Service[] = [
  {
    number: "01",
    name: "Strategy",
    id: "strategy",
    description:
      "Before screens, we get the story, the audience, and the constraints into one frame. Strategy here is practical: what to build, what to refuse, and how the work should feel.",
    capabilities: [
      "Product and web positioning",
      "Information architecture",
      "Experience principles",
      "Content structure",
      "Roadmapping",
    ],
    deliverables: ["Positioning brief", "Sitemap / IA", "Experience principles", "Phased plan"],
    engagement: "Often the first two to four weeks of a project, or a standalone sprint.",
    tech: ["Workshops", "Research synthesis", "Prototyping"],
  },
  {
    number: "02",
    name: "UX / UI Design",
    id: "design",
    description:
      "Interfaces with editorial discipline. We design products and websites that are easy to read, easy to use, and particular in their details — not a library of generic cards.",
    capabilities: [
      "User flows and wireframes",
      "Visual and interface design",
      "Design systems",
      "Prototyping",
      "Responsive art direction",
    ],
    deliverables: ["Flows", "High-fidelity UI", "Component system", "Prototype"],
    engagement: "Core of most engagements, in close loop with development.",
    tech: ["Figma", "Prototyping", "Design tokens"],
  },
  {
    number: "03",
    name: "Web Development",
    id: "web",
    description:
      "Production frontends with the same care as the files. Semantic, fast, accessible, and built so a team can keep shipping after we leave.",
    capabilities: [
      "Marketing and editorial sites",
      "Product interfaces",
      "Design-system engineering",
      "CMS integration",
      "Performance and accessibility",
    ],
    deliverables: ["Production codebase", "CMS setup", "Component library", "Handover docs"],
    engagement: "From a single site to a multi-surface product.",
    tech: ["React", "TypeScript", "Headless CMS", "Node"],
  },
  {
    number: "04",
    name: "Creative Development",
    id: "creative",
    description:
      "Motion, interaction, and the technical craft that makes a site feel directed. Scroll, WebGL, and micro-interaction — used when they serve the story.",
    capabilities: [
      "Scroll-driven storytelling",
      "Interactive hero experiences",
      "WebGL / Three.js scenes",
      "Motion systems",
      "Prototype-to-production animation",
    ],
    deliverables: ["Interaction spec", "Motion system", "Production scenes", "Performance budget"],
    engagement: "Alongside design, or as a focused craft layer on an existing product.",
    tech: ["GSAP", "Three.js", "Framer Motion", "Shaders"],
  },
  {
    number: "05",
    name: "Design Systems",
    id: "systems",
    description:
      "A shared language for teams that need to move without drifting. Tokens, components, and rules that keep the product coherent as it grows.",
    capabilities: [
      "Token architecture",
      "Component libraries",
      "Documentation",
      "Theming",
      "Governance",
    ],
    deliverables: ["Token set", "Coded components", "Usage guidelines"],
    engagement: "Usually in parallel with a product, then handed to an internal team.",
    tech: ["React", "TypeScript", "Storybook-style docs"],
  },
  {
    number: "06",
    name: "Care & Improvement",
    id: "care",
    description:
      "Launch is not the end of the work. We stay on to iterate, fix, measure qualitatively, and keep the experience sharp as the product changes.",
    capabilities: [
      "Iterative design",
      "Frontend maintenance",
      "Performance passes",
      "Content and CMS support",
      "Feature slices",
    ],
    deliverables: ["Monthly cadence", "Prioritized backlog", "Release notes"],
    engagement: "Retainer after launch, scoped in hours or outcomes.",
    tech: ["The stack we shipped"],
  },
];
