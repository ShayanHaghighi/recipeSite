import Link from "next/link";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

interface HeaderProps {
  title?: string;
  backHref?: string;
  backLabel?: string;
  children?: React.ReactNode;
}

export function Header({
  title = "Delicious Recipes",
  backHref,
  backLabel = "All Recipes",
  children,
}: HeaderProps) {
  return (
    <header className="relative max-w-4xl mx-auto px-4">
      {/* Top Bar with Back Link, Centered Title & Theme Toggle */}
      <div className="flex items-center justify-between mb-8 sm:mb-12 gap-4">
        <div className="flex-1 flex justify-start">
          {backHref && (
            <Link
              href={backHref}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground-subtle hover:text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md"
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
          )}
        </div>

        {title && (
          <h1 className="text-2xl sm:text-3xl lg:text-6xl font-serif font-bold tracking-tight text-foreground leading-[1.15] transition-colors duration-200 text-center">
            {title}
          </h1>
        )}

        <div className="flex-1 flex justify-end">
          <ThemeToggle />
        </div>
      </div>

      {children && (
        <div className="text-center mb-12 sm:mb-16">
          {children}
        </div>
      )}
    </header>
  );
}
