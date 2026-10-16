import Link from "next/link";
import Image from "next/image";
import type { Recipe } from "@/types/recipe";

interface RecipeCardProps {
  recipe: Recipe;
  priority?: boolean;
}

export function RecipeCard({ recipe, priority = false }: RecipeCardProps) {
  const primaryTag = recipe.tags?.[0];
  const secondaryTags = recipe.tags?.slice(1, 4) || [];

  return (
    <article className="mb-0">
      <Link
        href={`/recipes/${recipe.slug}`}
        aria-label={`View recipe: ${recipe.title}`}
        className="group relative block w-full rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(40,30,20,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_40px_rgba(40,30,20,0.18)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] transition-all duration-300 ease-out ring-1 ring-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 bg-stone-950 cursor-pointer"
      >
        {/* Uniform aspect ratio ensures all cards are strictly the exact same size */}
        <div className="relative w-full aspect-[3/4]">
          {/* Background Recipe Image */}
          {recipe.image ? (
            <Image
              src={recipe.image}
              alt={recipe.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={priority}
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-stone-900" />
          )}

          {/* Top Ambient Vignette (ensures badge readability) */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none"
            aria-hidden="true"
          />

          {/*/!* Multi-stop Scrim Gradient (guarantees WCAG AA/AAA contrast for text overlay) *!/*/}
          {/*<div*/}
          {/*  className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/70 via-50% to-transparent pointer-events-none"*/}
          {/*  aria-hidden="true"*/}
          {/*/>*/}

          {/* Top Primary Tag Badge */}
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10 flex flex-wrap gap-1 sm:gap-1.5 max-w-[85%]">
            <span className="inline-flex items-center gap-1 sm:gap-1.5 px-1.5 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full text-[8px] sm:text-[10px] font-medium tracking-wider uppercase bg-stone-950/70 backdrop-blur-md text-stone-200 border border-white/20 shadow-sm">
              <span
                className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-accent"
                aria-hidden="true"
              />
              {primaryTag || "Recipe"}
            </span>
          </div>

          {/* Bottom Text Overlay */}
          <div className="absolute inset-x-0 bottom-0 p-3 sm:p-6 z-10 flex flex-col justify-end text-white">
            {/* Secondary Tags (compact & unobtrusive) */}
            {secondaryTags.length > 0 && (
              <div className="hidden sm:flex flex-wrap gap-1.5 mb-2">
                {secondaryTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/15 backdrop-blur-md text-stone-200 border border-white/15 shadow-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <h2 className="text-sm sm:text-2xl font-serif font-medium tracking-tight text-white leading-snug drop-shadow-sm group-hover:text-amber-200 transition-colors duration-200 line-clamp-2">
              {recipe.title}
            </h2>

            {/* Description */}
            <p className="mt-1 sm:mt-2 text-[10px] sm:text-sm text-stone-200/90 line-clamp-1 sm:line-clamp-2 leading-relaxed drop-shadow-sm font-light">
              {recipe.description}
            </p>

            {/* Recipe Stats Bar */}
            <div className="mt-2 sm:mt-4 pt-2 sm:pt-3.5 border-t border-white/15 flex items-center justify-between gap-2 text-[9px] sm:text-xs">
              <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                {recipe.prepTime && (
                  <span
                    className="inline-flex items-center gap-1 sm:gap-1.5 bg-white/15 backdrop-blur-md px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-white/20 text-stone-100 font-medium tracking-wide shadow-xs"
                    title={`Prep time: ${recipe.prepTime}`}
                  >
                    <svg
                      className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-accent flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span className="hidden xs:inline">Prep </span>{recipe.prepTime}
                  </span>
                )}

                {recipe.cookTime && (
                  <span
                    className="inline-flex items-center gap-1 sm:gap-1.5 bg-white/15 backdrop-blur-md px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-white/20 text-stone-100 font-medium tracking-wide shadow-xs"
                    title={`Cook time: ${recipe.cookTime}`}
                  >
                    <svg
                      className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-accent flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M12 2c1.5 3 4 4.5 4 8a6 6 0 1 1-12 0c0-3.5 2.5-5 4-8 0 0 1 2 2 2s2-2 2-2z" />
                    </svg>
                    <span className="hidden xs:inline">Cook </span>{recipe.cookTime}
                  </span>
                )}
              </div>

              {recipe.ingredients.length > 0 && (
                <span className="text-[8px] sm:text-[11px] font-medium text-stone-300/90 whitespace-nowrap drop-shadow-xs">
                  {recipe.ingredients.length} <span className="hidden xs:inline">items</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
