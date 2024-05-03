import { Heading, Stack, Text } from "@chakra-ui/react";
import CardData from "../../global/CardData";
import { Fragment } from "react";
import formatWord from "../../../helpers/formatWord";

const DescriptionAnimeInfo = ({ data }) => {
  const detailInfoKeys = [
    "genres",
    "status",
    "type",
    "totalEpisodes",
    "releaseDate",
    "season",
  ];
  const isExistData = (d) => {
    return d?.length > 0 && d;
  };

  const proccInfo = (d) => {
    if (Array.isArray(d)) {
      return d?.join(", ");
    }
    return d;
  };
  return (
    <CardData
      header={<Heading>Info</Heading>}
      useDefault
      height={300}
      className="description"
    >
      <Stack direction="column">
        {detailInfoKeys?.map((infoKey) => {
          return (
            <Fragment key={infoKey}>
              {isExistData(data?.[infoKey]) && (
                <Text>
                  {formatWord(infoKey)} : {proccInfo(data?.[infoKey])}
                </Text>
              )}
            </Fragment>
          );
        })}
      </Stack>
    </CardData>
  );
};
export default DescriptionAnimeInfo;
