import { Box } from "@chakra-ui/react";

/**
 * @typedef AddPropsBgImage
 * @property {String} src
 * @property {Boolean} useOverlay
 * @property {Number} height
 */
/**
 *
 * @param {import("@chakra-ui/react").BoxProps & AddPropsBgImage} props
 * @returns {Element}
 */
const BgImage = ({
  src,
  useOverlay = false,
  height = 250,
  children,
  ...props
}) => {
  return (
    <Box
      bgImage={src}
      height={height}
      bgSize="cover"
      bgPos="center"
      position="relative"
      bgRepeat="no-repeat"
      {...props}
    >
      {useOverlay && (
        <Box
          pos="absolute"
          bg=" linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(38,38,38,0) 80%);"
          inset={0}
          height={height}
        />
      )}
      {children}
    </Box>
  );
};
export default BgImage;
