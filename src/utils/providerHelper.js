import { PROVIDERS } from "../constants";

/**
 * Get provider information by value
 * @param {string} providerValue - Provider value (e.g., "gogoanime")
 * @returns {Object|null} Provider object or null
 */
export const getProviderInfo = (providerValue) => {
  return PROVIDERS.find((p) => p.value === providerValue) || null;
};

/**
 * Get all providers sorted by priority
 * @returns {Array} Sorted providers array
 */
export const getProvidersByPriority = () => {
  return [...PROVIDERS].sort((a, b) => a.priority - b.priority);
};

/**
 * Get next provider to try as fallback
 * @param {string} currentProvider - Current provider value
 * @returns {Object|null} Next provider or null if no more
 */
export const getNextProvider = (currentProvider) => {
  const sorted = getProvidersByPriority();
  const currentIndex = sorted.findIndex((p) => p.value === currentProvider);
  
  if (currentIndex === -1 || currentIndex === sorted.length - 1) {
    return null;
  }
  
  return sorted[currentIndex + 1];
};

/**
 * Check if provider is available
 * @param {string} providerValue - Provider value to check
 * @returns {boolean} True if provider exists
 */
export const isProviderAvailable = (providerValue) => {
  return PROVIDERS.some((p) => p.value === providerValue);
};
