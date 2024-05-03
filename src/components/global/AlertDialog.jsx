import {
  AlertDialogBody,
  AlertDialog as AlertDialogChakra,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Stack,
} from "@chakra-ui/react";

/**
 * @typedef AddPropsAlertDialog
 * @property {import("react").ReactNode} header
 * @property {import("@chakra-ui/react").ModalHeaderProps} headerProps
 * @property {import("react").ReactNode} footer
 * @property {()=>void} onOk
 * @property {()=>void} onCancel
 */
/**
 *
 * @param {AddPropsAlertDialog & import("@chakra-ui/react").AlertDialogProps} param0
 * @returns
 */
const AlertDialog = ({
  header,
  headerProps,
  onOk,
  onCancel,
  children,
  footer,
  ...props
}) => {
  return (
    <AlertDialogChakra
      {...props}
      onOverlayClick={() => {
        onCancel();
      }}
      onEsc={() => {
        onCancel();
      }}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader {...headerProps}>{header}</AlertDialogHeader>
          <AlertDialogBody>
            {children || "Are you sure to close ?"}
          </AlertDialogBody>
          <AlertDialogFooter>
            {footer || (
              <Stack justifyContent="end" direction="row">
                <Button
                  onClick={() => {
                    onCancel();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  colorScheme="teal"
                  onClick={() => {
                    onOk();
                    onCancel();
                  }}
                >
                  Ok
                </Button>
              </Stack>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialogChakra>
  );
};
export default AlertDialog;
