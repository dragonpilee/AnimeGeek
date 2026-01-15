import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Heading,
  Flex,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import ProviderSelector from "./ProviderSelector";

const Layout = ({ children }) => {
  const [search, setSearch] = useState("");
  const [searchParam, setSearchParam] = useSearchParams();
  const navigate = useNavigate();

  const searchHandler = () => {
    if (search.trim()) {
      searchParam?.set("q", search);
      setSearchParam(searchParam);
      navigate(`/search/?q=${search}`);
    }
  };

  return (
    <Stack direction="column" spacing={0}>
      <Box
        position="sticky"
        top={0}
        zIndex={99}
        bg="dark.bgAlt"
        borderBottom="1px solid"
        borderColor="dark.border"
        boxShadow="0 2px 8px rgba(0,0,0,0.3)"
      >
        <Flex
          maxW="1400px"
          mx="auto"
          px={6}
          py={4}
          alignItems="center"
          gap={6}
          direction={{ base: "column", md: "row" }}
        >
          <Heading
            as="h1"
            size="lg"
            cursor="pointer"
            onClick={() => navigate("/")}
            color="brand.500"
            fontWeight="700"
            letterSpacing="tight"
            _hover={{ color: "brand.400" }}
            transition="color 0.2s"
            whiteSpace="nowrap"
          >
            AnimeGeek
          </Heading>
          <Box flex="1" w="full">
            <InputGroup size="lg">
              <InputLeftElement>
                <SearchIcon color="brand.500" />
              </InputLeftElement>
              <Input
                type="search"
                placeholder="Search for anime..."
                bg="dark.surface"
                border="2px solid"
                borderColor="dark.border"
                fontSize="md"
                _hover={{ borderColor: "brand.500" }}
                _focus={{
                  borderColor: "brand.500",
                  boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)",
                }}
                onChange={({ target: { value } }) => setSearch(value)}
                onKeyUp={(e) => {
                  if (e?.code === "Enter" || e?.key === "Enter") {
                    searchHandler();
                  }
                }}
              />
              <InputRightElement>
                <IconButton
                  icon={<SearchIcon />}
                  size="sm"
                  colorScheme="brand"
                  variant="ghost"
                  onClick={searchHandler}
                  aria-label="Search"
                />
              </InputRightElement>
            </InputGroup>
          </Box>
          <ProviderSelector showLabel={false} size="md" />
        </Flex>
      </Box>
      <Box className="content" minH="100vh" px={6} py={8}>
        <Box maxW="1400px" mx="auto">
          {children}
        </Box>
      </Box>
    </Stack>
  );
};
export default Layout;
