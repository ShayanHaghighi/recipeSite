import Image from "next/image";
import type { Recipe } from "@/types/recipe";
import RecipeTag from "@/components/recipe/RecipeTag";

interface RecipeHeroProps {
  recipe: Recipe;
}

export function RecipeHero({ recipe }: RecipeHeroProps) {
  const primaryTag = recipe.tags?.[0] || "Artisan Kitchen";

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Featured Photo with Editorial Presentation */}
      <div className="relative mb-4 w-full aspect-[16/10] sm:aspect-[16/9] max-h-[540px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(40,30,20,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] ring-1 ring-border bg-stone-950">
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
              className="w-2 h-2 rounded-full bg-accent"
              aria-hidden="true"
            />
            {primaryTag}
          </span>
        </div>
      </div>



      {/* Meta Stats Bar */}
      <div className="grid grid-cols-2 mb-4 sm:grid-cols-3 gap-3 sm:gap-4">
        {recipe.prepTime && (
          <div className="bg-surface p-4 rounded-xl border border-border text-center shadow-xs">
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-foreground-subtle mb-1">
              Prep Time
            </span>
            <span className="text-base sm:text-lg font-serif font-medium text-foreground">
              {recipe.prepTime}
            </span>
          </div>
        )}

        {recipe.cookTime && (
          <div className="bg-surface p-4 rounded-xl border border-border text-center shadow-xs">
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-foreground-subtle mb-1">
              Cook Time
            </span>
            <span className="text-base sm:text-lg font-serif font-medium text-foreground">
              {recipe.cookTime}
            </span>
          </div>
        )}

        <div className="bg-surface p-4 rounded-xl border border-border text-center shadow-xs">
          <span className="block text-[11px] font-semibold uppercase tracking-wider text-foreground-subtle mb-1">
            Ingredients
          </span>
          <span className="text-base sm:text-lg font-serif font-medium text-foreground">
            {recipe.ingredients.length} items
          </span>
        </div>
      </div>

        {/* Compact Recipe Tags Row */}
        {recipe.tags && recipe.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 ">

                {recipe.tags.map((tag) => (
                    <RecipeTag key={tag} tag={tag}/>
                ))}
            </div>
        )}

    </div>
  );
}
