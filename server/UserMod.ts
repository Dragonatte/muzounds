"use server";
import fs from "fs";

import userList from "@/server/users.json";
import { FullUserType } from "@/components/primitives";

const UserMod = () => {
  const _userList: Array<FullUserType> = userList.Users;

  const getUsers = (): Array<FullUserType> => {
    return _userList;
  };

  const addUser = (user: FullUserType): void => {
    _userList.push(user);
    fs.writeFileSync("./server/users.json", JSON.stringify(_userList));
  };

  return {
    getUsers,
    addUser,
  };
};

export default UserMod;
