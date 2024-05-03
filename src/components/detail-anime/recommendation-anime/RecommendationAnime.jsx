import { Heading, Text } from "@chakra-ui/react";
import CardData from "../../global/CardData";
import { useMemo } from "react";
import formatWord from "../../../helpers/formatWord";
import CarouselAnime from "../../global/CarouselAnime";

const RecommendationAnime = ({ data }) => {
  const datasCarousel = useMemo(() => {
    return data?.recommendations?.map((item) => ({
      id: item?.id,
      title: item?.title?.romaji,
      subTitle: <Text>{formatWord(item?.type)}</Text>,
      cover: item?.cover,
    }));
  }, [data]);

  return (
    <CardData useDefault header={<Heading>Recommendations</Heading>}>
      <CarouselAnime arrDatas={datasCarousel} />
    </CardData>
  );
};
export default RecommendationAnime;
