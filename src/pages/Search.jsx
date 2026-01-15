import { useSearchParams } from "react-router-dom";
import ListAnime from "../components/home/ListAnime";
import { useMemo } from "react";
import useChangeDocTitle from "../hooks/useChangeDocTitle";

const Search = () => {
  const [searchParam] = useSearchParams();

  const searchVal = useMemo(() => {
    return searchParam?.get("q");
  }, [searchParam?.get("q")]);

  useChangeDocTitle(`AnimeGeek | ${searchVal}`);
  return (
    <ListAnime
      titlePage={`Search : ${searchVal}`}
      path={`/search?query=${encodeURIComponent(searchVal || "")}`}
      useExploreMore={false}
    />
  );
};
export default Search;
