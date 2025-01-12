import { useEffect, useState } from "react";

const useSpotifyAuth = ({ code }: { code: string }) => {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [expiresIn, setExpiresIn] = useState(0);

  useEffect(() => {
    if (!code) return;
    fetch("/api/spotify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    })
      .then((res) => res.json())
      .then((data) => {
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        setExpiresIn(data.expiresIn);
      });
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(
      () => {
        fetch("/api/spotify/refresh", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        })
          .then((res) => res.json())
          .then((data) => {
            setAccessToken(data.accessToken);
            setExpiresIn(data.expiresIn);
          });
      },
      (expiresIn - 60) * 1000,
    );

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return { accessToken, refreshToken, expiresIn };
};

export default useSpotifyAuth;
