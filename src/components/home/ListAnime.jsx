import { IconButton, Stack, Text, Box } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import Loading from "../global/Loading";
import PaginationListAnime from "./PaginationListAnime";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import HomeIcon from "../../assets/custom-icons/HomeIcon";
import CardAnime from "./card-anime/CardAnime";
import useResponsive from "../../hooks/useResponsive";
import ErrorPage from "../global/ErrorPage";
import imageError from "../../assets/image_error.png";
import HorizontalScroll from "../global/HorizontalScroll";
import useProvider from "../../hooks/useProvider";

const ListAnime = ({ titlePage, path, useExploreMore = false }) => {
  const { sm } = useResponsive();
  const { currentProvider } = useProvider();

  const navigate = useNavigate();

  const [page, setPage] = useSearchParams();

  const [newPage, setNewPage] = useState(0);

  const pageValue = useMemo(() => {
    return page.get("page");
  }, [page]);

  // Construct API path with provider parameter
  const apiPath = useMemo(() => {
    const separator = path.includes("?") ? "&" : "?";
    const providerParam = `provider=${currentProvider}`;
    const pageParam = pageValue ? `&page=${pageValue}` : "";
    
    // Add provider parameter and page if needed
    return `${path}${separator}${providerParam}${pageParam}`;
  }, [path, pageValue, currentProvider]);

  const { data, loading, error, refetch } = useFetchData(apiPath);

  const arrDatas = useMemo(() => {
    if (!loading && data) {
      if (useExploreMore) {
        return data?.results?.slice(0, 10);
      }
      return data?.results;
    }
  }, [data, loading]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location?.search]);

  return (
    <Stack spacing={6} direction="column">
      <Stack
        direction={{ base: "column", sm: "row" }}
        alignItems={{ base: "flex-start", sm: "center" }}
        justifyContent="space-between"
        spacing={{ base: 2, sm: 0 }}
      >
        <Stack direction="row" alignItems="center">
          {!useExploreMore && (
            <IconButton
              borderRadius={"full"}
              icon={<HomeIcon />}
              colorScheme="brand"
              variant="ghost"
              size={{ base: "sm", md: "md" }}
              onClick={() => navigate("/")}
            />
          )}
          <Text
            as="h2"
            fontSize={{ base: "lg", sm: "xl", md: "2xl", lg: "3xl" }}
            fontWeight="bold"
          >
            {titlePage}
          </Text>
        </Stack>
        {useExploreMore && (
          <IconButton
            onClick={() => navigate(path)}
            colorScheme="brand"
            aria-label="View All"
            size={{ base: "sm", md: "md" }}
            variant="ghost"
            icon={<ArrowForwardIcon />}
          />
        )}
      </Stack>
      {error ? (
        <ErrorPage
          btnAction={{
            onClick: () => {
              refetch();
            },
            text: "Refresh",
          }}
          title="Error"
          subTitle={error}
          src={imageError}
        />
      ) : (
        <>
          {loading ? (
            <Loading />
          ) : (
            <Stack direction="column" spacing={6}>
              {arrDatas?.length ? (
                <>
                  <HorizontalScroll>
                    {arrDatas?.map((item, key) => (
                      <Box
                        key={key}
                        minW={{ base: "160px", sm: "180px", md: "200px", lg: "220px" }}
                        maxW={{ base: "160px", sm: "180px", md: "200px", lg: "220px" }}
                        transition="transform 0.2s"
                        _hover={{ transform: "scale(1.02)" }}
                      >
                        <CardAnime data={item} />
                      </Box>
                    ))}
                  </HorizontalScroll>
                  <div>
                    {!useExploreMore && data?.hasNextPage && (
                      <PaginationListAnime
                        currPage={pageValue}
                        data={data}
                        loading={loading}
                        newPage={newPage}
                        page={page}
                        setNewPage={setNewPage}
                        setPage={setPage}
                      />
                    )}
                  </div>
                </>
              ) : (
                <>No Data</>
              )}
            </Stack>
          )}
        </>
      )}
    </Stack>
  );
};
export default ListAnime;
