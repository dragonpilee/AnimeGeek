// API Base URL - defaults to public instance, can be overridden via VITE_API_BASE_URL
export const BASE_API = import.meta.env.VITE_API_BASE_URL || "https://consumet-instance.vercel.app/meta/anilist";

// Default Provider - defaults to gogoanime
export const DEFAULT_PROVIDER = import.meta.env.VITE_ANIME_PROVIDER || "gogoanime";

// Supported Providers (ordered by reliability/quality based on 2024 research)
// Priority: Lower number = higher priority (tried first)
export const PROVIDERS = [
  { value: "gogoanime", label: "Gogoanime", priority: 1, description: "Most reliable, large library" },
  { value: "zoro", label: "Zoro", priority: 2, description: "Good quality, fast loading" },
  { value: "animepahe", label: "AnimePahe", priority: 3, description: "High quality streams" },
  { value: "marin", label: "Marin", priority: 4, description: "Alternative source" },
  { value: "9anime", label: "9Anime", priority: 5, description: "Backup option" },
  { value: "crunchyroll", label: "Crunchyroll", priority: 6, description: "Official (limited)" },
];

// Legacy support
export const PROVIDER = DEFAULT_PROVIDER;

export const ROLES = {
  MAIN: "teal",
  SUPPORTING: "yellow",
};
