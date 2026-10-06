import northline from "@/assets/images/work-northline.jpg";
import maison from "@/assets/images/work-maison.jpg";
import archive from "@/assets/images/work-archive.jpg";
import harbor from "@/assets/images/work-harbor.jpg";
import fieldnote from "@/assets/images/work-fieldnote.jpg";
import solstice from "@/assets/images/work-solstice.jpg";
import texture from "@/assets/images/texture-metal.jpg";
import architecture from "@/assets/images/cta-architecture.jpg";

export type Project = {
  slug: string;
  number: string;
  title: string;
  industry: string;
  year: string;
  summary: string;
  built: string;
  challenge: string;
  objectives: string[];
  strategy: string;
  design: string;
  development: string;
  interaction: string;
  result: string;
  services: string[];
  technologies: string[];
  image: string;
  secondary: string;
  layout: "full" | "split" | "asymmetric" | "editorial" | "immersive" | "horizontal";
};

export const projects: Project[] = [
  {
    slug: "northline",
    number: "01",
    title: "Northline",
    industry: "Operations / SaaS",
    year: "2025",
    summary:
      "An operations intelligence surface for teams drowning in disconnected tools. Quiet hierarchy, exception-first views, and a system that stays calm under pressure.",
    built: "Product interface, design system, and production frontend",
    challenge:
      "Operators were translating five tools into one mental model — spreadsheets, chat, dashboards, and tribal knowledge. Signal was buried. The product needed to show what required attention without adding another noisy layer.",
    objectives: [
      "Make exceptions visible before vanity metrics",
      "Reduce the number of places an operator has to look",
      "Establish a visual language that can scale across modules",
      "Keep the interface quiet enough to use all day",
    ],
    strategy:
      "We started with the real working day, not a feature list. Interviews and ride-alongs revealed that most dashboards were ignored until something broke. Northline is designed around that moment: a composed overview, then a fast path into the exception.",
    design:
      "The interface is dark, sparse, and typographic. Charts are secondary to status. We designed a modular system of density levels so the same product can feel like a briefing in the morning and a workstation in the afternoon.",
    development:
      "Built as a React application with a strict design-token layer, so new modules inherit spacing, type, and motion without reinventing the surface. Data-heavy views were composed to stay readable at 1440 and on a laptop in a warehouse office.",
    interaction:
      "Hover states reveal context without tooltips covering the work. Filters persist. Motion is used only to confirm a change of state — never to decorate a chart.",
    result:
      "A product that feels quieter under pressure. Operators can see what matters without assembling the picture themselves. The system is now the place work starts, not another tab to reconcile.",
    services: ["Product design", "Design system", "Frontend development"],
    technologies: ["React", "TypeScript", "Node", "D3"],
    image: northline,
    secondary: texture,
    layout: "full",
  },
  {
    slug: "maison",
    number: "02",
    title: "Maison",
    industry: "Fashion / Commerce",
    year: "2025",
    summary:
      "An independent fashion house needed a digital store that felt like the atelier — not a theme. Editorial rhythm, considered product photography, and a checkout that does not break the spell.",
    built: "Brand-led e-commerce experience and content system",
    challenge:
      "The existing site flattened a carefully made collection into a grid of thumbnails. The clothes have weight, cut, and silence. The website had none of that. Conversion was not the only problem — recognition was.",
    objectives: [
      "Translate atelier atmosphere into a digital space",
      "Let photography lead, with type as structure",
      "Keep merchandising flexible without looking templated",
      "Make the path to purchase feel like a continuation, not a drop",
    ],
    strategy:
      "We treated the site as a seasonal publication, not a catalog. Collections open like chapters. Product pages hold on a single garment long enough to be seen. Commerce mechanics sit in the periphery until they are needed.",
    design:
      "Large crops, restrained type, and a near-black field. We designed a set of layout templates the team can sequence each season — lookbook, story, garment, film — without a designer in the file every week.",
    development:
      "A headless commerce setup with a custom storefront. Media is treated as a first-class object: sequenced, cropped, and lazy-loaded so the editorial pacing survives on a phone.",
    interaction:
      "Image reveals follow scroll rather than autoplay. Cart and checkout stay visually inside the same world. Motion is slow on purpose.",
    result:
      "The site now carries the same temperature as the clothes. The house can publish a season without collapsing into a generic shop, and customers can buy without leaving the atmosphere that made them stay.",
    services: ["Art direction", "UX/UI design", "Creative development"],
    technologies: ["React", "Headless commerce", "GSAP"],
    image: maison,
    secondary: architecture,
    layout: "split",
  },
  {
    slug: "archive",
    number: "03",
    title: "Archive",
    industry: "Culture / Editorial",
    year: "2024",
    summary:
      "A digital presence for a cultural institution that needed to hold exhibitions, research, and a public program without looking like a brochure.",
    built: "Editorial website, archive, and exhibition storytelling",
    challenge:
      "The institution’s work is slow, scholarly, and spatial. The previous website was a news feed. Exhibitions disappeared when they closed. Research was PDF. The public program fought for leftover space.",
    objectives: [
      "Give exhibitions a lasting digital form",
      "Make the archive usable, not merely stored",
      "Hold scholarship and public programming in one rhythm",
      "Respect the architecture of the building in the architecture of the site",
    ],
    strategy:
      "We structured the site as rooms rather than pages. Current, upcoming, and past sit in one continuum. The archive is searchable without looking like a database. Editorial features sit beside the collection, not above it.",
    design:
      "Monumental type, long reading measure, and images that are allowed to be still. The palette is charcoal and warm paper. Wayfinding is quiet: you always know which room you are in.",
    development:
      "A content model that treats exhibitions, texts, people, and works as related objects. Editors can build a show page from the same components used in the journal, so the institution speaks with one voice.",
    interaction:
      "Scroll is used to move through an exhibition the way a visitor moves through a gallery — sequence, pause, adjacency — without fake 3D walkthroughs.",
    result:
      "Exhibitions now persist as designed documents. The archive is part of the public face of the institution, and the site feels like a place rather than a noticeboard.",
    services: ["Strategy", "Editorial design", "Web development"],
    technologies: ["React", "TypeScript", "Headless CMS"],
    image: archive,
    secondary: architecture,
    layout: "editorial",
  },
  {
    slug: "harbor",
    number: "04",
    title: "Harbor",
    industry: "Fintech / Onboarding",
    year: "2025",
    summary:
      "A wealth onboarding experience that treats trust as a design material. Clear steps, human language, and an interface that does not perform complexity.",
    built: "Onboarding product, mobile and desktop",
    challenge:
      "The product asked new clients to perform confidence. Forms were long, language was legal, and progress was unclear. People abandoned not because the offering was weak, but because the first hour felt like a test.",
    objectives: [
      "Make the first session feel guided, not examined",
      "Reveal only the next necessary decision",
      "Keep compliance visible without making it the personality",
      "Work as well on a phone as at a desk",
    ],
    strategy:
      "We mapped the emotional load of each step — identity, money, risk, documents — and designed pacing around it. Copy was rewritten in the client’s voice. The system explains why a question exists before it asks.",
    design:
      "Warm dark surfaces, copper for progress, and type that is closer to a letter than a bank screen. Illustration is absent. Space does the calming.",
    development:
      "A step engine with resumable state, inline validation that does not shout, and a shared component layer across native-feeling web views.",
    interaction:
      "Progress is always present but never anxious. Errors are specific. Returning users land where they left, with a sentence that remembers the context.",
    result:
      "Onboarding reads as a conversation with structure. The product still collects everything it must — it simply no longer asks people to feel small while they do it.",
    services: ["UX design", "UI design", "Product development"],
    technologies: ["React", "TypeScript", "Node"],
    image: harbor,
    secondary: texture,
    layout: "asymmetric",
  },
  {
    slug: "fieldnote",
    number: "05",
    title: "Fieldnote",
    industry: "Research / Productivity",
    year: "2024",
    summary:
      "A collaboration tool for researchers who write in fragments. Notes, sources, and shared threads in a workspace that protects attention.",
    built: "Web application and writing environment",
    challenge:
      "Research happens in pieces — quotes, links, half-sentences, arguments that are not ready. Existing tools either over-structured the work or left it as a pile. Teams needed a shared place that could stay unfinished.",
    objectives: [
      "Support fragmentary writing without forcing a document",
      "Make sources first-class, not attachments",
      "Allow a team to see a project’s shape without a meeting",
      "Keep the interface out of the way of language",
    ],
    strategy:
      "We designed around the note as the atomic unit, then built gathering, linking, and outlining as later acts. The product is opinionated about attention and unopinionated about method.",
    design:
      "A writing surface with the temperature of paper at night. Chrome is minimal. Typographic hierarchy does the navigation. Presence of collaborators is indicated, never performed.",
    development:
      "Realtime collaboration with conflict-safe notes, a lightweight graph of sources, and keyboard-first navigation. Performance was treated as a design requirement — typing cannot stutter.",
    interaction:
      "Slash commands, inline references, and a command palette. Motion is nearly absent while writing and precise when structure changes.",
    result:
      "Teams can keep a project in one place from first fragment to first draft. The tool recedes. The writing remains the point.",
    services: ["Product strategy", "UX/UI", "Web application"],
    technologies: ["React", "TypeScript", "WebSocket"],
    image: fieldnote,
    secondary: texture,
    layout: "horizontal",
  },
  {
    slug: "solstice",
    number: "06",
    title: "Solstice",
    industry: "Wellness / Brand",
    year: "2025",
    summary:
      "A brand platform and website for a wellness practice that needed stillness, not sparkle. Atmosphere, booking, and story held in one quiet system.",
    built: "Brand platform, website, and booking journey",
    challenge:
      "Wellness on the web often looks like a lifestyle ad. The practice is slower than that — water, stone, time. They needed a digital presence that would not oversell, and a booking flow that would not jolt people out of the mood the photography created.",
    objectives: [
      "Establish a visual language that can live offline and on",
      "Let atmosphere do the persuasion",
      "Make booking feel like an invitation",
      "Give the team a simple way to update offerings",
    ],
    strategy:
      "We reduced the brand to a few materials: water, stone, warm light, one typeface, almost no decoration. The site is sequenced like a visit — arrival, pause, offering, invitation.",
    design:
      "Full-bleed stills, long fades, and copy that is allowed to be short. Color is charcoal and a single warm highlight. The identity is as much about what is left out.",
    development:
      "A small, fast site with a structured offering model and an integrated booking path. Images are treated with care — cropped, deferred, never noisy.",
    interaction:
      "Scroll reveals are slow. Hover is barely there. The booking step is the only moment the interface becomes more mechanical, and even then it stays in the same type and color.",
    result:
      "The practice now has a digital front door that matches the room. People arrive already slowed down. The team can change offerings without changing the feeling.",
    services: ["Brand", "Art direction", "Web development"],
    technologies: ["React", "GSAP", "Headless CMS"],
    image: solstice,
    secondary: architecture,
    layout: "immersive",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return projects[0];
  return projects[(i + 1) % projects.length];
}
