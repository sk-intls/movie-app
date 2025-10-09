import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { useTheme } from "../context/ThemeContext";
import { fetchPopularMovies } from "../store/slices/moviesSlice";
import type { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function Header() {
  const { theme, toggleTheme } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  return (
    <header className="flex p-8 cursor-pointer">
      <div className="flex gap-2 items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight"
          role="button"
          onClick={() => dispatch(fetchPopularMovies(1))}
        >
          Movies App
        </Link>
        <Link
          to="/favorites"
          className="font-bold text-gray-900 dark:text-white tracking-tight hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          Favorites
        </Link>
        <Link
          to="/watchlist"
          className="font-bold text-gray-900 dark:text-white tracking-tight hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          Watchlist
        </Link>
        <Link
          to="/watched"
          className="font-bold text-gray-900 dark:text-white tracking-tight hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          Watched
        </Link>
      </div>

      <button
        onClick={toggleTheme}
        className="ml-auto p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors cursor-pointer"
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
