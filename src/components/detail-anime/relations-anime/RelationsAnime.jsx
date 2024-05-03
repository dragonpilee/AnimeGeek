import { Heading, Text } from "@chakra-ui/react";
import CardData from "../../global/CardData";
import formatWord from "../../../helpers/formatWord";
import CarouselAnime from "../../global/CarouselAnime";
import { useMemo } from "react";

const RelationsAnime = ({ data }) => {
  const dataCarousel = useMemo(() => {
    return data?.relations?.map((item) => ({
      id: item?.id,
      title: item?.title?.romaji,
      subTitle: (
        <>
          <Text>{formatWord(item?.type)}</Text>
          <Text>•</Text>
          <Text>{formatWord(item?.relationType)}</Text>
        </>
      ),
      cover: item?.image,
    }));
  }, [data]);

  return (
    <CardData useDefault header={<Heading>Relations</Heading>}>
      <CarouselAnime arrDatas={dataCarousel} />
    </CardData>
  );
};
export default RelationsAnime;
