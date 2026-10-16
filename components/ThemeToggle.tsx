"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class"
      ) {
        callback();
      }
    }
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });

  return () => observer.disconnect();
}

function getThemeSnapshot(): "light" | "dark" {
  if (typeof document === "undefined") {
    return "light";
  }
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function getServerSnapshot(): "light" | "dark" {
  return "light";
}

const emptySubscribe = () => () => {};

export function ThemeToggle() {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const theme = useSyncExternalStore(
    subscribe,
    getThemeSnapshot,
    getServerSnapshot
  );

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      try {
        localStorage.setItem("theme", "dark");
      } catch {}
    } else {
      document.documentElement.classList.remove("dark");
      try {
        localStorage.setItem("theme", "light");
      } catch {}
    }
  };

  if (!isClient) {
    return (
      <div
        className="w-10 h-10 rounded-full border border-stone-300/60 dark:border-stone-700/60 bg-stone-100/40 dark:bg-stone-800/40"
        aria-hidden="true"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      className="group relative flex items-center justify-center w-10 h-10 rounded-full border border-stone-300/80 dark:border-stone-700/80 bg-stone-100/80 dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-400 hover:border-amber-500/50 dark:hover:border-amber-400/50 shadow-xs hover:shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-stone-900 cursor-pointer"
    >
      {/* Sun icon */}
      <svg
        className={`w-5 h-5 transition-transform duration-300 ${
          theme === "dark" ? "hidden" : "block rotate-0 scale-100"
        }`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>

      {/* Moon icon */}
      <svg
        className={`w-5 h-5 transition-transform duration-300 ${
          theme === "dark" ? "block rotate-0 scale-100" : "hidden"
        }`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  );
}
