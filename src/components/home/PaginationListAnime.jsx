import { Button, Flex, NumberInput, NumberInputField } from "@chakra-ui/react";

const PaginationListAnime = ({
  loading,
  data,
  currPage,
  page,
  setPage,
  newPage,
  setNewPage,
}) => {
  const setNewParamPage = (newParamPage) => {
    page.set("page", newParamPage);
    setPage(page);
  };

  return (
    <>
      {!loading && (
        <>
          <Flex justifyContent="center" gap={10}>
            {data?.currentPage !== 1 && (
              <Button
                onClick={() => {
                  setNewParamPage(currPage - 1);
                }}
                variant="outline"
              >
                Previous
              </Button>
            )}

            <NumberInput
              min={1}
              width={100}
              defaultValue={currPage || 1}
              onChange={(newPage) => {
                if (/^[0-9]+$/.test(newPage)) {
                  if (Number(newPage) > 0) {
                    setNewPage(newPage);
                  } else {
                    setNewPage(1);
                  }
                }
              }}
              onKeyUp={(e) => {
                if (e?.code?.toLowerCase() === "enter") {
                  setNewParamPage(newPage);
                }
              }}
            >
              <NumberInputField textAlign="center" />
            </NumberInput>

            {data?.hasNextPage && (
              <Button
                onClick={() => {
                  let newPageValue = 0;
                  if (currPage) {
                    newPageValue = Number(currPage) + 1;
                  } else {
                    newPageValue = 2;
                  }

                  setNewParamPage(newPageValue);
                }}
              >
                Next
              </Button>
            )}
          </Flex>
        </>
      )}
    </>
  );
};
export default PaginationListAnime;
