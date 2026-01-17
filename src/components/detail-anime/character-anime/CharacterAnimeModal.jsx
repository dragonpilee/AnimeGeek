import { Alert, Heading, SimpleGrid, Text, Stack, Box, AspectRatio } from "@chakra-ui/react";
import Modal from "../../global/Modal";
import useResponsive from "../../../hooks/useResponsive";
import Image from "../../global/Image";
import imageError from "../../../assets/image_error.png";

const CharacterAnimeModal = ({ isOpen, onClose, charactersSelected }) => {
  const { sm } = useResponsive();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <Stack spacing={8} py={4}>
        <Heading as="h3" size="lg" textAlign="center" fontWeight="900" letterSpacing="tight">
          {charactersSelected?.name?.full}
        </Heading>

        {charactersSelected?.voiceActors?.length > 0 ? (
          <SimpleGrid columns={{ base: 2, md: 3 }} spacing={8}>
            {charactersSelected.voiceActors.map((va) => (
              <Stack key={va.id} spacing={4} alignItems="center">
                <Box borderRadius="full" overflow="hidden" w="120px" h="120px" border="2px solid" borderColor="brand.500">
                  <AspectRatio ratio={1}>
                    <Image
                      src={va.image}
                      alt={va.name?.full}
                      fallbackSrc={imageError}
                      objectFit="cover"
                    />
                  </AspectRatio>
                </Box>
                <Stack spacing={0} textAlign="center">
                  <Text fontWeight="bold" fontSize="sm" color="white">
                    {va.name?.full}
                  </Text>
                  <Text fontSize="xs" color="gray.500" fontWeight="600">
                    {va.language}
                  </Text>
                </Stack>
              </Stack>
            ))}
          </SimpleGrid>
        ) : (
          <Alert status="info" borderRadius="md" bg="rgba(255, 255, 255, 0.05)" color="white" border="1px solid rgba(255,255,255,0.1)">
            No information about voice actors available.
          </Alert>
        )}
      </Stack>
    </Modal>
  );
};

export default CharacterAnimeModal;
