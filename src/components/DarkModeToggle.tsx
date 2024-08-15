import { useDarkMode } from "./DarkModeContext";

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  return (
    <button
      onClick={toggleDarkMode}
      className=" border rounded p-1"
    >
      {darkMode ? "Light" : "Dark"}
    </button>
  );
};

export default DarkModeToggle;
