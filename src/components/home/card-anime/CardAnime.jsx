import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import CardAnimeFooter from "./CardAnimeFooter";
import CardData from "../../global/CardData";
import CardAnimeContent from "./CardAnimeContent";
import { Box } from "@chakra-ui/react";

const CardAnime = ({ data }) => {
  const { pathname, search } = useLocation();

  const title = useMemo(() => {
    return data?.title?.romaji;
  }, [data]);

  return (
    <Link
      to={`/anime/${data?.id}/${title}`}
      state={{
        prevPath: `${pathname}${search}`,
      }}
    >
      <Box role="group">
        <CardData footer={<CardAnimeFooter data={data} />}>
          <CardAnimeContent data={data} />
        </CardData>
      </Box>
    </Link>
  );
};
export default CardAnime;
