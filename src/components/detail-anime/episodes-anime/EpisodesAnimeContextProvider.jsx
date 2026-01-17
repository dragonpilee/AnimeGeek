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
import { TMDB_BASE_URL, TMDB_TOKEN } from "../../../constants";
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
  const provider = "zoro"; // Force zoro provider as per requirement

  const videoRef = useRef();

  const [episodeParam, setEpisodeParam] = useSearchParams();

  const [isStreamOpen, setIsStreamOpen] = useState(false);
  const [vidkingUrl, setVidkingUrl] = useState("");
  const [currentEpisodes, setCurrentEpisodes] = useState([]);
  const [activeSeason, setActiveSeason] = useState(1);
  const [loadingEpisodes, setLoadingEpisodes] = useState(false);

  const episodeValParam = useMemo(() => {
    return episodeParam?.get("episode");
  }, [episodeParam?.get("episode")]);

  const fetchSeasonEpisodes = async (seasonNumber) => {
    if (!data?.id) return;
    setLoadingEpisodes(true);
    try {
      const response = await axios.get(`${TMDB_BASE_URL}/tv/${data.id}/season/${seasonNumber}`, {
        headers: { Authorization: `Bearer ${TMDB_TOKEN}` }
      });
      setCurrentEpisodes(response.data.episodes || []);
      setActiveSeason(seasonNumber);
    } catch (error) {
      console.error("Error fetching season episodes:", error);
    } finally {
      setLoadingEpisodes(false);
    }
  };

  const getStreamLinkWithFallback = async (episodeId) => {
    const tmdbId = data?.id;
    // episodeId as passed from the list (which we will update to be the episode number)
    const epNumber = episodeId || 1;

    if (data?.type === "movie" || !data?.seasons) {
      setVidkingUrl(`https://www.vidking.net/embed/movie/${tmdbId}`);
    } else {
      setVidkingUrl(`https://www.vidking.net/embed/tv/${tmdbId}/${activeSeason}/${epNumber}`);
    }
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
    episodeParam.delete("episode");
    setEpisodeParam(episodeParam);
  };

  useEffect(() => {
    if (data?.id && data?.seasons?.length > 0) {
      fetchSeasonEpisodes(1); // Default to season 1
    }
  }, [data?.id]);

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
        vidkingUrl,
        currentEpisodes,
        activeSeason,
        fetchSeasonEpisodes,
        loadingEpisodes,
      }}
    >
      {children}
    </EpisodesAnimeContext.Provider>
  );
};
export default EpisodesAnimeContextProvider;
