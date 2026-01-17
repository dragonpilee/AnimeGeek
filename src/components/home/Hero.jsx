import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import Loading from "../global/Loading";

const Hero = () => {
    const { data, loading, error } = useFetchData("/trending/tv/day");
    const navigate = useNavigate();

    const featured = useMemo(() => {
        if (data?.results?.length) {
            // Pick the first item as featured
            return data.results[0];
        }
        return null;
    }, [data]);

    if (loading) return <Box h="70vh"><Loading /></Box>;
    if (error || !featured) return null;

    const title = featured.name || featured.title;
    const backdropPath = featured.backdrop_path
        ? `https://image.tmdb.org/t/p/original${featured.backdrop_path}`
        : `https://image.tmdb.org/t/p/original${featured.poster_path}`;

    return (
        <Box
            position="relative"
            height={{ base: "60vh", md: "80vh" }}
            width="100%"
            overflow="hidden"
            mt="-80px" // Offset navbar padding
        >
            {/* Background Image */}
            <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                bgImage={`url(${backdropPath})`}
                bgSize="cover"
                bgPosition="center top"
                _after={{
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    bg: "linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 40%, transparent 100%), linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 40%)",
                }}
            />

            {/* Content */}
            <Flex
                position="relative"
                height="100%"
                maxW="1600px"
                mx="auto"
                px={{ base: 6, md: 12 }}
                alignItems="center"
                zIndex={2}
            >
                <Stack spacing={6} maxW="700px">
                    <Heading
                        as="h2"
                        fontSize={{ base: "3xl", md: "5xl", lg: "7xl" }}
                        fontWeight="900"
                        lineHeight="1"
                        className="text-shadow"
                    >
                        {title}
                    </Heading>

                    <Text
                        fontSize={{ base: "sm", md: "lg" }}
                        color="gray.200"
                        noOfLines={3}
                        maxW="600px"
                        className="text-shadow"
                    >
                        {featured.overview}
                    </Text>

                    <Stack direction="row" spacing={4}>
                        <Button
                            size="lg"
                            variant="solid"
                            onClick={() => navigate(`/anime/${featured.id}/${encodeURIComponent(title)}`)}
                        >
                            Watch Now
                        </Button>
                        <Button
                            size="lg"
                            variant="glass"
                            onClick={() => navigate(`/anime/${featured.id}/${encodeURIComponent(title)}`)}
                        >
                            View Info
                        </Button>
                    </Stack>
                </Stack>
            </Flex>
        </Box>
    );
};

export default Hero;
