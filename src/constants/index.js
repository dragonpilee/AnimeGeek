// TMDB Configuration
export const TMDB_BASE_URL = "https://api.themoviedb.org/3";
export const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

// Supported Providers
export const PROVIDERS = [
  { value: "tmdb", label: "TMDB", priority: 1, description: "Primary metadata source" },
];

// Default Provider
export const DEFAULT_PROVIDER = "tmdb";

// Legacy support
export const BASE_API = import.meta.env.VITE_API_BASE_URL || "https://consumet-instance.vercel.app/meta/anilist";
export const PROVIDER = DEFAULT_PROVIDER;

export const ROLES = {
  MAIN: "teal",
  SUPPORTING: "yellow",
};
