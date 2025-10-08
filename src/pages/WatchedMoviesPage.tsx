import { SimpleMovieCard } from "../components/SimpleMovieCard";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { markAsUnwatched } from "../store/slices/watchedMoviesSlice";

function WatchedMoviesPage() {
  const watchedMovies = useAppSelector((state) => state.watchedMovies.items);
  const dispatch = useAppDispatch();

  const handleMarkAsUnwatched = (movieId: number) => {
    dispatch(markAsUnwatched(movieId));
  };

  if (watchedMovies.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Watched Movies
        </h1>
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No watched movies yet. Start marking movies as watched.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Watched Movies ({watchedMovies.length})
      </h1>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {watchedMovies.map((movie) => (
          <SimpleMovieCard 
            key={movie.movieId} 
            movie={movie} 
            showRemoveButton={true}
            onRemove={handleMarkAsUnwatched}
          />
        ))}
      </div>
    </main>
  );
}

export default WatchedMoviesPage;