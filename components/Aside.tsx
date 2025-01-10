import { Dispatch, FC, JSX, SetStateAction, useEffect, useState } from "react";
import { Accordion, AccordionItem, Button, Link } from "@nextui-org/react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";

import { HomeIcon } from "@/components/icons";

const Aside: FC = (): JSX.Element => {
  const router: AppRouterInstance = useRouter();
  const [currLocation, setCurrLocation]: [
    string,
    Dispatch<SetStateAction<string>>,
  ] = useState<string>("");

  useEffect((): void => {
    const locArr: Array<string> = window.location.pathname.split("/");

    setCurrLocation(locArr[locArr.length - 1]);
    router.refresh();
  }, [currLocation]);

  return (
    <aside className={"h-dvh w-1/6 border-r border-r-white p-4"}>
      <Button
        as={Link}
        className={"w-full mb-4 text-left"}
        href={"/dashboard"}
        startContent={<HomeIcon />}
        variant={currLocation === "dashboard" ? "solid" : "light"}
      >
        Inicio
      </Button>
      <Accordion variant={"splitted"}>
        <AccordionItem className={"flex flex-col"} title="Tus playlist">
          <Button className={"w-full ml-4 mb-4"}>Playlist Coche</Button>
          <Button className={"w-full ml-4 mb-4"}>Playlist Estudio</Button>
          <Button className={"w-full ml-4"}>Playlist Random</Button>
        </AccordionItem>
      </Accordion>
    </aside>
  );
};

export default Aside;
