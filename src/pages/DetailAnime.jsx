import { lazy, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Button, Stack } from "@chakra-ui/react";
import useFetchData from "../hooks/useFetchData";
import Loading from "../components/global/Loading";
import useChangeDocTitle from "../hooks/useChangeDocTitle";
import Box from "../components/global/Box";
import { DEFAULT_PROVIDER } from "../constants";
import useProvider from "../hooks/useProvider";

const CoverAnime = lazy(() =>
  import("../components/detail-anime/cover-anime/CoverAnime")
);
const CharacterAnime = lazy(() =>
  import("../components/detail-anime/character-anime/CharacterAnime")
);
const DescriptionAnime = lazy(() =>
  import("../components/detail-anime/description-anime/DescriptionAnime")
);
const EpisodesAnime = lazy(() =>
  import("../components/detail-anime/episodes-anime/EpisodesAnime")
);
const RecommendationAnime = lazy(() =>
  import("../components/detail-anime/recommendation-anime/RecommendationAnime")
);
const RelationsAnime = lazy(() =>
  import("../components/detail-anime/relations-anime/RelationsAnime")
);
const TitleAnime = lazy(() =>
  import("../components/detail-anime/title-anime/TitleAnime")
);

const DetailAnime = () => {
  const { id, anime_name } = useParams();
  const { state, pathname } = useLocation();
  const { currentProvider } = useProvider();

  const { data: detailData, loading } = useFetchData(`/info/${id}?fetchFiller=true&dub=false&provider=${currentProvider}`);

  useChangeDocTitle(`AnimeGeek | ${decodeURI(anime_name)}`);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Debug: Log data structure
  useEffect(() => {
    if (detailData) {
      console.log("Anime Detail Data:", detailData);
      console.log("Episodes:", detailData.episodes);
      console.log("Seasons:", detailData.seasons);
    }
  }, [detailData]);

  return (
    <Stack direction="column" spacing={10}>
      {state && (
        <Link to={state?.prevPath}>
          <Box>
            <Button>Back</Button>
          </Box>
        </Link>
      )}

      <Box useSuspense height={480}>
        <CoverAnime src={detailData?.image} srcBg={detailData?.cover} />
      </Box>

      <Box useSuspense>
        <TitleAnime data={detailData} />
      </Box>

      {loading ? (
        <Loading />
      ) : (
        <>
          <Box useSuspense>
            <DescriptionAnime data={detailData} />
          </Box>

          {/* Always show Episodes component - it will handle empty state internally */}
          <Box useSuspense>
            <EpisodesAnime data={detailData} />
          </Box>

          <Box showIf={detailData?.relations?.length > 0} useSuspense>
            <RelationsAnime data={detailData} />
          </Box>

          <Box showIf={detailData?.characters?.length > 0} useSuspense>
            <CharacterAnime data={detailData} />
          </Box>

          <Box showIf={detailData?.recommendations?.length > 0} useSuspense>
            <RecommendationAnime data={detailData} />
          </Box>
        </>
      )}
    </Stack>
  );
};
export default DetailAnime;
