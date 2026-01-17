// Internal Configuration
export const TMDB_BASE_URL = "https://api.themoviedb.org/3";
export const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

// Provider Enforcement (Zoro & Vidking)
export const DEFAULT_PROVIDER = "zoro";
export const PROVIDER = DEFAULT_PROVIDER;

// Legacy support for playback
export const BASE_API = import.meta.env.VITE_API_BASE_URL || "https://consumet-instance.vercel.app/meta/anilist";

export const ROLES = {
  MAIN: "teal",
  SUPPORTING: "yellow",
};
