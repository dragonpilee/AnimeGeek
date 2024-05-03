import ListAnime from "../components/home/ListAnime";
import useChangeDocTitle from "../hooks/useChangeDocTitle";

const Upcoming = () => {
  useChangeDocTitle("AnimeGeek| Upcoming");

  return <ListAnime path="/upcoming" titlePage="Upcoming" />;
};
export default Upcoming;
