import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import CardAnimeFooter from "./CardAnimeFooter";
import CardData from "../../global/CardData";
import CardAnimeContent from "./CardAnimeContent";
import "../../../style/card.css";

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
      <CardData className="_card" footer={<CardAnimeFooter data={data} />}>
        <CardAnimeContent data={data} />
      </CardData>
    </Link>
  );
};
export default CardAnime;
