import { Box, VStack } from "@chakra-ui/react";
import ListAnime from "../components/home/ListAnime";
import Hero from "../components/home/Hero";
import useChangeDocTitle from "../hooks/useChangeDocTitle";

const Home = () => {
  useChangeDocTitle("CINEBY ANIME");

  return (
    <Box>
      <Hero />
      <VStack spacing={16} py={12} px={{ base: 4, md: 8 }}>
        <ListAnime titlePage="Trending Now" path="/trending/tv/day" useExploreMore />
        <ListAnime titlePage="Highly Popular" path="/tv/popular" useExploreMore />
        <ListAnime titlePage="Top Rated" path="/tv/top_rated" useExploreMore />
      </VStack>
    </Box>
  );
};
export default Home;
