"use client";

import { useState } from "react";

interface IngredientsListProps {
  ingredients: string[];
}

export function IngredientsList({ ingredients }: IngredientsListProps) {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const toggleItem = (index: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const resetAll = () => {
    setCheckedItems({});
  };

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;

  return (
    <div className="bg-surface rounded-2xl p-6 sm:p-7 border border-border shadow-[0_4px_20px_rgba(40,30,20,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-border">
        <div className="flex items-center gap-2.5">
          <span
            className="w-2 h-2 rounded-full bg-accent"
            aria-hidden="true"
          />
          <h2 className="text-xl font-serif font-medium text-foreground tracking-tight">
            Ingredients
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-foreground-subtle bg-surface-elevated px-2.5 py-1 rounded-full">
            {checkedCount > 0
              ? `${checkedCount}/${ingredients.length} prepped`
              : `${ingredients.length} items`}
          </span>
          {checkedCount > 0 && (
            <button
              type="button"
              onClick={resetAll}
              className="text-xs text-accent hover:text-accent-hover hover:underline font-medium cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      <p className="text-xs text-foreground-subtle mb-4 font-light">
        Tap items to check them off as you prep in the kitchen:
      </p>

      {/* Ingredient Items List */}
      <ul className="space-y-2.5" role="list">
        {ingredients.map((ingredient, index) => {
          const isChecked = !!checkedItems[index];

          return (
            <li key={index}>
              <button
                type="button"
                onClick={() => toggleItem(index)}
                className={`w-full group flex items-start gap-3.5 p-3 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                  isChecked
                    ? "bg-surface-elevated/60 opacity-60"
                    : "hover:bg-surface-hover"
                }`}
                aria-pressed={isChecked}
              >
                {/* Custom Checkbox circle */}
                <span
                  className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center transition-colors duration-200 ${
                    isChecked
                      ? "bg-accent border-accent text-accent-contrast"
                      : "border-border group-hover:border-accent bg-transparent"
                  }`}
                  aria-hidden="true"
                >
                  {isChecked && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </span>

                {/* Ingredient Label */}
                <span
                  className={`text-sm leading-relaxed transition-all duration-200 ${
                    isChecked
                      ? "line-through text-foreground-subtle"
                      : "text-foreground font-normal"
                  }`}
                >
                  {ingredient}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
