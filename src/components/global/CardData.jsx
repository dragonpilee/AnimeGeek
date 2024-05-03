import { Card, CardBody, CardFooter, CardHeader } from "@chakra-ui/react";
import useResponsive from "../../hooks/useResponsive";
import "../../style/card.css";

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
      {...(!useDefault && {
        className: "_card",
      })}
      {...props}
    >
      {header && <CardHeader>{header}</CardHeader>}
      <CardBody>{children}</CardBody>
      {footer && (
        <CardFooter {...(!sm && { py: "var(--chakra-space-5)" })} px={0}>
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};
export default CardData;
