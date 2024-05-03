import { Button, Heading, Stack } from "@chakra-ui/react";
import formatWord from "../../../helpers/formatWord";
import { useEpisodeAnimeContext } from "./EpisodesAnimeContextProvider";
import { useCallback, useMemo, useState } from "react";
import AlertDialog from "../../global/AlertDialog";
import Modal from "../../global/Modal";
import Select from "../../global/Select";
import videoHLS from "../../../helpers/videoHLS";
import EpisodesAnimeDownloadModal from "./EpisodesAnimeDownloadModal";

const EpisodesAnimeStreamingModal = () => {
  const [isOpenAlert, setisOpenAlert] = useState(false);
  const [openModalDownload, setOpenModalDownload] = useState(false);

  const {
    isStreamOpen,
    episodeValParam,
    videoRef,
    closeModalVideo,
    dataStream,
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
