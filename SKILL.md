---
name: recipe-site-dev
description: "Enforces Next.js best practices, SSG architecture, and strict minimalist Pinterest-style design for the recipe website."
---

## 1. Architecture & Rendering (Next.js App Router)
- **Static Site Generation (SSG):** The site has ~100 recipes and low traffic. You MUST use `generateStaticParams()` to pre-render all recipe pages at build time. Avoid Server-Side Rendering (SSR) or dynamic fetching for recipe content.
- **YAML Data Source:** Read recipe data exclusively from the local `content/recipes/*.yml` files using the `fs` and `yaml` (or `js-yaml`) modules during the build step.
- **Component Strategy:** Default to React Server Components (RSC). Only use `'use client'` for strictly interactive UI elements (like a search filter or mobile menu).

## 2. Visual Design & CSS (Pinterest-Style)
- **Masonry Layout:** Use CSS columns for the Pinterest-style grid. In Tailwind, implement this on the container using `columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4`, and apply `break-inside-avoid mb-4` to the individual recipe cards to prevent them from splitting across columns.
- **Minimalist Aesthetic:** Keep the UI chrome nearly invisible to let the photography stand out. Use generous whitespace, clean typography, and subtle borders.
- **Strictly No Gimmicks:** Do NOT add confetti, bouncy keyframes, or heavy interactive animations. Limit motion to subtle, high-performance transitions (e.g., `hover:opacity-90 transition-opacity duration-200` on images).

## 3. Image Optimization (Critical)
- **Next/Image:** A Pinterest-style site lives and dies on image performance. You MUST use the Next.js `<Image />` component for all recipe photos.
- **Sizing:** Because images in a masonry layout scale with the columns, utilize `sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"` to ensure the browser downloads the correct resolution.

## 4. SEO & Accessibility
- **Structured Data:** Inject `application/ld+json` blocks containing `schema.org/Recipe` structured data into the `<head>` of each individual recipe page.
- **Semantic HTML:** Use proper `<article>`, `<section>`, and `<nav>` tags. Ensure all images have descriptive `alt` tags derived directly from the YAML data.