export const DURATION = {
  fast: 0.28,
  medium: 0.55,
  slow: 0.9,
  page: 0.7,
  preloader: 1.15,
} as const;

export const EASE = {
  out: [0.16, 1, 0.3, 1] as const,
  inOut: [0.77, 0, 0.175, 1] as const,
  expo: [0.19, 1, 0.22, 1] as const,
  soft: [0.22, 1, 0.36, 1] as const,
};

export const MAGNETIC = {
  strength: 0.28,
  max: 10,
} as const;

export const PARALLAX = {
  bg: 8,
  mid: 16,
  fg: 28,
} as const;

export const BREAKPOINT = {
  nav: 900,
} as const;

export const STAGGER = {
  tight: 0.05,
  base: 0.08,
  slow: 0.12,
} as const;
