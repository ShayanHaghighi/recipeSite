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
