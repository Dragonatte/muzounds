"use client";
import { FC, JSX, ChangeEvent, useState, useEffect } from "react";
import { Input } from "@nextui-org/input";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useSession } from "next-auth/react";
import { User as UserType } from "@prisma/client";

import Logo from "@/components/Logo";
import User from "@/components/User";
import { useSearch } from "@/context/SearchContext";
import { SearchIcon } from "@/components/icons";
import { transformUser } from "@/actions/auth-actions";

const Header: FC = (): JSX.Element => {
  const [user, setUser] = useState<UserType | null>(null);

  const { search, setSearch } = useSearch();
  const router: AppRouterInstance = useRouter();
  const { data: session } = useSession();

  function handleClick(): void {
    router.push("/dashboard/search");
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    setSearch(e.target.value);
  }

  useEffect(() => {
    (async () => {
      const user = await transformUser(session!);

      setUser(user);
    })();
  }, [session]);

  return (
    <header className="w-full flex items-center justify-between p-4 border-b border-b-white">
      <Logo />
      <Input
        className="w-1/2"
        placeholder="Search..."
        startContent={<SearchIcon />}
        type="text"
        value={search}
        onChange={handleChange}
        onClick={handleClick}
      />
      <User userProp={user} />
    </header>
  );
};

export default Header;
