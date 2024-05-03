import { Heading } from "@chakra-ui/react";
import Modal from "../../global/Modal";
import { useMemo } from "react";
import formatWord from "../../../helpers/formatWord";
import { useEpisodeAnimeContext } from "./EpisodesAnimeContextProvider";
import useResponsive from "../../../hooks/useResponsive";

const EpisodesAnimeDownloadModal = ({ isOpen, onClose }) => {
  const { episodeValParam, dataStream } = useEpisodeAnimeContext();

  const { sm } = useResponsive();

  const episodeName = useMemo(() => {
    return formatWord(episodeValParam?.replaceAll("-", " "));
  }, [episodeValParam]);

  return (
    <Modal
      header={<Heading>{episodeName}</Heading>}
      isOpen={isOpen}
      size="full"
      onClose={onClose}
    >
      <iframe
        src={dataStream?.download}
        title="W3Schools Free Online Web Tutorials"
        style={{ width: "100%", height: sm ? "70vh" : "80vh" }}
      />
    </Modal>
  );
};
export default EpisodesAnimeDownloadModal;
