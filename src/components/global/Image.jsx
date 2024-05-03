import { useEffect, useState } from "react";
import { Image as ImageChakra } from "@chakra-ui/react";
import PlaceholderImage from "../../assets/placeholder.png";

/**
 *
 * @param {import("@chakra-ui/react").ImageProps} props
 * @returns {Element}
 */
const Image = ({ src, ...props }) => {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    return () => {
      if (load) {
        setLoad(false);
      }
    };
  }, [load]);
  return (
    <>
      <ImageChakra
        loading="lazy"
        onLoad={() => {
          setLoad(true);
        }}
        src={load && src ? src : PlaceholderImage}
        {...props}
      />
    </>
  );
};
export default Image;
