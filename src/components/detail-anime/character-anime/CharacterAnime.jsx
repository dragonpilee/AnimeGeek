import { useMemo, useState } from "react";
import { Heading } from "@chakra-ui/react";
import CardData from "../../global/CardData";
import CharacterAnimeModal from "./CharacterAnimeModal";
import CharacterAnimeList from "./CharacterAnimeList";

const CharacterAnime = ({ data }) => {
  const [idChar, setIdChar] = useState();
  const [isOpenVA, setIsOpenVA] = useState(false);

  const charactersSelected = useMemo(() => {
    return data?.characters?.find((char) => char?.id === idChar);
  }, [idChar]);

  if (!data?.characters?.length) return null;

  return (
    <Stack spacing={6} maxW="1600px" mx="auto" px={{ base: 6, md: 12 }} pt={10}>
      <Stack spacing={1}>
        <Heading as="h2" size="xl" fontWeight="900" letterSpacing="tight">
          CHARACTERS
        </Heading>
        <Box h="2px" w="40px" bg="brand.500" borderRadius="full" />
      </Stack>
      <Box mt={4}>
        <CharacterAnimeList
          data={data}
          onOpenVA={(char) => {
            setIdChar(char?.id);
            setIsOpenVA(true);
          }}
        />
        <CharacterAnimeModal
          charactersSelected={charactersSelected}
          isOpen={isOpenVA}
          onClose={() => {
            setIsOpenVA(false);
          }}
        />
      </Box>
    </Stack>
  );
};
export default CharacterAnime;
