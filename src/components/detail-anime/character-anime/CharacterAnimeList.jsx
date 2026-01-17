import { Button, SimpleGrid, Stack, Text, Box, AspectRatio, Image as ChakraImage } from "@chakra-ui/react";
import useResponsive from "../../../hooks/useResponsive";
import Image from "../../global/Image";
import imageError from "../../../assets/image_error.png";

const CharacterAnimeList = ({ data, onOpenVA }) => {
  const { sm } = useResponsive();

  if (!data?.characters?.length) return null;

  return (
    <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 6 }} spacing={8}>
      {data.characters.map((char) => (
        <Stack key={char.id} spacing={4} role="group">
          <Box borderRadius="lg" overflow="hidden" border="1px solid" borderColor="rgba(255,255,255,0.05)">
            <AspectRatio ratio={1}>
              <Image
                src={char.image}
                alt={char.name?.full}
                fallbackSrc={imageError}
                objectFit="cover"
                transition="transform 0.5s ease"
                _groupHover={{ transform: "scale(1.1)" }}
              />
            </AspectRatio>
          </Box>

          <Stack spacing={1} textAlign="center">
            <Text fontWeight="bold" fontSize="sm" noOfLines={1} color="white">
              {char.name?.full}
            </Text>
            <Text fontSize="xs" color="brand.500" fontWeight="800" textTransform="uppercase" letterSpacing="widest">
              {char.role}
            </Text>
          </Stack>

          <Button
            size="sm"
            variant="glass"
            borderRadius="full"
            fontSize="xs"
            onClick={() => onOpenVA(char)}
            _groupHover={{ variant: "primary" }}
          >
            Voice Actors
          </Button>
        </Stack>
      ))}
    </SimpleGrid>
  );
};

export default CharacterAnimeList;
