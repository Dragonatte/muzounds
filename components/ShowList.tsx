import clsx from "clsx";
import React, { JSX } from "react";

import { title as t, subtitle as s } from "./primitives";

import { FullSong } from "@/types";
import { fontTitle } from "@/config/fonts";
import {useCurrSong} from "@/context/CurrSong";

interface ShowListProps {
  title: string;
  subtitle: string;
  collection: Array<FullSong>;
}

const ShowList: React.FC<ShowListProps> = ({
  title,
  subtitle,
  collection,
}: ShowListProps): React.JSX.Element => {
  const { setSongUris } = useCurrSong();
  return (
    <div className="p-4">
      <h1 className={clsx(t({}), fontTitle.className)}>{title}</h1>
      <h2 className={clsx(s({}), fontTitle.className)}>{subtitle}</h2>
      <div className="flex gap-4 overflow-x-scroll py-4">
        {collection.map(
          ({ title, artist, albumImage, uri }: FullSong, index: number): JSX.Element => (
            <div key={index}>
              <button
                className={
                  "rounded-2xl shadow-lg min-h-48 min-w-48 p-2 relative"
                }
                style={{
                  backgroundImage: `url(${albumImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}

                onClick={() => {setSongUris([uri])}}
              />
              <h3>{title}</h3>
              <h4>{artist}</h4>
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default ShowList;
