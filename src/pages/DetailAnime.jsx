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

  // For TMDB, we usually want to know if it's a TV show or Movie. 
  // For now, assume TV as it's the most common for anime list, but we can detect or default.
  const { data: detailData, loading } = useFetchData(`/tv/${id}?append_to_response=recommendations,credits,similar`);

  // Map TMDB fields to component expectations
  const mappedData = useMemo(() => {
    if (!detailData) return null;
    return {
      ...detailData,
      title: { romaji: detailData.name || detailData.title },
      image: detailData.poster_path ? `https://image.tmdb.org/t/p/w500${detailData.poster_path}` : null,
      cover: detailData.backdrop_path ? `https://image.tmdb.org/t/p/original${detailData.backdrop_path}` : null,
      description: detailData.overview,
      characters: detailData.credits?.cast?.map(c => ({
        id: c.id,
        name: { full: c.name },
        image: c.profile_path ? `https://image.tmdb.org/t/p/w200${c.profile_path}` : null,
        role: c.character
      })),
      recommendations: detailData.recommendations?.results?.map(r => ({
        id: r.id,
        title: { romaji: r.name || r.title },
        image: r.poster_path ? `https://image.tmdb.org/t/p/w300${r.poster_path}` : null
      }))
    };
  }, [detailData]);

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
    <Box position="relative">
      {/* Back Button */}
      {state && (
        <Box
          position="absolute"
          top={4}
          left={6}
          zIndex={1001}
        >
          <Link to={state?.prevPath}>
            <Button variant="glass" size="sm">
              Back
            </Button>
          </Link>
        </Box>
      )}

      {/* Cinematic Cover/Backdrop */}
      <Box useSuspense>
        <CoverAnime src={mappedData?.image} srcBg={mappedData?.cover} />
      </Box>

      {/* Content Section */}
      <Stack spacing={12} position="relative" mt={{ base: 4, md: -12 }} pb={20}>
        <Box useSuspense>
          <TitleAnime data={mappedData} />
        </Box>

        {loading ? (
          <Box py={20}><Loading /></Box>
        ) : (
          <Stack spacing={16}>
            <Box useSuspense>
              <DescriptionAnime data={mappedData} />
            </Box>

            <Box useSuspense>
              <EpisodesAnime data={mappedData} />
            </Box>

            {mappedData?.characters?.length > 0 && (
              <Box useSuspense>
                <CharacterAnime data={mappedData} />
              </Box>
            )}

            {mappedData?.recommendations?.length > 0 && (
              <Box useSuspense>
                <RecommendationAnime data={mappedData} />
              </Box>
            )}
          </Stack>
        )}
      </Stack>
    </Box>
  );
};
export default DetailAnime;
