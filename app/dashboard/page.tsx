"use client";
import {useClientSearchParams} from "@/hooks/useClientSearchParams";

export const dynamic = "force-dynamic";

import { useEffect, useState, FC, JSX, Suspense } from "react";
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
  const params = useClientSearchParams();
  const code: string = params?.get("code") || "";
  const { accessToken } = useSpotifyAuth({ code });

  useEffect(() => {
    if (code) localStorage.setItem("code", code);
  }, [code]);

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      spotifyApi.setAccessToken(accessToken);
    }
  }, [accessToken]);

  useEffect(() => {
    const fetchFeaturedSongs = async () => {
      try {
        const _accessToken = localStorage.getItem("accessToken") || "";

        spotifyApi.setAccessToken(_accessToken);

        const data = await spotifyApi.getPlaylist("2AXdMCWTUwGvoyoip4CiQW");
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
            duration: `${durMin}:${String(durSec - durMin * 60).padStart(2, "0")}`,
            uri: track.uri,
          };
        });

        setFeaturedSongs(tracks);
      } catch (error) {
        console.error("Error fetching featured songs:", error);
      }
    };

    fetchFeaturedSongs();
  }, []);

  useEffect(() => {
    const fetchNewSongs = async () => {
      try {
        const _accessToken = localStorage.getItem("accessToken") || "";
        spotifyApi.setAccessToken(_accessToken);

        const data = await spotifyApi.getNewReleases();
        const tracks = data.body.albums.items.slice(0, 20).map((item) => {
          const biggestImage = item.images.reduce((biggest, current) =>
            current.height! > biggest.height! ? current : biggest,
          );

          return {
            id: item.id,
            title: item.name,
            artist: item.artists[0].name,
            albumImage: biggestImage.url,
            uri: item.uri,
            album: "",
            duration: "",
          };
        });

        setNewSongs(tracks);
      } catch (error) {
        console.error("Error fetching new releases:", error);
      }
    };

    fetchNewSongs();
  }, []);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <main className="w-full overflow-x-hidden">
        <ShowList
          collection={featuredSongs}
          subtitle="Las canciones más populares"
          title="Canciones destacadas"
        />
        <ShowList
          collection={newSongs}
          subtitle="Las canciones más recientes"
          title="Nuevas canciones"
        />
      </main>
    </Suspense>
  );
};

export default Dashboard;
