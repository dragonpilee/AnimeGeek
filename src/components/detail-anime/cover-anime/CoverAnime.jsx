import Image from "../../global/Image";
import BgImage from "../../global/BgImage";

const CoverAnime = ({ src, srcBg }) => {
  return (
    <BgImage src={srcBg} height={300}>
      <Image
        src={src}
        pos="absolute"
        top={300}
        transform="translate(-50%,-50%)"
        left="50%"
        width={240}
      />
    </BgImage>
  );
};
export default CoverAnime;
