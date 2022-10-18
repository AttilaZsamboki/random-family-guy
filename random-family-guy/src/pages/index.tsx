import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import * as React from "react";
import LoadingStateButton from "../components/LoadingStateButton";
import DangerAlert from "../components/DangerAlert";
import { useInterval } from "usehooks-ts";

interface RandomEpisode {
  tconst: string;
  parentTconst: string;
  seasonNumber: number;
  episodeNumber: number;
}
const Home: NextPage = () => {
  const episodes = trpc.example.getAll.useQuery();
  const [episode, setEpisode] = React.useState<RandomEpisode | undefined>();
  const [init, setInit] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const episodeData = trpc.example.getAllAboutEpisode.useQuery({
    tconst: episode ? episode?.tconst : "",
  }).data;
  const rollEpisode = () => {
    setInit(false);
    setError(false);
    setIsLoading(true);
    if (!episodes.data) {
      return;
    }
    const randomEpisode = Math.floor(Math.random() * episodes.data.length);
    setEpisode(episodes.data[randomEpisode]);
    setIsLoading(false);
  };
  useInterval(
    () => {
      if (!episodeData && !init && !isLoading) {
        setError(true);
        setInit(true);
        return;
      }
    },
    episodeData && init && isLoading ? null : 5000
  );
  return (
    <div className="grid h-screen place-items-center bg-gray-900">
      {error && (
        <DangerAlert errorMsg="Failed to choose random episode, try again" />
      )}
      {episodeData ? (
        <div>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.open(
                "https://www.disneyplus.com/en-gb/series/family-guy/50eOTyhnHBoi"
              );
              window.open(`https://www.imdb.com/title/${episode?.tconst}/`);
            }}
            target="_blank"
            className="text-2xl text-white"
          >
            {episodeData.primaryTitle}
          </a>
          <div className="mt-4 text-center text-lg text-gray-500">
            <p className="mr-4 inline-block">
              <b>S</b>
              {episode?.seasonNumber}
            </p>
            :
            <p className="ml-4 inline-block">
              <b>E</b>
              {episode?.episodeNumber}
            </p>
          </div>
        </div>
      ) : (
        !init && <div></div>
      )}
      <LoadingStateButton
        state={init || episodeData}
        text="Roll Episode"
        onClick={rollEpisode}
      />
    </div>
  );
};

export default Home;
