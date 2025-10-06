import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { useDebounce } from "../hooks/useDebounce";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { fetchSearchMovies } from "../store/slices/moviesSlice";

function SearchBar() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const searchTerm = useDebounce(query);
  const handleSearch = () => {
    dispatch(fetchSearchMovies({ query: searchTerm, page: 1 }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      dispatch(fetchSearchMovies({ query: searchTerm, page: 1 }));
    }
  };

  return (
    <div className="relative max-w-lg mx-auto">
      <div
        className="flex items-center bg-white dark:bg-gray-800 border 
      border-gray-300 dark:border-gray-600 rounded-full shadow-sm 
      focus-within:ring-2 focus-within:ring-blue-500 
      dark:focus-within:ring-blue-400 transition-all overflow:hidden"
      >
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search for movies..."
          className="flex-1 px-4 py-2 bg-transparent 
          text-gray-900 dark:text-white placeholder-gray-500 
          dark:placeholder-gray-400 focus:outline-none"
          aria-label="Search movies"
        />
        <button
          onClick={handleSearch}
          className="p-2 mr-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Search"
        >
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
