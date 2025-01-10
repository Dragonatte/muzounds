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
  id: number;
  title: string;
  artist: string;
  album: string;
  year: number;
  duration: string;
  genre: string;
  composer: string[];
  language: string;
  image_url: string;
  mp3_url: string;
};
