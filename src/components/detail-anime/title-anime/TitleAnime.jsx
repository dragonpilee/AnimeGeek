import { Heading, Stack, Text } from "@chakra-ui/react";
import { Fragment, useMemo } from "react";
import { useParams } from "react-router-dom";

const TitleAnime = ({ data }) => {
  const { anime_name } = useParams();

  const animeName = useMemo(() => {
    return decodeURI(anime_name);
  }, [anime_name]);

  return (
    <Stack textAlign="center">
      <Heading as="h2">{animeName}</Heading>
      {Object.keys(data)?.length > 0 ? (
        <Stack direction="row" margin="auto">
          <Text>{data?.type}</Text>
          {data?.studios?.length > 0 ? (
            <>
              <Text>•</Text>
              <Text>{data?.studios?.join(", ")}</Text>
            </>
          ) : (
            <Fragment />
          )}
        </Stack>
      ) : (
        <Fragment />
      )}
    </Stack>
  );
};
export default TitleAnime;
