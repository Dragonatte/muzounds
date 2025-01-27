"use client";

import {
  Button,
  Link,
  User as UserComponent,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { FC, JSX } from "react";
import { signOut } from "next-auth/react";
import { User as UserType } from "@prisma/client";

interface UserProps {
  userProp: UserType | null;
}

const User: FC<UserProps> = ({ userProp }): JSX.Element => {
  const onClick = async () => {
    await signOut({
      redirectTo: "/dashboard",
    });
  };

  return (
    <>
      {userProp !== null ? (
        <Dropdown backdrop={"blur"} placement="bottom-end">
          <DropdownTrigger>
            <UserComponent
              as="button"
              avatarProps={{ src: userProp.image! }}
              description={userProp.email}
              name={userProp.fullname!}
            />
          </DropdownTrigger>
          <DropdownMenu variant={"flat"}>
            <DropdownItem key={"profile"} as={Link} href={"/dashboard/profile"}>
              Profile
            </DropdownItem>
            <DropdownItem
              key={"sign out"}
              className="text-danger"
              color="danger"
              onClick={onClick}
            >
              Sign Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <div className="flex gap-4">
          <Button as={Link} color="primary" href="/auth/signin">
            Sign In
          </Button>
          <Button as={Link} href="/auth/signup">
            Sign Up
          </Button>
        </div>
      )}
    </>
  );
};

export default User;
