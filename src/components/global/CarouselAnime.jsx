import { Box, Flex, Heading, Stack, Text, AspectRatio, Image as ChakraImage } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useResponsive from "../../hooks/useResponsive";
import HorizontalScroll from "./HorizontalScroll";
import formatWord from "../../helpers/formatWord";
import Image from "./Image";
import imageError from "../../assets/image_error.png";

const CarouselAnime = ({ arrDatas }) => {
  const { sm } = useResponsive();

  if (!arrDatas?.length) return null;

  return (
    <HorizontalScroll>
      {arrDatas.map((item, key) => (
        <Box
          key={key}
          minW={{ base: "140px", sm: "160px", md: "180px", lg: "200px" }}
          maxW={{ base: "140px", sm: "160px", md: "180px", lg: "200px" }}
          px={2}
          role="group"
          transition="transform 0.3s ease"
        >
          <Link to={`/anime/${item?.id}/${encodeURIComponent(item?.title)}`}>
            <Box position="relative" overflow="hidden" borderRadius="md" border="1px solid" borderColor="rgba(255,255,255,0.05)">
              <AspectRatio ratio={2 / 3}>
                <Image
                  src={item.image || item.cover}
                  alt={item.title}
                  fallbackSrc={imageError}
                  objectFit="cover"
                  transition="all 0.5s ease"
                  _groupHover={{ transform: "scale(1.1)" }}
                />
              </AspectRatio>
              {/* Hover Overlay */}
              <Box
                position="absolute"
                inset={0}
                bg="linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 40%, transparent 100%)"
                opacity={0}
                _groupHover={{ opacity: 1 }}
                transition="opacity 0.3s ease"
                display="flex"
                flexDirection="column"
                justifyContent="flex-end"
                p={4}
              >
                <Text
                  color="white"
                  fontSize="xs"
                  fontWeight="bold"
                  noOfLines={2}
                  className="text-shadow"
                >
                  {item.title}
                </Text>
                {item.subTitle}
              </Box>
            </Box>
          </Link>
        </Box>
      ))}
    </HorizontalScroll>
  );
};

export default CarouselAnime;
