export type NavItem = {
  label: string;
  href: string;
  id: string;
};

export const navigation: NavItem[] = [
  { label: "Work", href: "#work", id: "work" },
  { label: "Services", href: "#services", id: "services" },
  { label: "Pricing", href: "#pricing", id: "pricing" },
  { label: "Approach", href: "#approach", id: "approach" },
  { label: "FAQ", href: "#faq", id: "faq" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export const serviceNav = [
  { label: "Strategy", href: "#services", note: "Positioning, IA, product direction" },
  { label: "Design", href: "#services", note: "Interface, brand, design systems" },
  { label: "Development", href: "#services", note: "Web, product, creative technology" },
  { label: "Care", href: "#services", note: "Iteration, support, improvement" },
];
