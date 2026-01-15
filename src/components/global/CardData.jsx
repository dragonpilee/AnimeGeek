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
      borderRadius="8px"
      overflow="hidden"
      border="1px solid"
      borderColor="dark.border"
      transition="all 0.3s ease"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "0 8px 24px rgba(244, 117, 33, 0.3)",
        borderColor: "brand.500",
      }}
      {...props}
    >
      {header && <CardHeader>{header}</CardHeader>}
      <CardBody p={0}>{children}</CardBody>
      {footer && (
        <CardFooter {...(!sm && { py: "var(--chakra-space-5)" })} px={3}>
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};
export default CardData;
