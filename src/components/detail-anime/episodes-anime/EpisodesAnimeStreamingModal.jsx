import { Button, Heading, Stack } from "@chakra-ui/react";
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
        setAudioTracks(
          hlsInstance.audioTracks.map((track, index) => ({
            label: track.name,
            value: index,
          }))
        );
        setSubtitleTracks(
          hlsInstance.subtitleTracks.map((track, index) => ({
            label: track.name,
            value: index,
          }))
        );
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
        <Heading as="h3" fontSize="xl" textAlign="center">
          {episodeName}
        </Heading>
      }
      isOpen={isStreamOpen}
      onClose={() => {
        setisOpenAlert(true);
      }}
      size="xl"
    >
      <Stack direction="column" spacing={5}>
        <video ref={videoRef} controls />
        <Stack direction="row" spacing={5}>
          {audioTracks.length > 1 && (
            <Select
              placeholder="Audio"
              listOptions={audioTracks}
              onChange={handleAudioChange}
            />
          )}
          {subtitleTracks.length > 0 && (
            <Select
              placeholder="Subtitles"
              listOptions={subtitleTracks}
              onChange={handleSubtitleChange}
            />
          )}
          <Select
            placeholder="Choose Quality"
            listOptions={listQualityStreaming}
            onChange={changeQualityHandler}
          />
          <Button
            onClick={() => {
              setOpenModalDownload(true);
            }}
          >
            Download
          </Button>
        </Stack>
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

      <EpisodesAnimeDownloadModal
        isOpen={openModalDownload}
        onClose={() => {
          setOpenModalDownload(false);
        }}
      />
    </Modal>
  );
};
export default EpisodesAnimeStreamingModal;
