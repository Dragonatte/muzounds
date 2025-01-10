"use client";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import clsx from "clsx";
import { Divider, Input, Spacer } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { User as UserType } from "@prisma/client";

import { subtitle, title } from "@/components/primitives";
import { EditIcon } from "@/components/icons";
import { transformUser } from "@/actions/auth-actions";

const Page: React.FC = (): React.JSX.Element => {
  const [user, setUser] = useState<UserType | null>(null);

  const { data: session } = useSession();

  useEffect(() => {
    (async () => {
      const user = await transformUser(session!);

      setUser(user);
    })();
  }, [session]);

  return (
    <div>
      <section className={"flex items-end p-4 relative"}>
        <Image
          alt={user?.username as string}
          className={"rounded-full bg-white/25 mr-4"}
          height={128}
          src={(user?.image?.replace("svg", "png") as string) ?? "/logo.png"}
          width={128}
        />
        <div
          className={
            "absolute " +
            "size-32 " +
            "rounded-full " +
            "z-20 " +
            "opacity-0 hover:opacity-100 transition-opacity " +
            "bg-white/50 " +
            "flex items-center justify-around " +
            "cursor-pointer"
          }
        >
          <EditIcon />
        </div>
        <div>
          <h1 className={clsx(title())}>{user?.username}</h1>
          <h2 className={clsx(subtitle())}>{user?.email}</h2>
        </div>
      </section>
      <Divider />
      <section className={"p-4"}>
        <Input
          label={"Nombre completo"}
          labelPlacement={"outside"}
          type={"text"}
          value={user?.username}
        />
        <Spacer y={4} />
        <Input
          label={"Email"}
          labelPlacement={"outside"}
          type={"email"}
          value={user?.email}
        />
        <Spacer y={4} />
        <Input
          label={"Contraseña"}
          labelPlacement={"outside"}
          type={"password"}
          value={"********"}
        />
      </section>
    </div>
  );
};

export default Page;
