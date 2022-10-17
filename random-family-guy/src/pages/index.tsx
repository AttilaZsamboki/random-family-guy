import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import * as React from "react";

const Home: NextPage = () => {
  const episodes = trpc.example.getAll.useQuery();
  const [episode, setEpisode] = React.useState<string | undefined>("");
  if (!episodes.data) {
    return <div>Loading...</div>;
  }
  const rollEpisode = () => {
    const randomEpisode = Math.floor(Math.random() * episodes.data.length);
    setEpisode(episodes.data[randomEpisode]?.tconst);
  };
  return (
    <div>
      {episode && (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.open(
              "https://www.disneyplus.com/en-gb/series/family-guy/50eOTyhnHBoi"
            );
            window.open(`https://www.imdb.com/title/${episode}/`);
          }}
          target="_blank"
        >
          Random
        </a>
      )}
      <button
        type="button"
        className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        onClick={rollEpisode}
      >
        Roll Random
      </button>
    </div>
  );
};

export default Home;
