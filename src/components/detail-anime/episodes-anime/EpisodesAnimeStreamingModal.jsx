import { Button, Heading, Stack, Text, Box } from "@chakra-ui/react";
import formatWord from "../../../helpers/formatWord";
import { useEpisodeAnimeContext } from "./EpisodesAnimeContextProvider";
import { useCallback, useEffect, useMemo, useState } from "react";
import Hls from "hls.js";
import AlertDialog from "../../global/AlertDialog";
import Modal from "../../global/Modal";
import Select from "../../global/Select";
import videoHLS from "../../../helpers/videoHLS";
import EpisodesAnimeDownloadModal from "./EpisodesAnimeDownloadModal";

const EpisodesAnimeStreamingModal = () => {
  const [isOpenAlert, setisOpenAlert] = useState(false);
  const [openModalDownload, setOpenModalDownload] = useState(false);
  const [audioTracks, setAudioTracks] = useState([]);
  const [subtitleTracks, setSubtitleTracks] = useState([]);

  const {
    isStreamOpen,
    episodeValParam,
    videoRef,
    closeModalVideo,
    dataStream,
    vidkingUrl,
    hlsInstance,
  } = useEpisodeAnimeContext();

  const listQualityStreaming = useMemo(() => {
    if (dataStream?.sources?.length > 0) {
      return dataStream?.sources?.map((stream) => ({
        label: stream?.quality,
        value: stream?.url,
      }));
    }

    return [];
  }, [dataStream]);

  const changeQualityHandler = useCallback(
    (value) => {
      videoHLS({
        refCurrent: videoRef?.current,
        srcVideo: value,
      });
    },
    [dataStream]
  );

  const episodeName = useMemo(() => {
    return formatWord(episodeValParam?.replaceAll("-", " "));
  }, [episodeValParam]);

  useEffect(() => {
    if (hlsInstance) {
      const updateTracks = () => {
        if (hlsInstance.audioTracks) {
          setAudioTracks(
            hlsInstance.audioTracks.map((track, index) => ({
              label: track.name || `Audio ${index + 1}`,
              value: index,
            }))
          );
        }
        if (hlsInstance.subtitleTracks) {
          setSubtitleTracks(
            hlsInstance.subtitleTracks.map((track, index) => ({
              label: track.name || `Subtitle ${index + 1}`,
              value: index,
            }))
          );
        }
      };

      hlsInstance.on(Hls.Events.MANIFEST_PARSED, updateTracks);
      hlsInstance.on(Hls.Events.AUDIO_TRACKS_UPDATED, updateTracks);
      hlsInstance.on(Hls.Events.SUBTITLE_TRACKS_UPDATED, updateTracks);

      return () => {
        hlsInstance.off(Hls.Events.MANIFEST_PARSED, updateTracks);
        hlsInstance.off(Hls.Events.AUDIO_TRACKS_UPDATED, updateTracks);
        hlsInstance.off(Hls.Events.SUBTITLE_TRACKS_UPDATED, updateTracks);
      };
    }
  }, [hlsInstance]);

  // Re-initialize video when dataStream changes and modal is open
  useEffect(() => {
    if (isStreamOpen && dataStream?.sources?.length > 0 && videoRef?.current && !hlsInstance) {
      // Video source might have changed, ensure it's loaded
      if (videoRef.current.src && videoRef.current.src !== dataStream.sources[0]?.url) {
        // Source changed, will be handled by context provider
      }
    }
  }, [isStreamOpen, dataStream, hlsInstance]);

  const handleAudioChange = (index) => {
    if (hlsInstance && index !== "") {
      hlsInstance.audioTrack = Number(index);
    }
  };

  const handleSubtitleChange = (index) => {
    if (hlsInstance && index !== "") {
      hlsInstance.subtitleTrack = Number(index);
    }
  };

  return (
    <Modal
      header={
        <Heading as="h3" fontSize="xl" textAlign="center" fontWeight="900" letterSpacing="tight">
          {episodeName}
        </Heading>
      }
      isOpen={isStreamOpen}
      onClose={() => {
        setisOpenAlert(true);
      }}
      size="6xl" // Larger player size
    >
      <Stack direction="column" spacing={5}>
        <Box
          position="relative"
          width="100%"
          bg="black"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="0 20px 50px rgba(0,0,0,0.9)"
          border="1px solid rgba(255,255,255,0.05)"
          aspectRatio={16 / 9}
        >
          {vidkingUrl ? (
            <iframe
              src={vidkingUrl}
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#000"
              }}
              title="Vidking Player"
            />
          ) : (
            <video
              ref={videoRef}
              controls
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#000",
                display: "block"
              }}
              playsInline
              preload="metadata"
              crossOrigin="anonymous"
            />
          )}

          {!vidkingUrl && (
            <Stack
              position="absolute"
              inset={0}
              align="center"
              justify="center"
              spacing={4}
              bg="black"
              zIndex={10}
            >
              <Box className="loading-spinner" /> {/* Generic spinner for cinematic look */}
              <Text color="brand.500" fontSize="lg" fontWeight="900" letterSpacing="widest">
                PREPARING CINEMA...
              </Text>
            </Stack>
          )}
        </Box>

        <Box px={4} pb={4}>
          <Text fontSize="xs" color="gray.500" fontWeight="bold">
            YOU ARE WATCHING: <Box as="span" color="white">{episodeName}</Box>
          </Text>
        </Box>
      </Stack>

      <AlertDialog
        isOpen={isOpenAlert}
        onCancel={() => {
          setisOpenAlert(false);
        }}
        onOk={() => {
          closeModalVideo();
        }}
      />
    </Modal>
  );
};
export default EpisodesAnimeStreamingModal;
