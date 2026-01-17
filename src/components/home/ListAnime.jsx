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
  const navigate = useNavigate();
  const [page, setPage] = useSearchParams();
  const [newPage, setNewPage] = useState(0);

  const pageValue = useMemo(() => {
    return page.get("page");
  }, [page]);

  const apiPath = useMemo(() => {
    const separator = path.includes("?") ? "&" : "?";
    const pageParam = pageValue ? `${separator}page=${pageValue}` : "";
    return `${path}${pageParam}`;
  }, [path, pageValue]);

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
    <Stack spacing={4} direction="column" w="full" maxW="1600px" mx="auto">
      <Flex
        alignItems="flex-end"
        justifyContent="space-between"
        px={{ base: 2, sm: 4 }}
      >
        <Stack spacing={0}>
          <Text
            as="h2"
            fontSize={{ base: "xl", md: "3xl" }}
            fontWeight="900"
            letterSpacing="tight"
            className="text-shadow"
            color="white"
          >
            {titlePage}
          </Text>
          <Box h="2px" w="40px" bg="brand.500" borderRadius="full" />
        </Stack>
        {useExploreMore && (
          <Button
            onClick={() => navigate(path)}
            variant="ghost"
            size="sm"
            color="gray.400"
            _hover={{ color: "brand.500", bg: "transparent" }}
            rightIcon={<ArrowForwardIcon />}
            fontWeight="bold"
            fontSize="xs"
            letterSpacing="widest"
          >
            SEE ALL
          </Button>
        )}
      </Flex>

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
        <Box position="relative">
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
                        minW={{ base: "140px", sm: "160px", md: "180px", lg: "200px" }}
                        maxW={{ base: "140px", sm: "160px", md: "180px", lg: "200px" }}
                        px={1}
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
                <Text color="gray.500" textAlign="center" py={10}>No content found.</Text>
              )}
            </Stack>
          )}
        </Box>
      )}
    </Stack>
  );
};
export default ListAnime;
