import { Grid, GridItem, Heading, Text, Stack } from "@chakra-ui/react";
import useResponsive from "../../../hooks/useResponsive";
import DescriptionAnimeInfo from "./DescriptionAnimeInfo";
import DescriptionAnimeTrailer from "./DescriptionAnimeTrailer";
import Box from "../../global/Box";

const DescriptionAnime = ({ data }) => {
  const { sm } = useResponsive();

  return (
    <Stack spacing={12} maxW="1600px" mx="auto" px={{ base: 6, md: 12 }} pt={10}>
      <Grid
        gap={12}
        templateColumns={{ base: "1fr", lg: "2fr 1fr" }}
      >
        <GridItem>
          <Stack spacing={6}>
            <Heading as="h3" size="lg" fontWeight="900" letterSpacing="tight">
              OVERVIEW
            </Heading>
            <Text
              fontSize="md"
              lineHeight="1.8"
              color="gray.300"
              dangerouslySetInnerHTML={{
                __html: data?.description || "No description available.",
              }}
            />

            <Box showIf={data?.trailer && Object.keys(data?.trailer)?.length > 0}>
              <DescriptionAnimeTrailer data={data} />
            </Box>
          </Stack>
        </GridItem>

        <GridItem>
          <DescriptionAnimeInfo data={data} />
        </GridItem>
      </Grid>
    </Stack>
  );
};

export default DescriptionAnime;
