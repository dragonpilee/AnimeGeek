import { useState, useCallback } from "react";
import { DEFAULT_PROVIDER } from "../constants";

/**
 * Custom hook to manage anime provider selection
 * @returns {Object} Provider state and methods
 */
const useProvider = () => {
  const [currentProvider, setCurrentProvider] = useState(() => {
    // Get from localStorage or use default
    const saved = localStorage.getItem("animeProvider");
    return saved || DEFAULT_PROVIDER;
  });

  const changeProvider = useCallback((provider) => {
    setCurrentProvider(provider);
    localStorage.setItem("animeProvider", provider);
  }, []);

  return {
    currentProvider,
    changeProvider,
  };
};

export default useProvider;
