import Image from "next/image";
import type { Recipe } from "@/lib/recipes";

interface RecipeHeroProps {
  recipe: Recipe;
}

export function RecipeHero({ recipe }: RecipeHeroProps) {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Featured Photo with Editorial Presentation */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[540px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(40,30,20,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] ring-1 ring-stone-900/10 dark:ring-white/10 bg-stone-950">
        {recipe.image ? (
          <Image
            src={recipe.image}
            alt={`Freshly prepared ${recipe.title}`}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="object-cover object-center"
          />
        ) : (
          <div className="absolute inset-0 bg-stone-900" />
        )}

        {/* Ambient Vignette & Scrim */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/20 pointer-events-none"
          aria-hidden="true"
        />

        {/* Corner Badge */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase bg-stone-950/60 backdrop-blur-md text-stone-200 border border-white/20 shadow-sm">
            <span
              className="w-2 h-2 rounded-full bg-amber-400"
              aria-hidden="true"
            />
            Artisan Kitchen
          </span>
        </div>
      </div>

      {/* Meta Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {recipe.prepTime && (
          <div className="bg-[#FAF7F2] dark:bg-[#181614] p-4 rounded-xl border border-stone-200/80 dark:border-stone-800 text-center shadow-xs">
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1">
              Prep Time
            </span>
            <span className="text-base sm:text-lg font-serif font-medium text-stone-900 dark:text-[#F5F0E8]">
              {recipe.prepTime}
            </span>
          </div>
        )}

        {recipe.cookTime && (
          <div className="bg-[#FAF7F2] dark:bg-[#181614] p-4 rounded-xl border border-stone-200/80 dark:border-stone-800 text-center shadow-xs">
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1">
              Cook Time
            </span>
            <span className="text-base sm:text-lg font-serif font-medium text-stone-900 dark:text-[#F5F0E8]">
              {recipe.cookTime}
            </span>
          </div>
        )}

        <div className="bg-[#FAF7F2] dark:bg-[#181614] p-4 rounded-xl border border-stone-200/80 dark:border-stone-800 text-center shadow-xs">
          <span className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1">
            Ingredients
          </span>
          <span className="text-base sm:text-lg font-serif font-medium text-stone-900 dark:text-[#F5F0E8]">
            {recipe.ingredients.length} items
          </span>
        </div>

        {/*<div className="bg-[#FAF7F2] dark:bg-[#181614] p-4 rounded-xl border border-stone-200/80 dark:border-stone-800 text-center shadow-xs">*/}
        {/*  <span className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1">*/}
        {/*    Difficulty*/}
        {/*  </span>*/}
        {/*  <span className="text-base sm:text-lg font-serif font-medium text-stone-900 dark:text-[#F5F0E8]">*/}
        {/*    Artisan*/}
        {/*  </span>*/}
        {/*</div>*/}
      </div>
    </div>
  );
}
