"use client";

import React, { Dispatch, FC, JSX, SetStateAction } from "react";
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

import SongList from "@/songs_list.json";
import { useSearch } from "@/context/SearchContext";
import {
  AddIcon,
  FavoriteIcon,
  PlayNextIcon,
  SongActions,
} from "@/components/icons";
import { FullSong } from "@/types";
import PlayListModal from "@/components/PlayListModal";
import { useCurrSong } from "@/context/CurrSong";

const Search: FC = (): JSX.Element => {
  const { songId, setSongId } = useCurrSong();
  const [open, setOpen]: [boolean, Dispatch<SetStateAction<boolean>>] =
    React.useState(false);
  const { search } = useSearch();

  const filteredSongs: Array<FullSong> = SongList.songs
    .filter((song: FullSong): boolean =>
      search !== ""
        ? song.title.toLowerCase().includes(search.toLowerCase())
        : true,
    )
    .sort((a: FullSong, b: FullSong): number => a.title.localeCompare(b.title));

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
          {filteredSongs.map(
            (song: FullSong): React.JSX.Element => (
              <TableRow key={song.id}>
                <TableCell className="flex items-center gap-4">
                  <Image
                    alt={`Album cover of ${song.album} by ${song.artist}`}
                    className={"rounded-xl"}
                    height={60}
                    src={song.image_url}
                    width={60}
                    onClick={() => setSongId(song.id)}
                  />
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
