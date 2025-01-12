"use client";
import { useEffect, useState, FC, JSX, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import SpotifyWebApi from "spotify-web-api-node";

import ShowList from "@/components/ShowList";
import useSpotifyAuth from "@/hooks/useSpotifyAuth";
import { FullSong } from "@/types";

const spotifyApi = new SpotifyWebApi({
  clientId: "a324dae7c6db4573b5b39189662cb991",
});

const Dashboard: FC = (): JSX.Element => {
  const [featuredSongs, setFeaturedSongs] = useState<Array<FullSong>>([]);
  const [newSongs, setNewSongs] = useState<Array<FullSong>>([]);
  const params = useSearchParams();
  const code: string = params.get("code") || "";
  const { accessToken } = useSpotifyAuth({ code });

  useEffect(() => {
    if (code) localStorage.setItem("code", code);
  }, [code]);

  useEffect(() => {
    if (accessToken) localStorage.setItem("accessToken", accessToken);
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    const topSongsPlayListId = "2AXdMCWTUwGvoyoip4CiQW";

    (async () => {
      const _accessToken = localStorage.getItem("accessToken") || "";

      spotifyApi.setAccessToken(_accessToken);

      const data = await spotifyApi.getPlaylist(topSongsPlayListId);
      const tracks = data.body.tracks.items.slice(0, 20).map((item) => {
        const track = item.track!;
        const biggestImage = track.album.images.reduce((biggest, current) =>
          current.height! > biggest.height! ? current : biggest,
        );
        const durMin = Math.floor(track.duration_ms / 60000);
        const durSec = Math.floor(track.duration_ms / 1000);

        return {
          id: track.id,
          title: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          albumImage: biggestImage.url,
          duration: `${durMin}:${durSec - durMin * 60}`,
          uri: track.uri,
        };
      });

      setFeaturedSongs(tracks);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const _accessToken = localStorage.getItem("accessToken") || "";

      spotifyApi.setAccessToken(_accessToken);

      const data = await spotifyApi.getNewReleases();
      const tracks = data.body.albums.items.slice(0, 20).map((item) => {
        const track = item!;
        const biggestImage = track.images.reduce((biggest, current) =>
          current.height! > biggest.height! ? current : biggest,
        );

        return {
          id: track.id,
          title: track.name,
          artist: track.artists[0].name,
          albumImage: biggestImage.url,
          uri: track.uri,
          album: "",
          duration: "",
        };
      });

      setNewSongs(tracks);
    })();
  }, []);

  return (
    <main className="w-full overflow-x-hidden">
      <Suspense fallback={<p>Loading...</p>}>
        <ShowList
          collection={featuredSongs}
          subtitle="Las canciones más populares"
          title="Canciones destacadas"
        />
      </Suspense>
      <ShowList
        collection={newSongs}
        subtitle="Las canciones más recientes" // Las canciones más recientes
        title="Nuevas canciones"
      />
    </main>
  );
};

export default Dashboard;
