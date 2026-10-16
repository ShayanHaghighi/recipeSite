import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllRecipes, getRecipeBySlug } from "@/lib/recipes";
import { Header } from "@/components/recipe/Header";
import { Divider } from "@/components/ui/Divider";
import { RecipeHero } from "@/components/recipe/RecipeHero";
import { IngredientsList } from "@/components/recipe/IngredientsList";
import { RecipeSteps } from "@/components/recipe/RecipeSteps";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate all static paths at build time (SSG requirement)
export function generateStaticParams() {
  const recipes = getAllRecipes();
  return recipes.map((recipe) => ({
    slug: recipe.slug,
  }));
}

// Dynamic SEO metadata
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    return {
      title: "Recipe Not Found — The Recipe Atelier",
    };
  }

  return {
    title: `${recipe.title} — The Recipe Atelier`,
    description: recipe.description,
    keywords: recipe.tags,
    openGraph: {
      title: recipe.title,
      description: recipe.description,
      images: recipe.image ? [{ url: recipe.image }] : [],
    },
  };
}

export default async function RecipePage({ params }: PageProps) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }

  const primaryTag = recipe.tags?.[0] || "Artisan Recipe";

  // Schema.org/Recipe structured data (SEO requirement)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    description: recipe.description,
    image: recipe.image,
    prepTime: recipe.prepTime,
    cookTime: recipe.cookTime,
    keywords: recipe.tags.join(", "),
    recipeCategory: primaryTag,
    recipeIngredient: recipe.ingredients,
    recipeInstructions: recipe.steps.map((step) => ({
      "@type": "HowToStep",
      text: step,
    })),
  };

  return (
    <div className="min-h-screen bg-canvas text-foreground transition-colors duration-300">
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Same Shared Header Component */}
        <Header
          eyebrow={primaryTag}
          title={recipe.title}
          subtitle={recipe.description}
          backHref="/"
          backLabel="All Recipes"
        />

        {/* Clean, Elegant Line Break */}
        <Divider />

        {/* Recipe Content Section */}
        <article className="space-y-12 sm:space-y-16">
          {/* Featured Hero Photo & Key Stats */}
          <RecipeHero recipe={recipe} />

          {/* Two-Column Editorial Layout: Ingredients & Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Ingredients (Sticky on desktop) */}
            <aside className="lg:col-span-5 lg:sticky lg:top-8">
              <IngredientsList ingredients={recipe.ingredients} />
            </aside>

            {/* Right Column: Steps */}
            <section className="lg:col-span-7">
              <RecipeSteps steps={recipe.steps} />
            </section>
          </div>
        </article>
      </main>
    </div>
  );
}
