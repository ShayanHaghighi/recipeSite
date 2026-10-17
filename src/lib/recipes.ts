import { promises as fs } from "fs";
import path from "path";
import { cache } from "react";
import matter from "gray-matter";
import { Recipe, RecipeSchema } from "@/types/recipe";

const recipesDirectory = path.join(process.cwd(), "content", "recipes");

// 2. Wrap in React cache(). If Layout.tsx, Page.tsx, and a Sidebar component 
// all call getAllRecipes(), it only executes the filesystem read ONCE.
export const getAllRecipes = cache(async (): Promise<Recipe[]> => {
  try {
    // 3. Use async readdir to avoid blocking the event loop
    const fileNames = await fs.readdir(recipesDirectory);
    
    // 4. Use Promise.all to read all files concurrently, not one by one
    const recipes = await Promise.all(
      fileNames
        // Only process yaml/yml/markdown/mdx files
        .filter((fileName) => 
          fileName.endsWith(".yaml") || 
          fileName.endsWith(".yml") || 
          fileName.endsWith(".md") || 
          fileName.endsWith(".mdx")
        )
        .map(async (fileName) => {
          const slug = fileName.replace(/\.ya?ml$/, "").replace(/\.mdx?$/, "");
          const fullPath = path.join(recipesDirectory, fileName);
          
          const fileContents = await fs.readFile(fullPath, "utf8");
          const { data, content } = matter(fileContents);

          // 5. Validate the parsed YAML against our Zod schema.
          // safeParse prevents the whole build from crashing if ONE file is bad.
          const parsedFrontmatter = RecipeSchema.safeParse(data);

          if (!parsedFrontmatter.success) {
            // A senior dev leaves helpful error breadcrumbs
            console.error(
              `❌ Invalid frontmatter in ${fileName}:\n`,
              parsedFrontmatter.error.flatten().fieldErrors
            );
            return null; // We'll filter this out below
          }

          return {
            slug,
            frontmatter: parsedFrontmatter.data,
            content,
          };
        })
    );

    // 6. Filter out any nulls (failed validations) and drafts, then sort by title
    return recipes
      .filter((recipe): recipe is Recipe => recipe !== null)
      .filter((recipe) => !recipe.frontmatter.draft)
      .sort((a, b) => a.frontmatter.title.localeCompare(b.frontmatter.title));

  } catch (error) {
    // Graceful fallback if the directory doesn't exist yet
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      console.warn("⚠️ Recipes directory not found. Returning empty array.");
      return [];
    }
    throw error;
  }
});

export const getAllTags = async (): Promise<string[]> => {
  const recipes = await getAllRecipes();
  const tagSet = new Set<string>();
  recipes.forEach((r) => r.frontmatter.tags.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).sort();
};

export const getRecipeBySlug = async (slug: string): Promise<Recipe | null> => {
  const recipes = await getAllRecipes();
  return recipes.find((r) => r.slug === slug) || null;
};
