import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Song = {
  title: string;
  artist: string;
  image: string;
};

export type FullSong = {
  id: string;
  title: string;
  artist: string;
  album: string;
  albumImage: string;
  duration: string;
  uri: string;
};
