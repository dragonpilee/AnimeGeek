import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { BASE_API, DEFAULT_PROVIDER } from "../../../constants";
import videoHLS from "../../../helpers/videoHLS";
import useProvider from "../../../hooks/useProvider";

/**
 * @typedef {Array} DataStreamState
 * @property {String} download
 * @property {[]} sources
 */
/**
 * @typedef EpisodesAnimeContextData
 * @property {Object} data
 * @property {import("react").MutableRefObject<HTMLVideoElement>} videoRef
 * @property {(e:HTMLButtonElement,episodeId:Number)=>void} openModalVideo
 * @property {()=>void} closeModalVideo
 * @property {Boolean} isStreamOpen
 * @property {String} episodeValParam
 * @property {DataStreamState} dataStream
 *
 */

/** @type {import("react").Context<EpisodesAnimeContextData>} */
const EpisodesAnimeContext = createContext({});

export const useEpisodeAnimeContext = () => useContext(EpisodesAnimeContext);

const EpisodesAnimeContextProvider = ({ data, children }) => {
  const navigate = useNavigate();
  const { currentProvider } = useProvider();

  const videoRef = useRef();

  const [episodeParam, setEpisodeParam] = useSearchParams();

  const [isStreamOpen, setIsStreamOpen] = useState(false);
  const [dataStream, setDataStream] = useState({
    download: "",
    sources: [],
  });
  const [hlsInstance, setHlsInstance] = useState(null);

  const episodeValParam = useMemo(() => {
    return episodeParam?.get("episode");
  }, [episodeParam?.get("episode")]);

  const getStreamLinkForEpisode = async (episodeId, providerToUse = null) => {
    if (!episodeId) {
      console.warn("No episode ID provided");
      return false;
    }

    const provider = providerToUse || currentProvider;
    console.log("Fetching stream for episode:", episodeId, "with provider:", provider);

    try {
      const response = await axios.get(`${BASE_API}/watch/${episodeId}?provider=${provider}`);
      const { data } = response;
      
      console.log("Stream data received:", data);
      
      if (data && data?.sources && data.sources.length > 0) {
        // Destroy existing HLS instance if any
        if (hlsInstance) {
          hlsInstance.destroy();
          setHlsInstance(null);
        }

        setDataStream({
          download: data?.download || "",
          sources: data?.sources || [],
        });

        // Initialize video after a short delay to ensure element is ready
        setTimeout(() => {
          if (videoRef?.current) {
            const newHls = videoHLS({
              refCurrent: videoRef.current,
              srcVideo: data.sources[0]?.url,
            });
            setHlsInstance(newHls);
          } else {
            console.warn("Video element not ready, will retry...");
            // Retry after another delay
            setTimeout(() => {
              if (videoRef?.current) {
                const newHls = videoHLS({
                  refCurrent: videoRef.current,
                  srcVideo: data.sources[0]?.url,
                });
                setHlsInstance(newHls);
              }
            }, 500);
          }
        }, 100);
        return true; // Success
      } else {
        console.error("No video sources available in API response:", data);
        setDataStream({
          download: "",
          sources: [],
          error: `No video sources available from ${provider}`,
        });
        return false; // No sources
      }
    } catch (error) {
      const errorMessage = error.response?.status === 404 
        ? `Episode not found on ${provider}`
        : error.response?.status === 429
        ? `Rate limited on ${provider}`
        : `Error from ${provider}: ${error.message}`;
      
      console.error(errorMessage, error);
      setDataStream({
        download: "",
        sources: [],
        error: errorMessage,
      });
      return false; // Error
    }
  };

  // Enhanced fallback mechanism - try multiple providers with better error handling
  const getStreamLinkWithFallback = async (episodeId) => {
    const { getProvidersByPriority } = await import("../../../utils/providerHelper");
    const providersToTry = getProvidersByPriority();
    
    // Try current provider first
    console.log(`Attempting to load from primary provider: ${currentProvider}`);
    let success = await getStreamLinkForEpisode(episodeId, currentProvider);
    if (success) {
      console.log(`✓ Successfully loaded from ${currentProvider}`);
      return;
    }

    // Try other providers as fallback (excluding already tried)
    console.log(`Primary provider failed, trying fallback providers...`);
    for (const provider of providersToTry) {
      if (provider.value === currentProvider) continue; // Already tried
      
      console.log(`Trying fallback provider: ${provider.label} (${provider.value})`);
      success = await getStreamLinkForEpisode(episodeId, provider.value);
      if (success) {
        console.log(`✓ Successfully loaded from fallback provider: ${provider.label}`);
        // Optionally notify user about provider switch
        return;
      } else {
        console.warn(`✗ ${provider.label} failed, trying next...`);
      }
    }
    
    console.error("✗ All providers failed to load stream for episode:", episodeId);
    // Set error state for UI
    setDataStream({
      download: "",
      sources: [],
      error: "Unable to load stream from any available provider. Please try again later.",
    });
  };

  const openModalVideo = (e, episodeId) => {
    e?.preventDefault();
    e?.stopPropagation();
    
    console.log("Opening video modal for episode:", episodeId);
    
    // Open modal immediately
    setIsStreamOpen(true);
    
    // Set episode parameter
    const newParams = new URLSearchParams(episodeParam);
    newParams.set("episode", episodeId);
    setEpisodeParam(newParams);

    // Navigate with episode parameter
    navigate(`?episode=${episodeId}`, { replace: true });
    
    // Fetch stream link with fallback
    if (episodeId) {
      getStreamLinkWithFallback(episodeId);
    }
  };


  const closeModalVideo = () => {
    setIsStreamOpen(false);
    if (hlsInstance) {
      hlsInstance.destroy();
      setHlsInstance(null);
    }

    episodeParam.delete("episode");
    setEpisodeParam(episodeParam);
  };

  useEffect(() => {
    if (episodeValParam) {
      setIsStreamOpen(true);
      getStreamLinkWithFallback(episodeValParam);
    } else {
      // Close modal if no episode parameter
      setIsStreamOpen(false);
    }
  }, [episodeValParam, currentProvider]);

  return (
    <EpisodesAnimeContext.Provider
      value={{
        data,
        videoRef,
        openModalVideo,
        closeModalVideo,
        isStreamOpen,
        episodeValParam,
        dataStream,
        hlsInstance,
      }}
    >
      {children}
    </EpisodesAnimeContext.Provider>
  );
};
export default EpisodesAnimeContextProvider;
