import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import {
  clearSearch,
  fetchPopularMovies,
  fetchSearchMovies,
} from "../store/slices/moviesSlice";

function SearchBar() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (query.trim()) {
      dispatch(fetchSearchMovies({ query: query.trim(), page: 1 }));
    }
  };

  const handleClear = () => {
    setQuery("");
    dispatch(clearSearch());
    dispatch(fetchPopularMovies(1));
  };
  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="flex-1 relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
          className="w-full px-4 py-3 rounded-lg border border-gray-300 
                     dark:border-gray-600 bg-white dark:bg-gray-800 
                     text-gray-900 dark:text-white
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {query.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 
                       text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            ✕
          </button>
        )}
      </div>

      <button
        type="submit"
        disabled={query.trim().length == 0}
        className="px-6 py-3 bg-blue-500 text-grey rounded-lg 
                   hover:bg-blue-600 disabled:opacity-50 
                   disabled:cursor-not-allowed transition-colors"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
