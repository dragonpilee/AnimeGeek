import {
  IconButton,
  Stack,
  Tag,
  Text,
  Tooltip,
  Wrap,
} from "@chakra-ui/react";
import VideoIcon from "../../../assets/custom-icons/VideoIcon";
import CardAnimeModal from "./CardAnimeModal";
import { useState } from "react";

const CardAnimeFooter = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Stack spacing={2} width="100%">
      <Wrap spacing={2}>
        {data?.genres?.slice(0, 3).map((genre, idx) => (
          <Tag key={idx} size="sm" bg="brand.500" color="white">
            {genre}
          </Tag>
        ))}
      </Wrap>

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Text fontSize="sm" color="gray.400">
          {data?.type} • {data?.totalEpisodes} Eps
        </Text>

        {data?.trailer?.id && (
          <Tooltip label="Trailer" hasArrow>
            <IconButton
              size="sm"
              borderRadius="full"
              icon={<VideoIcon />}
              colorScheme="brand"
              variant="ghost"
              onClick={(e) => {
                e?.preventDefault();
                setIsOpen(true);
              }}
            />
          </Tooltip>
        )}
      </Stack>
      <CardAnimeModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        data={data}
      />
    </Stack>
  );
};
export default CardAnimeFooter;
