import Hls from "hls.js";

/**
 *
 * @param {Object} props
 * @param {import("react").ForwardedRef<HTMLVideoElement>} props.refCurrent
 * @param {String} props.srcVideo
 */
const videoHLS = ({ refCurrent, srcVideo }) => {
  if (Hls.isSupported()) {
    var hls = new Hls();
    hls.loadSource(srcVideo);
    hls.attachMedia(refCurrent);
    hls.on(Hls.Events.MANIFEST_PARSED, function () {
      refCurrent?.play();
    });
  }
};
export default videoHLS;
