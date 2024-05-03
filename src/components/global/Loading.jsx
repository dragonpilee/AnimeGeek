import { Spinner } from "@chakra-ui/react";

/**
 *
 * @param {Object} props
 * @param {import("react").CSSProperties} props.style
 * @returns
 */
const Loading = ({ style }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        alignItems: "center",
        ...style,
      }}
    >
      <Spinner />
    </div>
  );
};
export default Loading;
