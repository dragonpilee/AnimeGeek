import { Heading, Text } from "@chakra-ui/react";
import CardData from "../../global/CardData";
import { useMemo } from "react";
import formatWord from "../../../helpers/formatWord";
import CarouselAnime from "../../global/CarouselAnime";

const RecommendationAnime = ({ data }) => {
  const datasCarousel = useMemo(() => {
    return data?.recommendations?.map((item) => ({
      id: item?.id,
      title: item?.title?.romaji || item?.title?.english || item?.title?.userPreferred,
      subTitle: <Text color="brand.500" fontWeight="bold" fontSize="xs">{formatWord(item?.type)}</Text>,
      image: item?.image, // TMDb mapping uses 'image' in DetailAnime.jsx
    }));
  }, [data]);

  if (!datasCarousel?.length) return null;

  return (
    <Stack spacing={6} maxW="1600px" mx="auto" px={{ base: 6, md: 12 }} pt={10}>
      <Stack spacing={1}>
        <Heading as="h2" size="xl" fontWeight="900" letterSpacing="tight">
          RECOMMENDATIONS
        </Heading>
        <Box h="2px" w="40px" bg="brand.500" borderRadius="full" />
      </Stack>
      <Box position="relative" mt={4}>
        <CarouselAnime arrDatas={datasCarousel} />
      </Box>
    </Stack>
  );
};
export default RecommendationAnime;
