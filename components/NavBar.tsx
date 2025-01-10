import { Link } from "@nextui-org/link";
import { FC, JSX } from "react";

const NavBar: FC = (): JSX.Element => {
  return (
    <nav>
      <ul className={"flex gap-4"}>
        <li>
          <Link>Link</Link>
        </li>
        <li>
          <Link>Link</Link>
        </li>
        <li>
          <Link>Link</Link>
        </li>
        <li>
          <Link>Link</Link>
        </li>
        <li>
          <Link>Link</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
