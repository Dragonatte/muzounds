import { Dispatch, FC, JSX, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";

import { FullSong } from "@/types";

import SongList from "@/songs_list.json";

const MusicInfo: FC<{ songId: number }> = ({
  songId,
}: {
  songId: number;
}): JSX.Element => {
  const [song, setSong]: [
    FullSong | null,
    Dispatch<SetStateAction<FullSong | null>>,
  ] = useState<FullSong | null>(null);

  useEffect((): void => {
    if (songId === 0) return;
    SongList.songs.find((s: FullSong): void => {
      if (s.id === songId) {
        setSong(s);
      }
    });
  }, [songId]);

  return (
    <section className={"flex items-center justify-end"}>
      <div>
        {song ? (
          <div className={"flex justify-center items-center gap-4"}>
            <Image
              alt={song.title}
              className={"rounded-2xl"}
              height={64}
              src={song.image_url}
              width={64}
            />
            <div>
              <h3>
                {song.title} - {song.artist}
              </h3>
              <p className={"text-white/50 text-sm"}>{song.album}</p>
            </div>
          </div>
        ) : (
          <p>Selecciona una canción</p>
        )}
      </div>
    </section>
  );
};

export default MusicInfo;
