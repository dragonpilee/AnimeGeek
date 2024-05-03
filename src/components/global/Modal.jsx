import {
  ModalBody,
  Modal as ModalChakra,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

/**
 * @typedef AddPropsModal
 * @property {import("react").ReactNode} [header]
 * @property {import("react").ReactNode} [footer]
 * @property {Boolean} [showCancelButton]
 */

/**
 *
 * @param {import("@chakra-ui/react").ModalProps & AddPropsModal} props
 * @returns
 */
const Modal = ({
  header,
  footer,
  showCancelButton = true,
  children,
  ...props
}) => {
  return (
    <ModalChakra isCentered {...props}>
      <ModalOverlay />
      <ModalContent>
        {header && <ModalHeader>{header}</ModalHeader>}
        {showCancelButton && (
          <ModalCloseButton fontSize={20} mt={18} mr={2} zIndex={999} />
        )}
        <ModalBody>{children}</ModalBody>
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalContent>
    </ModalChakra>
  );
};
export default Modal;
