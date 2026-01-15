import { Heading, SimpleGrid, Stack, Text, Box, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from "@chakra-ui/react";
import useResponsive from "../../../hooks/useResponsive";
import BgImage from "../../global/BgImage";
import formatWord from "../../../helpers/formatWord";
import { useEpisodeAnimeContext } from "./EpisodesAnimeContextProvider";
import CardData from "../../global/CardData";
import { useMemo } from "react";

const EpisodesAnimeList = () => {
  const { sm } = useResponsive();
  const { data, openModalVideo } = useEpisodeAnimeContext();

  // Handle both flat episodes array and seasons structure
  const episodesData = useMemo(() => {
    if (!data) return { episodes: [], hasSeasons: false };
    
    // Check if episodes is a flat array
    if (Array.isArray(data.episodes) && data.episodes.length > 0) {
      return { episodes: data.episodes, hasSeasons: false };
    }
    
    // Check if episodes are grouped by seasons
    if (data.seasons && Array.isArray(data.seasons)) {
      const allEpisodes = [];
      data.seasons.forEach((season) => {
        if (season.episodes && Array.isArray(season.episodes)) {
          allEpisodes.push(...season.episodes);
        }
      });
      return { episodes: allEpisodes, hasSeasons: true, seasons: data.seasons };
    }
    
    return { episodes: [], hasSeasons: false };
  }, [data]);

  const renderEpisode = (episode, index) => {
    if (!episode || !episode.id) return null;
    
    return (
      <BgImage
        useOverlay
        key={episode.id || index}
        cursor="pointer"
        src={episode.image || episode.img || data?.image}
        onClick={(e) => {
          openModalVideo(e, episode.id);
        }}
        minH="120px"
      >
        <Stack
          direction="column"
          spacing={2}
          bottom={5}
          left={2}
          pos="absolute"
        >
          <Heading as="h3" fontSize={sm ? 12 : "xl"}>
            {formatWord(episode.title || episode.name || `Episode ${episode.number || index + 1}`)}
          </Heading>
          <Text {...(sm && { fontSize: 10 })}>
            Episode {episode.number || index + 1}
          </Text>
        </Stack>
      </BgImage>
    );
  };

  if (!episodesData.episodes || episodesData.episodes.length === 0) {
    return (
      <CardData useDefault header={<Heading>Episodes</Heading>}>
        <Box p={5} textAlign="center">
          <Text>No episodes available</Text>
        </Box>
      </CardData>
    );
  }

  // Render with seasons if available
  if (episodesData.hasSeasons && episodesData.seasons) {
    return (
      <CardData useDefault header={<Heading>Episodes</Heading>}>
        <Accordion allowMultiple>
          {episodesData.seasons.map((season, seasonIndex) => {
            if (!season.episodes || season.episodes.length === 0) return null;
            
            return (
              <AccordionItem key={season.number || seasonIndex}>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Heading as="h4" fontSize="lg">
                      {season.title || `Season ${season.number || seasonIndex + 1}`}
                    </Heading>
                    <Text fontSize="sm" color="gray.500">
                      {season.episodes.length} episodes
                    </Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <SimpleGrid columns={sm ? 2 : 3} spacing={5}>
                    {season.episodes.map((episode, index) => 
                      renderEpisode(episode, index)
                    )}
                  </SimpleGrid>
                </AccordionPanel>
              </AccordionItem>
            );
          })}
        </Accordion>
      </CardData>
    );
  }

  // Render flat episodes list
  return (
    <CardData useDefault header={<Heading>Episodes ({episodesData.episodes.length})</Heading>}>
      <SimpleGrid columns={sm ? 2 : 3} spacing={5}>
        {episodesData.episodes.map((episode, index) => 
          renderEpisode(episode, index)
        )}
      </SimpleGrid>
    </CardData>
  );
};
export default EpisodesAnimeList;
