import { Card, CardBody, CardFooter, CardHeader, Box } from "@chakra-ui/react";
import useResponsive from "../../hooks/useResponsive";

/**
 * @typedef AddPropsCard
 * @property {import("@chakra-ui/react").CardFooterProps} footer
 * @property {import("@chakra-ui/react").CardHeaderProps} header
 * @property {Boolean} useDefault
 */

/** @param {import('@chakra-ui/react').CardProps & AddPropsCard } props*/
const CardData = ({
  children,
  header,
  footer,
  useDefault = false,
  ...props
}) => {
  const { sm } = useResponsive();

  return (
    <Card
      bg="dark.surface"
      borderRadius="4px" // Sharper corners for a cinematic look
      overflow="hidden"
      border="1px solid"
      borderColor="rgba(255, 255, 255, 0.05)"
      transition="all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
      _hover={{
        transform: "scale(1.05)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.8), 0 0 10px rgba(229, 9, 20, 0.2)",
        borderColor: "brand.500",
        zIndex: 10,
      }}
      {...props}
    >
      {header && <CardHeader>{header}</CardHeader>}
      <CardBody p={0}>{children}</CardBody>
      {footer && (
        <CardFooter px={3} py={3}>
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};
export default CardData;
