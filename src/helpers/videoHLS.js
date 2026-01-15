import Hls from "hls.js";

/**
 *
 * @param {Object} props
 * @param {import("react").ForwardedRef<HTMLVideoElement>} props.refCurrent
 * @param {String} props.srcVideo
 */
const videoHLS = ({ refCurrent, srcVideo }) => {
  if (!refCurrent || !srcVideo) {
    console.warn("VideoHLS: Missing refCurrent or srcVideo");
    return null;
  }

  // Check if browser supports native HLS (Safari, iOS)
  if (refCurrent.canPlayType("application/vnd.apple.mpegurl")) {
    refCurrent.src = srcVideo;
    refCurrent.addEventListener("loadedmetadata", () => {
      refCurrent?.play().catch((err) => {
        console.warn("Autoplay prevented:", err);
      });
    });
    return null; // Native HLS doesn't need Hls.js instance
  }

  // Use Hls.js for browsers that don't support native HLS
  if (Hls.isSupported()) {
    try {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: false,
        backBufferLength: 90,
      });

      hls.loadSource(srcVideo);
      hls.attachMedia(refCurrent);

      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        refCurrent?.play().catch((err) => {
          console.warn("Autoplay prevented:", err);
        });
      });

      hls.on(Hls.Events.ERROR, function (event, data) {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.error("Fatal network error, trying to recover...");
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.error("Fatal media error, trying to recover...");
              hls.recoverMediaError();
              break;
            default:
              console.error("Fatal error, destroying HLS instance");
              hls.destroy();
              break;
          }
        }
      });

      return hls;
    } catch (error) {
      console.error("Error initializing HLS:", error);
      return null;
    }
  }

  console.warn("HLS is not supported in this browser");
  return null;
};
export default videoHLS;
