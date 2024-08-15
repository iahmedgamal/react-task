import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Menu from "./Menu";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-black text-teal-600 p-4 md:p-6 fixed top-0 inset-x-0 z-10 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex-1 flex items-center justify-center md:justify-start">
          <h1 className="text-lg md:text-xl lg:text-2xl font-bold">
            <a href="/" className="hover:text-teal-300">
              User Profile Dashboard
            </a>
          </h1>
        </div>
        <div className="flex items-center space-x-6">
          <nav className="hidden md:flex">
            <Menu />
          </nav>
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <nav className="md:hidden absolute top-16 right-4 bg-white dark:bg-black shadow-lg p-4 rounded">
          <Menu closeMenu={() => setIsMenuOpen(false)} />
        </nav>
      )}
    </header>
  );
}

export default Header;
