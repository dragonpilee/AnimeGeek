import { Heading, Stack, Text } from "@chakra-ui/react";
import { Fragment, useMemo } from "react";
import { useParams } from "react-router-dom";

const TitleAnime = ({ data }) => {
  const { anime_name } = useParams();

  const animeName = useMemo(() => {
    return decodeURI(anime_name);
  }, [anime_name]);

  const releaseYear = useMemo(() => {
    if (data?.first_air_date) return data.first_air_date.split("-")[0];
    if (data?.release_date) return data.release_date.split("-")[0];
    return null;
  }, [data]);

  return (
    <Stack spacing={4} textAlign={{ base: "center", md: "left" }} maxW="1600px" mx="auto" px={{ base: 6, md: 12 }}>
      <Heading
        as="h2"
        fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
        fontWeight="900"
        letterSpacing="tighter"
        lineHeight="1.1"
        className="text-shadow"
      >
        {animeName}
      </Heading>

      <Flex
        direction="row"
        gap={4}
        alignItems="center"
        justifyContent={{ base: "center", md: "flex-start" }}
        color="gray.400"
        fontSize="sm"
        fontWeight="bold"
      >
        {data?.vote_average > 0 && (
          <Text color="brand.500">★ {data.vote_average.toFixed(1)}</Text>
        )}
        {releaseYear && <Text>{releaseYear}</Text>}
        {data?.number_of_seasons && (
          <Text>{data.number_of_seasons} Seasons</Text>
        )}
        <Text px={2} py={0.5} border="1px solid" borderColor="gray.600" borderRadius="md" fontSize="xs">
          TV SHOW
        </Text>
      </Flex>

      {data?.genres?.length > 0 && (
        <Flex gap={2} flexWrap="wrap" justifyContent={{ base: "center", md: "flex-start" }}>
          {data.genres.slice(0, 3).map((genre) => (
            <Text
              key={genre.id}
              fontSize="xs"
              color="white"
              bg="rgba(255, 255, 255, 0.1)"
              px={3}
              py={1}
              borderRadius="full"
              fontWeight="600"
            >
              {genre.name}
            </Text>
          ))}
        </Flex>
      )}
    </Stack>
  );
};
export default TitleAnime;
