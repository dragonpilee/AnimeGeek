import ListAnime from "../components/home/ListAnime";
import useChangeDocTitle from "../hooks/useChangeDocTitle";

const Trending = () => {
  useChangeDocTitle("AnimeGeek | Trending");

  return <ListAnime path="/trending" titlePage="Trending" />;
};
export default Trending;
