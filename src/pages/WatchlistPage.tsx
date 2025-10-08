import { SimpleMovieCard } from "../components/SimpleMovieCard";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { removeFromWatchList } from "../store/slices/watchListSlice";

function WatchlistPage() {
  const watchlistItems = useAppSelector((state) => state.watchList.items);
  const dispatch = useAppDispatch();

  const handleRemoveFromWatchlist = (movieId: number) => {
    dispatch(removeFromWatchList(movieId));
  };

  if (watchlistItems.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          My Watchlist
        </h1>
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No movies in your watchlist yet. Start by adding some movies you want to watch!
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        My Watchlist ({watchlistItems.length})
      </h1>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {watchlistItems.map((item) => (
          <SimpleMovieCard 
            key={item.movieId} 
            movie={item} 
            showRemoveButton={true}
            onRemove={handleRemoveFromWatchlist}
          />
        ))}
      </div>
    </main>
  );
}

export default WatchlistPage;