import ListAnime from "../components/home/ListAnime";
import useChangeDocTitle from "../hooks/useChangeDocTitle";

const Popular = () => {
  useChangeDocTitle("AnimeGeek | Popular");

  return <ListAnime path="/popular" titlePage="Popular" />;
};
export default Popular;
