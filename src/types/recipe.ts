import { z } from "zod";

export const RecipeSchema = z.object({
  title: z.string(),
  description: z.string().default(""),
  image: z.string().default(""),
  prepTime: z.string().default(""),
  cookTime: z.string().default(""),
  servings: z.number().optional(),
  tags: z.array(z.string()).default([]),
  ingredients: z.array(z.string()).default([]),
  steps: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
});

export type RecipeFrontmatter = z.infer<typeof RecipeSchema>;

export interface Recipe {
  slug: string;
  frontmatter: RecipeFrontmatter;
  content: string;
}
