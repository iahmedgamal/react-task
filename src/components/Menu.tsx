// Menu.tsx
import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

const Menu = ({ closeMenu }: { closeMenu?: () => void }) => {
  return (
    <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
      <li>
        <Link
          to="/profile"
          className="hover:text-teal-300"
          onClick={closeMenu}
        >
          Profile
        </Link>
      </li>
      <li>
        <Link
          to="/settings"
          className="hover:text-teal-300"
          onClick={closeMenu}
        >
          Settings
        </Link>
      </li>
      <li>
        <DarkModeToggle />
      </li>
    </ul>
  );
};

export default Menu;
