import { Box, Flex, Image as ChakraImage } from "@chakra-ui/react";
import Image from "../../global/Image";

const CoverAnime = ({ src, srcBg }) => {
  return (
    <Box
      position="relative"
      height={{ base: "40vh", md: "60vh" }}
      width="100%"
      mt="-80px" // Offset navbar
      overflow="hidden"
    >
      {/* Background Backdrop */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgImage={`url(${srcBg})`}
        bgSize="cover"
        bgPosition="center top"
        _after={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bg: "linear-gradient(to top, #000 0%, transparent 60%), linear-gradient(to right, rgba(0,0,0,0.8) 0%, transparent 100%)",
        }}
      />

      {/* Floating Poster (Optional or Small) */}
      <Flex
        position="relative"
        height="100%"
        maxW="1600px"
        mx="auto"
        px={{ base: 6, md: 12 }}
        alignItems="flex-end"
        pb={8}
        zIndex={2}
      >
        <Box
          width={{ base: "120px", md: "200px" }}
          borderRadius="lg"
          overflow="hidden"
          boxShadow="0 10px 30px rgba(0,0,0,0.8)"
          border="2px solid rgba(255, 255, 255, 0.1)"
          display={{ base: "none", md: "block" }}
        >
          <Image src={src} />
        </Box>
      </Flex>
    </Box>
  );
};

export default CoverAnime;
