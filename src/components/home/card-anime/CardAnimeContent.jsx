import { Box, AspectRatio, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import Image from "../../global/Image";
import useResponsive from "../../../hooks/useResponsive";
import imageError from "../../../assets/image_error.png";

const CardAnimeContent = ({ data }) => {
  const { sm } = useResponsive();

  const title = useMemo(() => {
    return data?.name || data?.title || "Unknown Title";
  }, [data]);

  const images = useMemo(() => {
    if (data?.poster_path) {
      return `https://image.tmdb.org/t/p/w500${data.poster_path}`;
    }
    return data?.image || imageError;
  }, [data]);

  return (
    <Box position="relative" overflow="hidden">
      {/* Background/Poster Image */}
      <AspectRatio ratio={2 / 3}>
        <Image
          src={images}
          alt={title}
          fallbackSrc={imageError}
          objectFit="cover"
          transition="all 0.5s ease"
          _groupHover={{ transform: "scale(1.1)" }}
        />
      </AspectRatio>

      {/* Hover Overlay */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 30%, transparent 100%)"
        opacity={0}
        transition="all 0.3s ease"
        _groupHover={{ opacity: 1 }}
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
        p={4}
      >
        <Text
          color="white"
          fontSize="sm"
          fontWeight="bold"
          noOfLines={2}
          className="text-shadow"
          transition="color 0.2s"
          _groupHover={{ color: "brand.300" }}
        >
          {title}
        </Text>
        {data.vote_average && (
          <Text color="brand.500" fontSize="xs" fontWeight="bold" mt={1}>
            ★ {data.vote_average.toFixed(1)}
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default CardAnimeContent;
