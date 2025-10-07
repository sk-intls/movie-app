import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store/store";
import { useEffect } from "react";
import {
  fetchPopularMovies,
  fetchSearchMovies,
} from "./store/slices/moviesSlice";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import { Movie } from "./components/Movie";
import type { IMovie } from "./types/movie";
import { MovieSkeleton } from "./components/MovieSkeleton";
import { Pagination } from "./components/Pagination";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, loading, error, currentPage, totalPages, searchQuery } =
    useSelector((state: RootState) => state.movies);

  useEffect(() => {
    dispatch(fetchPopularMovies(1));
  }, [dispatch]);

  const handlePageChange = (page: number) => {
    if (page === currentPage) return;
    if (searchQuery.length > 0) {
      dispatch(fetchSearchMovies({ query: searchQuery, page }));
    } else {
      dispatch(fetchPopularMovies(page));
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchBar />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {error && (
          <div
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 
                          rounded-lg p-4 text-red-800 dark:text-red-200"
          >
            <p className="font-semibold">Error loading movies</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {loading && (
          <div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 
                          lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6"
          >
            {[...Array(12)].map((_, i) => (
              <MovieSkeleton key={i} />
            ))}
          </div>
        )}
        <div
          className="grid grid-cols-2 
        sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6"
        >
          {movies.map((movie: IMovie) => (
            <Movie movie={movie} key={movie.id} />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

        {!loading && !error && movies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {searchQuery
                ? "No movies found for your search"
                : "No movies available"}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
