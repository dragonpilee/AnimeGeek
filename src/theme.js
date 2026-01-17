// theme.js

// 1. import `extendTheme` function
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      50: "#ffe5e5",
      100: "#ffbaba",
      200: "#ff8c8c",
      300: "#ff5e5e",
      400: "#ff2f2f",
      500: "#e50914", // Netflix/Cineby Red
      600: "#b20710",
      700: "#80050b",
      800: "#4d0307",
      900: "#1a0102",
    },
    dark: {
      bg: "#000000",
      bgAlt: "#0a0a0a",
      surface: "#121212",
      border: "rgba(255, 255, 255, 0.1)",
    },
  },
  fonts: {
    heading: `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif`,
    body: `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: "dark.bg",
        color: "white",
        overflowX: "hidden",
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "600",
        borderRadius: "full",
        textTransform: "none",
      },
      variants: {
        solid: {
          bg: "white",
          color: "black",
          px: 8,
          _hover: {
            bg: "gray.200",
            transform: "scale(1.05)",
          },
          transition: "all 0.2s",
        },
        primary: {
          bg: "brand.500",
          color: "white",
          px: 8,
          _hover: {
            bg: "brand.600",
            transform: "scale(1.05)",
          },
        },
        glass: {
          bg: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          color: "white",
          px: 8,
          _hover: {
            bg: "rgba(255, 255, 255, 0.2)",
            transform: "scale(1.05)",
          },
        },
      },
      defaultProps: {
        variant: "solid",
      },
    },
    Card: {
      baseStyle: {
        container: {
          bg: "dark.surface",
          borderRadius: "8px",
          overflow: "hidden",
          transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          _hover: {
            transform: "scale(1.05)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          },
        },
      },
    },
  },
});

export default theme;
