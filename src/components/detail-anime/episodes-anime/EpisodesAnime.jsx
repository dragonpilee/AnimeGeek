import EpisodesAnimeContextProvider from "./EpisodesAnimeContextProvider";
import EpisodesAnimeList from "./EpisodesAnimeList";
import EpisodesAnimeStreamingModal from "./EpisodesAnimeStreamingModal";

const EpisodesAnime = ({ data }) => {
  return (
    <EpisodesAnimeContextProvider data={data}>
      <EpisodesAnimeList />
      <EpisodesAnimeStreamingModal />
    </EpisodesAnimeContextProvider>
  );
};
export default EpisodesAnime;
