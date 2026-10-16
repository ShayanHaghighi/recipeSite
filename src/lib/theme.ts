/**
 * Central Theme Configuration & Token Definitions
 *
 * All color values are defined in `src/app/theme.css` and made available as semantic
 * Tailwind utility classes (`bg-canvas`, `text-foreground`, `border-border`, `text-accent`, etc.).
 */

export const themeTokens = {
  canvas: "var(--color-canvas)",
  surface: {
    DEFAULT: "var(--color-surface)",
    elevated: "var(--color-surface-elevated)",
    muted: "var(--color-surface-muted)",
    hover: "var(--color-surface-hover)",
  },
  foreground: {
    DEFAULT: "var(--color-foreground)",
    muted: "var(--color-foreground-muted)",
    subtle: "var(--color-foreground-subtle)",
  },
  border: {
    DEFAULT: "var(--color-border)",
    subtle: "var(--color-border-subtle)",
  },
  accent: {
    DEFAULT: "var(--color-accent)",
    hover: "var(--color-accent-hover)",
    subtle: "var(--color-accent-subtle)",
    contrast: "var(--color-accent-contrast)",
  },
} as const;

export type ThemeTokens = typeof themeTokens;
