import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { useTheme } from "../context/ThemeContext";
import { fetchPopularMovies } from "../store/slices/moviesSlice";
import type { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";

function Header() {
  const { theme, toggleTheme } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  return (
    <header
      className="flex p-8 cursor-pointer"
      role="button"
      onClick={() => dispatch(fetchPopularMovies(1))}
    >
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
