import { FC, JSX } from "react";

import Player from "@/components/Player";

const Footer: FC = (): JSX.Element => {
  return (
    <footer className="w-full border-t border-t-white">
      <Player />
    </footer>
  );
};

export default Footer;
