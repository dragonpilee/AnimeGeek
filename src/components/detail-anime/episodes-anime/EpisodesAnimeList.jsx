import { Heading, SimpleGrid, Stack, Text, Box, Flex, Button, AspectRatio, Image as ChakraImage } from "@chakra-ui/react";
import useResponsive from "../../../hooks/useResponsive";
import { useEpisodeAnimeContext } from "./EpisodesAnimeContextProvider";
import Loading from "../../global/Loading";
import { useMemo } from "react";

const EpisodesAnimeList = () => {
  const { sm } = useResponsive();
  const {
    data,
    openModalVideo,
    currentEpisodes,
    activeSeason,
    fetchSeasonEpisodes,
    loadingEpisodes
  } = useEpisodeAnimeContext();

  const renderEpisode = (episode, index) => {
    if (!episode) return null;

    return (
      <Box
        key={episode.id || index}
        cursor="pointer"
        role="group"
        onClick={(e) => openModalVideo(e, episode.episode_number)}
        transition="all 0.3s ease"
      >
        <AspectRatio ratio={16 / 9} borderRadius="md" overflow="hidden" mb={3} border="1px solid" borderColor="rgba(255,255,255,0.05)">
          <Box position="relative">
            <ChakraImage
              src={episode.still_path ? `https://image.tmdb.org/t/p/w400${episode.still_path}` : data?.image}
              alt={episode.name}
              objectFit="cover"
              w="100%"
              h="100%"
              transition="transform 0.5s ease"
              _groupHover={{ transform: "scale(1.1)" }}
            />
            {/* Play Button Overlay */}
            <Flex
              position="absolute"
              inset={0}
              bg="rgba(0,0,0,0.4)"
              opacity={0}
              _groupHover={{ opacity: 1 }}
              transition="opacity 0.3s ease"
              alignItems="center"
              justifyContent="center"
            >
              <Box bg="brand.500" p={3} borderRadius="full" boxShadow="0 0 20px rgba(229, 9, 20, 0.5)">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </Box>
            </Flex>
            <Box
              position="absolute"
              bottom={2}
              right={2}
              bg="rgba(0,0,0,0.8)"
              px={2}
              py={0.5}
              borderRadius="sm"
              fontSize="xs"
              fontWeight="bold"
            >
              EP {episode.episode_number}
            </Box>
          </Box>
        </AspectRatio>
        <Stack spacing={1}>
          <Heading as="h4" size="xs" noOfLines={1} color="white" transition="color 0.2s" _groupHover={{ color: "brand.500" }}>
            {episode.name || `Episode ${episode.episode_number}`}
          </Heading>
          <Text fontSize="xs" color="gray.500" noOfLines={2}>
            {episode.overview || "No description available."}
          </Text>
        </Stack>
      </Box>
    );
  };

  if (!data?.seasons || data.seasons.length === 0) return null;

  return (
    <Stack spacing={8} maxW="1600px" mx="auto" px={{ base: 6, md: 12 }} pt={10}>
      <Flex direction={{ base: "column", md: "row" }} gap={6} alignItems={{ base: "flex-start", md: "center" }} justifyContent="space-between">
        <Heading as="h2" size="xl" fontWeight="900" letterSpacing="tight">
          EPISODES
        </Heading>

        {/* Season Chips */}
        <Flex gap={2} flexWrap="wrap">
          {data.seasons.map((season) => {
            if (season.season_number === 0) return null;
            const isActive = activeSeason === season.season_number;
            return (
              <Button
                key={season.id}
                size="sm"
                variant={isActive ? "primary" : "glass"}
                onClick={() => fetchSeasonEpisodes(season.season_number)}
                borderRadius="full"
                fontSize="xs"
                fontWeight="800"
              >
                SEASON {season.season_number}
              </Button>
            );
          })}
        </Flex>
      </Flex>

      {loadingEpisodes ? (
        <Box py={20}><Loading /></Box>
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={8}>
          {currentEpisodes.map((episode, index) => renderEpisode(episode, index))}
        </SimpleGrid>
      )}
    </Stack>
  );
};

export default EpisodesAnimeList;
