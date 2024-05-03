import { Box as BoxChakra } from "@chakra-ui/react";
import { Fragment } from "react";
import Suspense from "./Suspense";

/**
 * @typedef AddPropsBox
 * @property {Boolean} [showIf]
 * @property {Boolean} [useSuspense]
 */
/**
 *
 * @param {import("@chakra-ui/react").BoxProps & AddPropsBox} props
 * @returns
 */
const Box = ({ showIf = true, useSuspense = false, children, ...props }) => {
  if (showIf) {
    if (useSuspense) {
      return (
        <Suspense>
          <BoxChakra {...props}>{children}</BoxChakra>
        </Suspense>
      );
    }
    return <BoxChakra {...props}>{children}</BoxChakra>;
  }
  return <Fragment />;
};
export default Box;
