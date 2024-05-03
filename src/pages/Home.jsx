import { VStack } from "@chakra-ui/react";
import ListAnime from "../components/home/ListAnime";
import useChangeDocTitle from "../hooks/useChangeDocTitle";

const Home = () => {
  useChangeDocTitle("AnimeGeek");

  return (
    <VStack spacing={10}>
      <ListAnime titlePage="Trending" path="/trending" useExploreMore />
      <ListAnime titlePage="Popular" path="/popular" useExploreMore />
      <ListAnime titlePage="Upcoming" path="/upcoming" useExploreMore />
    </VStack>
  );
};
export default Home;
