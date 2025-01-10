"use client";
import { Dispatch, SetStateAction, useEffect, useState, FC, JSX } from "react";

import ShowList from "@/components/ShowList";
import { Song } from "@/types";

const Dashboard: FC = (): JSX.Element => {
  const [user, setUser]: [{}, Dispatch<SetStateAction<{}>>] = useState<{}>({});

  useEffect(() => {
    const userSession = JSON.parse(localStorage.getItem("user") ?? "null");

    if (userSession) setUser(user);
  }, [user]);

  const featuredSongs: Array<Song> = [];
  const newSongs: Array<Song> = [];
  const genres: Array<Song> = [];

  for (let i = 0; i < 20; i++) {
    const url = "https://picsum.photos/192/192";

    featuredSongs.push({
      title: `Featured Song ${i + 1}`,
      artist: `Artist ${i + 1}`,
      image: url,
    });
    newSongs.push({
      title: `New Song ${i + 1}`,
      artist: `Artist ${i + 1}`,
      image: url,
    });
    if (i % 2 === 0)
      genres.push({
        title: `Genre ${i / 2 + 1}`,
        artist: ``,
        image: url,
      });
  }

  return (
    <main className="w-full overflow-x-hidden">
      <ShowList
        collection={featuredSongs}
        subtitle="Las canciones más populares"
        title="Canciones destacadas"
      />
      <ShowList
        collection={newSongs}
        subtitle="Las canciones más recientes" // Las canciones más recientes
        title="Nuevas canciones"
      />
      <ShowList
        collection={genres}
        subtitle="Descubre nuevos géneros" // Descubre nuevos géneros
        title={'Géneros "For U"'}
      />
    </main>
  );
};

export default Dashboard;
