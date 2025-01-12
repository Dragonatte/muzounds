import { NextRequest } from "next/server";
import SpotifyWebApi from "spotify-web-api-node";

export async function POST(req: NextRequest) {
  const { refreshToken } = await req.json();

  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI,
    refreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      return {
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      };
    })
    .catch(() => {
      return {
        accessToken: "",
        expiresIn: 0,
      };
    });
}
