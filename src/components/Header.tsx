import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-slate-100 text-teal-600 p-4 md:p-6 fixed top-0 inset-x-0 z-10 shadow-sm">
      <div className="flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-bold">
          <a href="/" className="hover:text-teal-300">
            User Profile Dashboard
          </a>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/profile" className="hover:text-teal-300">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/Settings" className="hover:text-teal-300">
                settings
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
