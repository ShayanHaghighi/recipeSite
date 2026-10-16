import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  backHref?: string;
  backLabel?: string;
  children?: React.ReactNode;
}

export function Header({
  title = "Delicious Recipes",
  subtitle = "A curated collection of mouth-watering dishes, timeless techniques, and comforting flavours for every home kitchen.",
  eyebrow = "Handcrafted & Seasonal",
  backHref,
  backLabel = "All Recipes",
  children,
}: HeaderProps) {
  return (
    <header className="relative max-w-4xl mx-auto">
      {/* Top Bar with Brand Badge & Theme Toggle */}
      <div className="flex items-center justify-between mb-8 sm:mb-12">
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/"
            className="group flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-md"
            aria-label="The Recipe Atelier - Home"
          >
            <span
              className="w-2.5 h-2.5 rounded-full bg-amber-600 dark:bg-amber-400 group-hover:scale-125 transition-transform duration-200"
              aria-hidden="true"
            />
            <span className="text-xs font-semibold tracking-widest uppercase text-stone-600 dark:text-stone-300 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors duration-200">
              The Recipe Atelier
            </span>
          </Link>

          {backHref && (
            <>
              <span
                className="text-stone-300 dark:text-stone-700 select-none"
                aria-hidden="true"
              >
                /
              </span>
              <Link
                href={backHref}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-md"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                <span>{backLabel}</span>
              </Link>
            </>
          )}
        </div>
        <ThemeToggle />
      </div>

      {/* Main Title Area */}
      <div className="text-center">
        {eyebrow && (
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-stone-500 dark:text-stone-400 mb-3">
            {eyebrow}
          </p>
        )}
        {title && (
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-stone-900 dark:text-[#F5F0E8] leading-[1.15] transition-colors duration-200">
            {title}
          </h1>
        )}
        {subtitle && (
          <p className="mt-4 text-base sm:text-lg text-stone-600 dark:text-stone-300 max-w-2xl mx-auto font-light leading-relaxed transition-colors duration-200">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </header>
  );
}
