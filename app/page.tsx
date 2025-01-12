import { redirect } from "next/navigation";

const Page = () => {
  const AUTH_URL: string =
    "https://accounts.spotify.com/authorize?" +
    "client_id=a324dae7c6db4573b5b39189662cb991" +
    "&response_type=code" +
    "&redirect_uri=http://localhost:3000/dashboard" +
    "&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

  redirect(AUTH_URL);
};

export default Page;
