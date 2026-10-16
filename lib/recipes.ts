import fs from "fs";
import path from "path";
import { loadAll } from "js-yaml";

export interface Recipe {
  slug: string;
  title: string;
  description: string;
  image: string;
  prepTime: string;
  cookTime: string;
  tags: string[];
  ingredients: string[];
  steps: string[];
}

const recipesDirectory = path.join(process.cwd(), "recipes");

export function getAllRecipes(): Recipe[] {
  if (!fs.existsSync(recipesDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(recipesDirectory);
  const yamlFiles = fileNames.filter(
    (fileName) => fileName.endsWith(".yaml") || fileName.endsWith(".yml")
  );

  const recipes = yamlFiles.map((fileName) => {
    const slug = fileName.replace(/\.ya?ml$/, "");
    const fullPath = path.join(recipesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // loadAll handles multi-document files (frontmatter + body) as well as single-doc YAML
    const docs = loadAll(fileContents).filter(
      (doc): doc is Record<string, unknown> =>
        typeof doc === "object" && doc !== null
    );

    const mergedData = Object.assign({}, ...docs);

    const recipe: Recipe = {
      slug,
      title: String(mergedData.title || slug),
      description: String(mergedData.description || ""),
      image: String(
        mergedData.image || mergedData.imagePath || mergedData.image_path || ""
      ),
      prepTime: String(
        mergedData.prepTime || mergedData.preptime || mergedData.prep_time || ""
      ),
      cookTime: String(
        mergedData.cookTime || mergedData.cooktime || mergedData.cook_time || ""
      ),
      tags: Array.isArray(mergedData.tags)
        ? mergedData.tags.map(String)
        : typeof mergedData.tags === "string"
        ? mergedData.tags
            .split(",")
            .map((s: string) => s.trim())
            .filter(Boolean)
        : [],
      ingredients: Array.isArray(mergedData.ingredients)
        ? mergedData.ingredients.map(String)
        : [],
      steps: Array.isArray(mergedData.steps)
        ? mergedData.steps.map(String)
        : [],
    };

    return recipe;
  });

  return recipes;
}

export function getAllTags(): string[] {
  const recipes = getAllRecipes();
  const tagSet = new Set<string>();
  recipes.forEach((r) => r.tags.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).sort();
}

export function getRecipeBySlug(slug: string): Recipe | null {
  const recipes = getAllRecipes();
  return recipes.find((r) => r.slug === slug) || null;
}
