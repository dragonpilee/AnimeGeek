import {
  IconButton,
  SimpleGrid,
  Stack,
  Tag,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import VideoIcon from "../../../assets/custom-icons/VideoIcon";
import CardAnimeModal from "./CardAnimeModal";
import { useState } from "react";
import useResponsive from "../../../hooks/useResponsive";

const CardAnimeFooter = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { sm } = useResponsive();

  return (
    <Stack
      direction={sm ? "column" : "row"}
      wrap
      justifyContent="space-between"
      width="100%"
      alignItems="center"
    >
      <SimpleGrid columns={3} spacing={5}>
        {data?.genres?.map((genre, idx) => (
          <Tag key={idx}>{genre}</Tag>
        ))}
      </SimpleGrid>

      <Stack direction="row">
        <Text>{data?.type}</Text>
        <Text>•</Text>
        <Text>{data?.totalEpisodes} Episodes</Text>
      </Stack>

      {data?.trailer?.id && (
        <Tooltip label="Trailer" hasArrow>
          <IconButton
            borderRadius="full"
            borderWidth={0}
            icon={<VideoIcon />}
            colorScheme="teal"
            size="lg"
            variant="outline"
            style={{ color: "white" }}
            onClick={(e) => {
              e?.preventDefault();
              setIsOpen(true);
            }}
          />
        </Tooltip>
      )}
      <CardAnimeModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        data={data}
      />
    </Stack>
  );
};
export default CardAnimeFooter;
