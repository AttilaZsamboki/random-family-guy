import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import * as React from "react";

interface RandomEpisode {
  tconst: string;
  parentTconst: string;
  seasonNumber: number;
  episodeNumber: number;
}

const Home: NextPage = () => {
  const episodes = trpc.example.getAll.useQuery();
  const [episode, setEpisode] = React.useState<RandomEpisode | undefined>();
  const episodeData = trpc.example.getAllAboutEpisode.useQuery({
    tconst: episode ? episode?.tconst : "",
  }).data;
  if (!episodes.data) {
    return <div>Loading...</div>;
  }
  const rollEpisode = () => {
    const randomEpisode = Math.floor(Math.random() * episodes.data.length);
    setEpisode(episodes.data[randomEpisode]);
  };
  return (
    <div className="grid h-screen place-items-center bg-gray-900">
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
            className="text-white"
          >
            {episodeData.primaryTitle}
          </a>
          <p className="text-gray-500">
            {episode?.seasonNumber}:{episode?.episodeNumber}
          </p>
        </div>
      ) : (
        <div className="text-white">Loading...</div>
      )}
      <button
        type="button"
        className="rounded border-b-4 border-blue-700 bg-blue-500 py-2 px-4 font-bold text-white hover:border-blue-500 hover:bg-blue-400"
        onClick={rollEpisode}
      >
        Roll Random
      </button>
    </div>
  );
};

export default Home;
