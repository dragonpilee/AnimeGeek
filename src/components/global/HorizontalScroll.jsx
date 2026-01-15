import { Box, IconButton, HStack, useBreakpointValue } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useRef, useState, useEffect } from "react";

const HorizontalScroll = ({ children }) => {
    const scrollRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const isMobile = useBreakpointValue({ base: true, md: false });
    const scrollAmount = useBreakpointValue({ base: 300, md: 600, lg: 800 });

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        checkScroll();
        const scrollEl = scrollRef.current;
        if (scrollEl) {
            scrollEl.addEventListener("scroll", checkScroll);
            return () => scrollEl.removeEventListener("scroll", checkScroll);
        }
    }, [children]);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const amount = direction === "left" ? -scrollAmount : scrollAmount;
            scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
        }
    };

    return (
        <Box position="relative">
            {showLeftArrow && !isMobile && (
                <IconButton
                    icon={<ChevronLeftIcon boxSize={8} />}
                    position="absolute"
                    left={-2}
                    top="50%"
                    transform="translateY(-50%)"
                    zIndex={2}
                    colorScheme="brand"
                    borderRadius="full"
                    size="lg"
                    onClick={() => scroll("left")}
                    aria-label="Scroll left"
                    bg="rgba(244, 117, 33, 0.95)"
                    _hover={{ bg: "brand.600", transform: "translateY(-50%) scale(1.1)" }}
                    transition="all 0.2s"
                    boxShadow="0 4px 12px rgba(0,0,0,0.4)"
                />
            )}

            <Box
                ref={scrollRef}
                overflowX="auto"
                overflowY="hidden"
                css={{
                    "&::-webkit-scrollbar": {
                        display: "none",
                    },
                    scrollbarWidth: "none",
                    WebkitOverflowScrolling: "touch",
                }}
                px={{ base: 2, md: 12 }}
            >
                <HStack spacing={{ base: 3, md: 6 }} align="stretch" py={4}>
                    {children}
                </HStack>
            </Box>

            {showRightArrow && !isMobile && (
                <IconButton
                    icon={<ChevronRightIcon boxSize={8} />}
                    position="absolute"
                    right={-2}
                    top="50%"
                    transform="translateY(-50%)"
                    zIndex={2}
                    colorScheme="brand"
                    borderRadius="full"
                    size="lg"
                    onClick={() => scroll("right")}
                    aria-label="Scroll right"
                    bg="rgba(244, 117, 33, 0.95)"
                    _hover={{ bg: "brand.600", transform: "translateY(-50%) scale(1.1)" }}
                    transition="all 0.2s"
                    boxShadow="0 4px 12px rgba(0,0,0,0.4)"
                />
            )}
        </Box>
    );
};

export default HorizontalScroll;
