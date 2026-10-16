import type { Recipe } from "@/lib/recipes";
import { RecipeCard } from "./RecipeCard";

interface RecipeGridProps {
  recipes: Recipe[];
}

export function RecipeGrid({ recipes }: RecipeGridProps) {
  if (recipes.length === 0) {
    return (
      <div className="text-center py-20 text-foreground-subtle">
        <p className="text-lg">No recipes found.</p>
      </div>
    );
  }

  return (
    <section
      aria-label="Recipe Collection"
      className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6"
    >
      {recipes.map((recipe, index) => (
        <RecipeCard
          key={recipe.slug}
          recipe={recipe}
          priority={index === 0}
        />
      ))}
    </section>
  );
}
