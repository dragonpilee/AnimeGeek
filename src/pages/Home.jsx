import { VStack } from "@chakra-ui/react";
import ListAnime from "../components/home/ListAnime";
import useChangeDocTitle from "../hooks/useChangeDocTitle";

const Home = () => {
  useChangeDocTitle("AnimeGeek");

  return (
    <VStack spacing={10}>
      <ListAnime titlePage="Trending" path="/trending/tv/day" useExploreMore />
      <ListAnime titlePage="Popular" path="/tv/popular" useExploreMore />
      <ListAnime titlePage="Top Rated" path="/tv/top_rated" useExploreMore />
    </VStack>
  );
};
export default Home;
