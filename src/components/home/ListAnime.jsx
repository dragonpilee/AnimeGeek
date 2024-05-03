import { IconButton, SimpleGrid, Stack, Text } from "@chakra-ui/react";
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

const ListAnime = ({ titlePage, path, useExploreMore = false }) => {
  const { sm } = useResponsive();

  const navigate = useNavigate();

  const [page, setPage] = useSearchParams();

  const [newPage, setNewPage] = useState(0);

  const pageValue = useMemo(() => {
    return page.get("page");
  }, [page]);

  const { data, loading, error, refetch } = useFetchData(
    `${path}${pageValue ? `?page=${pageValue}` : ""}`
  );

  const arrDatas = useMemo(() => {
    if (!loading && data) {
      if (useExploreMore) {
        return data?.results?.slice(0, 3);
      }
      return data?.results;
    }
  }, [data, loading]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location?.search]);

  return (
    <Stack spacing={10} direction="column">
      <Stack direction="row">
        {!useExploreMore && (
          <IconButton
            borderRadius={"full"}
            icon={<HomeIcon />}
            colorScheme="teal"
            variant="outline"
            onClick={() => navigate("/")}
          />
        )}
        <Text as="h2" fontSize={sm ? "2xl" : "4xl"} fontWeight="bold">
          {titlePage}
        </Text>
      </Stack>
      {error ? (
        <ErrorPage
          btnAction={{
            onClick: () => {
              refetch();
            },
            text: "Refresh",
          }}
          title="Erorr"
          subTitle={error}
          src={imageError}
        />
      ) : (
        <>
          {loading ? (
            <Loading />
          ) : (
            <Stack direction="column" spacing={10}>
              {arrDatas?.length ? (
                <>
                  <SimpleGrid columns={sm ? 1 : 2} gap={10} alignItems="center">
                    {arrDatas?.map((item, key) => (
                      <CardAnime data={item} key={key} />
                    ))}

                    {useExploreMore && (
                      <IconButton
                        onClick={() => navigate(path)}
                        colorScheme="teal"
                        aria-label="More Explore"
                        size="lg"
                        variant="outline"
                        borderRadius="full"
                        width={sm ? "full" : 100}
                        height={100}
                        fontSize={36}
                        margin="auto"
                        icon={<ArrowForwardIcon />}
                      />
                    )}
                  </SimpleGrid>
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
