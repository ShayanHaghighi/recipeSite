import { getAllRecipes, getAllTags } from "@/lib/recipes";
import { Header } from "@/components/Header";
import { Divider } from "@/components/Divider";
import { RecipeCatalog } from "@/components/RecipeCatalog";

export default function Home() {
  const recipes = getAllRecipes();
  const tags = getAllTags();

  return (
    <div className="min-h-screen bg-canvas text-foreground transition-colors duration-300">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <Header />
        <Divider />
        <RecipeCatalog recipes={recipes} tags={tags} />
      </main>
    </div>
  );
}
