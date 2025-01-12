import { FC, JSX, useEffect, useState } from "react";
import SpotifyWebPlayer from "react-spotify-web-playback";

import { useCurrSong } from "@/context/CurrSong";

const Player: FC = (): JSX.Element => {
  const [play, setPlay] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const { songUris } = useCurrSong();

  useEffect(() => {
    setToken(localStorage.getItem("accessToken"));
  }, [songUris]);

  useEffect(() => {
    setPlay(true);
  }, [songUris]);

  if (!token) return <></>;

  return (
    <SpotifyWebPlayer
      play={play}
      styles={{
        activeColor: "#fff",
        bgColor: "#000",
        color: "#fff",
        loaderColor: "#fff",
        sliderColor: "#006FEE",
        trackArtistColor: "#ccc",
      }}
      token={token}
      uris={songUris}
    />
  );
};

export default Player;
