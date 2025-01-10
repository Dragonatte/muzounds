import { FC, JSX, useEffect, useRef, useState } from "react";
import { Button, Progress } from "@nextui-org/react";

import {
  PauseIcon,
  PlayIcon,
  PreviousIcon,
  NextIcon,
} from "@/components/icons";
import SongList from "@/songs_list.json";
import { FullSong } from "@/types";

const Player: FC = (): JSX.Element => {
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(-1);
  const [play, setPlay] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentSong: FullSong | undefined = SongList.songs[currentSongIndex];

  useEffect((): void => {
    //console.log(currentSong);
    if (currentSong) {
      const [minutes, seconds] = currentSong.duration.split(":").map(Number);

      setDuration(minutes * 60 + seconds);
      setProgress(0);
      setPlay(true);
    }
  }, [currentSong]);

  useEffect(() => {
    if (play) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev < duration - 1) return prev + 1;
          else {
            setPlay(false);
            clearInterval(intervalRef.current!);

            return 0;
          }
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return (): void => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [play, duration]);

  const handleNext = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % SongList.songs.length);
  };

  const handlePrevious = () => {
    setCurrentSongIndex(
      (prevIndex) =>
        (prevIndex - 1 + SongList.songs.length) % SongList.songs.length,
    );
  };

  return (
    <section>
      <div className={"flex justify-between items-center mb-2"}>
        <Button
          isIconOnly
          aria-label="Previous"
          variant={"light"}
          onPress={handlePrevious}
        >
          <PreviousIcon />
        </Button>
        <Button
          isIconOnly
          aria-label="Play/Pause"
          variant={"light"}
          onPress={() => setPlay((prev) => !prev)}
        >
          {play ? <PauseIcon /> : <PlayIcon />}
        </Button>
        <Button
          isIconOnly
          aria-label="Next"
          variant={"light"}
          onPress={handleNext}
        >
          <NextIcon />
        </Button>
      </div>
      <div>
        <Progress
          aria-label={"Song progress"}
          maxValue={duration}
          value={progress}
          onClick={(e): void => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percentage = (x / rect.width) * 100;

            setProgress(parseInt(String((duration * percentage) / 100)));
          }}
          /*onDrag={(e): void => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percentage = (x / rect.width) * 100;

            setProgress(parseInt(String((duration * percentage) / 100)));
          }}*/
        />
        <div className="text-sm text-center mt-1">
          {Math.floor(progress / 60)}:
          {(progress % 60).toString().padStart(2, "0")} /{" "}
          {Math.floor(duration / 60)}:
          {(duration % 60).toString().padStart(2, "0")}
        </div>
      </div>
    </section>
  );
};

export default Player;
