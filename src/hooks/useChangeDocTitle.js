import { useEffect } from "react";

const useChangeDocTitle = (title) => {
  useEffect(() => {
    document.title = title || "AnimeGeek";
  }, [location.pathname]);
};
export default useChangeDocTitle;
