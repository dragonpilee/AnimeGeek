import { Button, Heading, Stack, Text } from "@chakra-ui/react";
import Image from "./Image";

/**
 * @typedef BtnActionProps
 * @property {HTMLDivElement['onclick']} onClick
 * @property {string} text
 */
/**
 *
 * @param {Object} props
 * @param {string} props.src
 * @param {string} props.title
 * @param {string} props.subTitle
 * @param {BtnActionProps} props.btnAction
 * @returns {Element}
 */
const ErrorPage = ({ src, title, subTitle, btnAction }) => {
  return (
    <Stack
      textAlign="center"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      spacing={5}
    >
      <Image src={src} w={300} margin="0 auto" />
      <Heading>{title}</Heading>
      <Text>{subTitle}</Text>
      <Button
        onClick={() => {
          if (btnAction?.onClick) {
            btnAction?.onClick();
          }
        }}
      >
        {btnAction?.text}
      </Button>
    </Stack>
  );
};
export default ErrorPage;
