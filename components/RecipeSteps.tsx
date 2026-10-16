"use client";

import { useState } from "react";

interface RecipeStepsProps {
  steps: string[];
}

export function RecipeSteps({ steps }: RecipeStepsProps) {
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});

  const toggleStep = (index: number) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const resetAll = () => {
    setCompletedSteps({});
  };

  const completedCount = Object.values(completedSteps).filter(Boolean).length;

  return (
    <div className="bg-surface rounded-2xl p-6 sm:p-7 border border-border shadow-[0_4px_20px_rgba(40,30,20,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-2 border-b border-border">
        <div className="flex items-center gap-2.5">
          <span
            className="w-2 h-2 rounded-full bg-accent"
            aria-hidden="true"
          />
          <h2 className="text-xl font-serif font-medium text-foreground tracking-tight">
            Method &amp; Preparation
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-foreground-subtle bg-surface-elevated px-2.5 py-1 rounded-full">
            {completedCount > 0
              ? `${completedCount}/${steps.length} done`
              : `${steps.length} ${steps.length === 1 ? "step" : "steps"}`}
          </span>
          {completedCount > 0 && (
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

      <p className="text-xs text-foreground-subtle mb-2 font-light">
        Tap any step to mark it as completed as you cook:
      </p>

      {/* Steps List as a single cohesive tile with dividers */}
      <ol className="divide-y divide-border-subtle" role="list">
        {steps.map((step, index) => {
          const isCompleted = !!completedSteps[index];
          const stepNumber = String(index + 1).padStart(2, "0");

          return (
            <li key={index}>
              <button
                type="button"
                onClick={() => toggleStep(index)}
                className={`w-full group flex items-start gap-3.5 sm:gap-4 py-4 text-left transition-all duration-200 cursor-pointer ${
                  isCompleted
                    ? "opacity-50"
                    : "hover:bg-surface-hover -mx-2 px-2 rounded-xl"
                }`}
                aria-pressed={isCompleted}
              >
                {/* Number vertically aligned with the first line of text */}
                <span
                  className={`shrink-0 flex items-center justify-center w-7 h-7 rounded-full font-serif font-medium text-xs transition-colors duration-200 select-none ${
                    isCompleted
                      ? "bg-emerald-600 text-white"
                      : "bg-accent-subtle text-accent border border-accent/20 group-hover:scale-105"
                  }`}
                  aria-hidden="true"
                >
                  {isCompleted ? (
                    <svg
                      className="w-3.5 h-3.5 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    stepNumber
                  )}
                </span>

                {/* Step text aligned directly beside the number with matched line-height */}
                <p
                  className={`text-sm sm:text-base leading-relaxed transition-all duration-200 pt-0.5 ${
                    isCompleted
                      ? "line-through text-foreground-subtle"
                      : "text-foreground font-light"
                  }`}
                >
                  {step}
                </p>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
