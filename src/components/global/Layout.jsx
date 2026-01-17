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
  Text as ChakraText,
} from "@chakra-ui/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";

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
    <Box minH="100vh" bg="black" position="relative">
      {/* Floating Glass Navbar */}
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={1000}
        className="glass-blur"
        px={{ base: 4, md: 8 }}
        py={3}
      >
        <Flex
          maxW="1600px"
          mx="auto"
          alignItems="center"
          justifyContent="space-between"
          gap={8}
        >
          <Heading
            as="h1"
            size="lg"
            cursor="pointer"
            onClick={() => navigate("/")}
            color="brand.500"
            fontWeight="900"
            letterSpacing="tighter"
            _hover={{ transform: "scale(1.02)" }}
            transition="all 0.2s"
            className="text-shadow"
          >
            CINEGEEK <Box as="span" color="white" fontWeight="300" fontSize="md" ml={1}>ANIME</Box>
          </Heading>

          <Box flex="1" maxW="600px" display={{ base: "none", md: "block" }}>
            <InputGroup size="md">
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.500" />
              </InputLeftElement>
              <Input
                type="search"
                placeholder="Search movies or TV shows"
                bg="rgba(255, 255, 255, 0.05)"
                border="1px solid rgba(255, 255, 255, 0.1)"
                borderRadius="full"
                _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}
                _focus={{
                  bg: "rgba(255, 255, 255, 0.1)",
                  borderColor: "brand.500",
                  boxShadow: "none",
                }}
                onChange={({ target: { value } }) => setSearch(value)}
                onKeyUp={(e) => {
                  if (e?.key === "Enter") searchHandler();
                }}
              />
            </InputGroup>
          </Box>

          <Flex gap={6} alignItems="center">
            <ChakraText
              cursor="pointer"
              fontWeight="600"
              fontSize="sm"
              _hover={{ color: "brand.500" }}
              onClick={() => navigate("/")}
            >
              Home
            </ChakraText>
            <ChakraText
              cursor="pointer"
              fontWeight="600"
              fontSize="sm"
              _hover={{ color: "brand.500" }}
              onClick={() => navigate("/search")}
            >
              Browse
            </ChakraText>
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<SearchIcon />}
              variant="ghost"
              onClick={() => navigate("/search")}
              aria-label="Search"
              color="white"
            />
          </Flex>
        </Flex>
      </Box>

      {/* Main Content */}
      <Box pt="80px">
        {children}
      </Box>

      {/* Footer (Optional, but good for space) */}
      <Box py={10} textAlign="center" borderTop="1px solid rgba(255, 255, 255, 0.05)">
        <ChakraText color="gray.500" fontSize="xs">
          © {new Date().getFullYear()} CINEGEEK ANIME. All rights reserved.
        </ChakraText>
      </Box>
    </Box>
  );
};
export default Layout;
