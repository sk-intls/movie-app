import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { useTheme } from "../context/ThemeContext";

function Header() {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="flex p-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
        Movies App
      </h2>
      <button
        onClick={toggleTheme}
        className=" ml-auto p-2 rounded-full bg-gray-200 
        dark:bg-gray-700 text-gray-800 dark:text-gray-200 
        hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      >
        {theme == "dark" ? (
          <SunIcon className="h-6 w-6" />
        ) : (
          <MoonIcon className="h-6 w-6" />
        )}
      </button>
    </header>
  );
}

export default Header;
