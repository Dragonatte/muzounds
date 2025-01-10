import clsx from "clsx";
import { FC, JSX } from "react";
import Image from "next/image";
import Link from "next/link";

import { title } from "@/components/primitives";
import { fontTitle } from "@/config/fonts";

const Logo: FC = (): JSX.Element => {
  return (
    <Link className={"flex"} href={"/dashboard"}>
      <Image
        alt="logo"
        className={"mr-4"}
        height={48}
        src="/logo.svg"
        width={48}
      />
      <h1 className={clsx(title({ color: "blue" }), fontTitle.className)}>
        MuZounds
      </h1>
    </Link>
  );
};

export default Logo;
