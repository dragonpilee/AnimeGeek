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
      50: "#FFF5E6",
      100: "#FFE5CC",
      200: "#FFCC99",
      300: "#FFB366",
      400: "#FF9933",
      500: "#F47521", // Crunchyroll Orange
      600: "#E05A00",
      700: "#B34700",
      800: "#803300",
      900: "#4D1F00",
    },
    dark: {
      bg: "#0B0B0B",
      bgAlt: "#141519",
      surface: "#1A1A1E",
      border: "#2D2D30",
    },
  },
  fonts: {
    heading: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`,
    body: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: "dark.bg",
        color: "white",
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "600",
        borderRadius: "4px",
      },
      variants: {
        solid: {
          bg: "brand.500",
          color: "white",
          _hover: {
            bg: "brand.600",
            transform: "translateY(-2px)",
            boxShadow: "0 4px 12px rgba(244, 117, 33, 0.4)",
          },
          transition: "all 0.2s",
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
          transition: "all 0.3s ease",
          _hover: {
            transform: "scale(1.05)",
            boxShadow: "0 8px 24px rgba(244, 117, 33, 0.3)",
          },
        },
      },
    },
  },
});

export default theme;
