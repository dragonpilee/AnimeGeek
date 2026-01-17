import { Heading, Tooltip, Box, keyframes } from "@chakra-ui/react";
import { useMemo } from "react";
import Image from "../../global/Image";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const CardAnimeContent = ({ data }) => {
  const title = useMemo(() => {
    return data?.name || data?.title || "Unknown Title";
  }, [data]);

  const imageUrl = useMemo(() => {
    if (data?.poster_path) {
      return `https://image.tmdb.org/t/p/w500${data.poster_path}`;
    }
    return data?.image || ""; // Fallback
  }, [data]);

  return (
    <Box
      position="relative"
      overflow="hidden"
      borderRadius="8px"
      animation={`${fadeIn} 0.4s ease-out`}
    >
      <Image
        src={imageUrl}
        w="100%"
        h={{ base: "240px", sm: "260px", md: "280px", lg: "300px" }}
        objectFit="cover"
        transition="transform 0.3s ease"
        _groupHover={{ transform: "scale(1.05)" }}
      />
      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        bg="linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 50%, transparent 100%)"
        p={{ base: 2, md: 3 }}
        transition="all 0.3s"
      >
        <Tooltip {...(title?.length > 30 && { label: title })}>
          <Heading
            as="h3"
            size="sm"
            noOfLines={2}
            color="white"
            fontWeight="600"
            transition="color 0.2s"
            _groupHover={{ color: "brand.400" }}
          >
            {title}
          </Heading>
        </Tooltip>
      </Box>
    </Box>
  );
};
export default CardAnimeContent;
