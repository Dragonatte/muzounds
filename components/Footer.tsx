import { FC, JSX } from "react";
import { Slider } from "@nextui-org/react";

import MusicInfo from "@/components/MusicInfo";
import Player from "@/components/Player";
import { VolumeIcon } from "@/components/icons";
import { useCurrSong } from "@/context/CurrSong";

const Footer: FC = (): JSX.Element => {
  const { songId } = useCurrSong();

  return (
    <footer className="w-full border-t border-t-white grid grid-cols-3 p-4 gap-4 items-center">
      <Slider
        aria-label={"Volume"}
        className={"w-3/4"}
        hideThumb={true}
        isDisabled={songId === 0}
        showTooltip={true}
        startContent={<VolumeIcon />}
      />
      <Player />
      <MusicInfo songId={songId} />
    </footer>
  );
};

export default Footer;
