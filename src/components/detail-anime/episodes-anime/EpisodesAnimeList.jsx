import { Heading, SimpleGrid, Stack, Text, Box, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from "@chakra-ui/react";
import useResponsive from "../../../hooks/useResponsive";
import BgImage from "../../global/BgImage";
import formatWord from "../../../helpers/formatWord";
import { useEpisodeAnimeContext } from "./EpisodesAnimeContextProvider";
import CardData from "../../global/CardData";
import { useMemo } from "react";

const EpisodesAnimeList = () => {
  const { sm } = useResponsive();
  const { data, openModalVideo, currentEpisodes, activeSeason, fetchSeasonEpisodes, loadingEpisodes } = useEpisodeAnimeContext();

  const renderEpisode = (episode, index) => {
    if (!episode) return null;

    return (
      <BgImage
        useOverlay
        key={episode.id || index}
        cursor="pointer"
        src={episode.still_path ? `https://image.tmdb.org/t/p/w300${episode.still_path}` : data?.image}
        onClick={(e) => {
          openModalVideo(e, episode.episode_number);
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
            {episode.name || `Episode ${episode.episode_number}`}
          </Heading>
          <Text {...(sm && { fontSize: 10 })}>
            Episode {episode.episode_number}
          </Text>
        </Stack>
      </BgImage>
    );
  };

  if (!data?.seasons || data.seasons.length === 0) {
    return (
      <CardData useDefault header={<Heading>Episodes</Heading>}>
        <Box p={5} textAlign="center">
          <Text>No episodes available</Text>
        </Box>
      </CardData>
    );
  }

  return (
    <CardData useDefault header={<Heading>Episodes</Heading>}>
      <Accordion allowMultiple defaultIndex={[0]}>
        {data.seasons.map((season, seasonIndex) => {
          if (season.season_number === 0) return null; // Skip specials usually

          return (
            <AccordionItem key={season.id || seasonIndex}>
              <AccordionButton onClick={() => fetchSeasonEpisodes(season.season_number)}>
                <Box flex="1" textAlign="left">
                  <Heading as="h4" fontSize="lg">
                    {season.name || `Season ${season.season_number}`}
                  </Heading>
                  <Text fontSize="sm" color="gray.500">
                    {season.episode_count} episodes
                  </Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                {loadingEpisodes && activeSeason === season.season_number ? (
                  <Loading />
                ) : (
                  <SimpleGrid columns={sm ? 2 : 3} spacing={5}>
                    {activeSeason === season.season_number && currentEpisodes.map((episode, index) =>
                      renderEpisode(episode, index)
                    )}
                  </SimpleGrid>
                )}
              </AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </CardData>
  );
};
export default EpisodesAnimeList;
