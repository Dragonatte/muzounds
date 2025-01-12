"use client";

import React, {
  Dispatch,
  FC,
  JSX,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import SpotifyWebApi from "spotify-web-api-node";

import { useSearch } from "@/context/SearchContext";
import {
  AddIcon,
  FavoriteIcon,
  PlayIcon,
  PlayNextIcon,
  SongActions,
} from "@/components/icons";
import { FullSong } from "@/types";
import PlayListModal from "@/components/PlayListModal";
import { useCurrSong } from "@/context/CurrSong";

const spotifyApi = new SpotifyWebApi({
  clientId: "a324dae7c6db4573b5b39189662cb991",
});

const Search: FC = (): JSX.Element => {
  const [_code, setCode] = useState("");

  useEffect(() => {
    setCode(localStorage.getItem("code") || "");
  }, []);

  const [accessToken, setAccessToken] = useState("");

  const { setSongUris } = useCurrSong();
  const [open, setOpen]: [boolean, Dispatch<SetStateAction<boolean>>] =
    React.useState(false);
  const [searchRes, setSearchRes] = useState<Array<FullSong> | undefined>([]);
  const { search } = useSearch();

  useEffect(() => {
    setAccessToken(localStorage.getItem("accessToken") || "");
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (search === "") return setSearchRes([]);
      if (!accessToken) return;
      let cancel = false;

      spotifyApi
        .searchTracks(search)
        .then((res) => {
          if (cancel) return;
          setSearchRes(
            res.body.tracks?.items.map((track) => {
              const smallestImage = track.album.images.length
                ? track.album.images.reduce((smallest, current) => {
                    if (current.height! < smallest.height!) return current;

                    return smallest;
                  }, track.album.images[0])
                : { url: "", height: 0 };
              const durSec = Math.floor(track.duration_ms / 1000);
              const durMin = Math.floor(durSec / 60);

              return {
                id: track.id,
                title: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                albumImage: smallestImage.url,
                duration: `${durMin}:${durSec - durMin * 60}`,
                uri: track.uri,
              };
            }),
          );
        })
        .catch(() => {
          setSearchRes([]);
        });

      return () => {
        cancel = true;
      };
    }, 300);

    return () => clearTimeout(handler);
  }, [search, accessToken]);

  const headers: Array<{ key: string; label: string }> = [
    {
      key: "title",
      label: "Canción",
    },
    {
      key: "artist",
      label: "Artista",
    },
    {
      key: "album",
      label: "Album",
    },
    {
      key: "duration",
      label: "Duración",
    },
    {
      key: "action",
      label: "",
    },
  ];

  return (
    <>
      <Table
        isHeaderSticky
        removeWrapper
        aria-label="Songs List"
        className={"m-4 w-[calc(100%-2rem)] overflow-auto h-[calc(100%-2rem)]"}
      >
        <TableHeader className={"w-[calc(100%+10px)]"} columns={headers}>
          {(column): React.JSX.Element => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          className={"block overflow-y-auto"}
          emptyContent={"No se encontró la canción que has buscado"}
        >
          {searchRes!.map(
            (song: FullSong): React.JSX.Element => (
              <TableRow key={song.id}>
                <TableCell className="flex items-center gap-4">
                  <div className={"relative"}>
                    <Image
                      alt={`Album cover of ${song.album} by ${song.artist}`}
                      className={"rounded-xl"}
                      height={60}
                      src={song.albumImage}
                      width={60}
                    />
                    <button
                      className={
                        "absolute opacity-0 hover:opacity-100 bg-black/25 size-[3.75rem] flex items-center justify-center top-0 left-0 rounded-xl"
                      }
                      onClick={() => {
                        const uris: string[] = new Array(song.uri);

                        setSongUris(uris);
                        console.log(song.title);
                      }}
                    >
                      <PlayIcon height={32} width={32} />
                    </button>
                  </div>
                  <h2>{song.title}</h2>
                </TableCell>
                <TableCell>{song.artist}</TableCell>
                <TableCell>{song.album}</TableCell>
                <TableCell>{song.duration}</TableCell>
                <TableCell>
                  <Dropdown placement={"bottom-end"}>
                    <DropdownTrigger>
                      <Button
                        isIconOnly
                        aria-label="Perform actions on this song"
                        startContent={<SongActions />}
                      />
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem key={""} startContent={<PlayNextIcon />}>
                        Reproducir a continuación
                      </DropdownItem>
                      <DropdownItem
                        key={""}
                        startContent={<AddIcon />}
                        onPress={() => setOpen(true)}
                      >
                        Añadir a una PlayList
                      </DropdownItem>
                      <DropdownItem key={""} startContent={<FavoriteIcon />}>
                        Marcar como favorita
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
      <PlayListModal open={open} setOpen={setOpen} />
    </>
  );
};

export default Search;
