import {
  DrawerBody,
  Drawer as DrawerChakra,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";

/**
 * @typedef AddPropsDrawer
 * @property {import("react").ReactNode} header
 * @property {import("react").ReactNode} footer
 */
/**
 *
 * @param {AddPropsDrawer & import("@chakra-ui/react").DrawerProps} param0
 * @returns
 */
const Drawer = ({ header, children, footer, ...props }) => {
  return (
    <DrawerChakra {...props}>
      <DrawerOverlay />
      <DrawerContent>
        {header && <DrawerHeader>{header}</DrawerHeader>}
        <DrawerBody>{children}</DrawerBody>
        {footer && <DrawerFooter>{footer}</DrawerFooter>}
      </DrawerContent>
    </DrawerChakra>
  );
};
export default Drawer;
