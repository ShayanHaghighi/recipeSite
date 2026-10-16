"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import type { Recipe } from "@/types/recipe";
import { RecipeCard } from "./RecipeCard";

interface RecipeCatalogProps {
  recipes: Recipe[];
  tags: string[];
}

export function RecipeCatalog({ recipes, tags }: RecipeCatalogProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredRecipes = useMemo(() => {
    let result = recipes;
    if (selectedTags.length > 0) {
      result = result.filter((recipe) =>
        recipe.tags?.some((tag) => selectedTags.includes(tag))
      );
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(query) ||
          recipe.description?.toLowerCase().includes(query) ||
          recipe.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }
    return result;
  }, [recipes, selectedTags, searchQuery]);

  const filteredTags = useMemo(() => {
    if (!searchQuery) return tags;
    const query = searchQuery.toLowerCase();
    return tags.filter((tag) => tag.toLowerCase().includes(query));
  }, [tags, searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
    setIsDropdownOpen(false);
  };

  const clearAll = () => {
    setSelectedTags([]);
    setSearchQuery("");
  };

  return (
    <div className="space-y-8">
      {/* Interactive Filtering & Search Dropdown */}
      <section aria-label="Recipe Filters" className="max-w-md">
        <div className="relative" ref={dropdownRef}>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <svg
                  className="h-4 w-4 text-foreground-subtle"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search recipes or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsDropdownOpen(true)}
                className="block w-full pl-10 pr-4 py-2.5 bg-surface-elevated border border-border rounded-xl text-sm text-foreground placeholder:text-foreground-subtle focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-200"
              />
            </div>

            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 cursor-pointer ${
                selectedTags.length > 0
                  ? "bg-accent text-accent-contrast border-accent shadow-sm"
                  : "bg-surface-elevated text-foreground border-border hover:bg-surface-hover"
              }`}
            >
              <span>
                {selectedTags.length === 0
                  ? "All Recipes"
                  : selectedTags.length === 1
                  ? selectedTags[0]
                  : `${selectedTags.length} Filters`}
              </span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute z-50 mt-2 w-full bg-surface-elevated border border-border rounded-2xl shadow-xl py-2 max-h-80 overflow-y-auto backdrop-blur-md">
              <button
                type="button"
                onClick={() => {
                  setSelectedTags([]);
                  setIsDropdownOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-surface-hover transition-colors flex items-center gap-3 ${
                  selectedTags.length === 0
                    ? "text-accent font-semibold"
                    : "text-foreground-muted"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-colors ${
                    selectedTags.length === 0
                      ? "bg-accent border-accent"
                      : "border-border"
                  }`}
                >
                  {selectedTags.length === 0 && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
                <span>All Recipes ({recipes.length})</span>
              </button>
              <div className="h-px bg-border my-1 mx-4" />
              {filteredTags.length > 0 ? (
                filteredTags.map((tag) => {
                  const isChecked = selectedTags.includes(tag);
                  const count = recipes.filter((r) =>
                    r.tags?.includes(tag)
                  ).length;
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-surface-hover transition-colors flex items-center gap-3 ${
                        isChecked
                          ? "text-accent font-semibold"
                          : "text-foreground-muted"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-colors ${
                          isChecked ? "bg-accent border-accent" : "border-border"
                        }`}
                      >
                        {isChecked && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                      <span>
                        {tag} ({count})
                      </span>
                    </button>
                  );
                })
              ) : (
                <div className="px-4 py-2 text-sm text-foreground-subtle italic">
                  No tags matching &ldquo;{searchQuery}&rdquo;
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Filter Status Feedback */}
      {(selectedTags.length > 0 || searchQuery) && (
        <div className="flex items-center justify-between text-xs text-foreground-muted bg-surface-elevated/50 px-4 py-2.5 rounded-xl border border-border-subtle">
          <div className="flex flex-wrap items-center gap-x-1">
            <span>
              Showing{" "}
              <strong className="text-foreground font-semibold">
                {filteredRecipes.length}
              </strong>{" "}
              {filteredRecipes.length === 1 ? "recipe" : "recipes"}
            </span>
            {selectedTags.length > 0 && (
              <>
                <span>matching tags:</span>
                <div className="flex flex-wrap gap-1">
                  {selectedTags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center font-semibold text-accent"
                    >
                      &ldquo;{tag}&rdquo;
                      {selectedTags.indexOf(tag) < selectedTags.length - 1 && (
                        <span className="text-foreground-subtle ml-1">or</span>
                      )}
                    </span>
                  ))}
                </div>
              </>
            )}
            {searchQuery && (
              <>
                {selectedTags.length > 0 && (
                  <span className="text-foreground-subtle">and</span>
                )}
                <span>
                  matching{" "}
                  <span className="inline-block font-semibold text-accent">
                    &ldquo;{searchQuery}&rdquo;
                  </span>
                </span>
              </>
            )}
          </div>
          <button
            type="button"
            onClick={clearAll}
            className="text-foreground-subtle hover:text-foreground underline cursor-pointer whitespace-nowrap ml-4"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Filtered Recipe Masonry Collection */}
      {filteredRecipes.length > 0 ? (
        <section
          aria-label="Filtered Recipe Collection"
          className="columns-1 sm:columns-2 md:columns-2 lg:columns-3 gap-8"
        >
          {filteredRecipes.map((recipe, index) => (
            <RecipeCard
              key={recipe.slug}
              recipe={recipe}
              priority={index === 0}
            />
          ))}
        </section>
      ) : (
        /* Empty State */
        <div className="text-center py-20 bg-surface rounded-2xl border border-border">
          <p className="text-lg font-serif text-foreground mb-2">
            No recipes found
          </p>
          <p className="text-sm text-foreground-muted mb-6">
            Try selecting another tag or view all available recipes.
          </p>
          <button
            type="button"
            onClick={() => setSelectedTags([])}
            className="inline-flex items-center px-4 py-2 rounded-full text-xs font-medium bg-accent text-accent-contrast shadow-sm hover:bg-accent-hover transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
