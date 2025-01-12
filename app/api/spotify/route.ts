import { NextRequest, NextResponse } from "next/server";
import SpotifyWebApi from "spotify-web-api-node";

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();

    const spotifyApi = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      redirectUri: process.env.SPOTIFY_REDIRECT_URI,
    });

    // Obtener los tokens de acceso
    const data = await spotifyApi.authorizationCodeGrant(code);

    // Enviar la respuesta con los tokens
    return NextResponse.json({
      accessToken: data.body.access_token,
      refreshToken: data.body.refresh_token,
      expiresIn: data.body.expires_in,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to authenticate with Spotify", error: error },
      { status: 403 },
    );
  }
}
