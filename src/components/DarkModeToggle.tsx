import { useDarkMode } from "./DarkModeContext";
import { FaMoon, FaSun } from "react-icons/fa";

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  
  return (
    <button
      onClick={toggleDarkMode}
      className="flex items-center border rounded p-2 bg-white dark:bg-gray-800 text-teal-600 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-gray-700 transition-colors"
    >
      {darkMode ? (
        <FaSun size={20} className="mr-2" />
      ) : (
        <FaMoon size={20} className="mr-2" />
      )}
    </button>
  );
};

export default DarkModeToggle;
