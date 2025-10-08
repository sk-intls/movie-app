import { getImageUrl } from "../utils/constants";
import { HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { TrashIcon, EyeIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addFavorite, removeFavorite } from "../store/slices/favoriteSlice";
import type { Favorite, WatchlistItem, WatchedMovie } from "../types/storage";

type SimpleMovieData = Favorite | WatchlistItem | WatchedMovie;

interface SimpleMovieCardProps {
  movie: SimpleMovieData;
  onRemove?: (movieId: number) => void;
  showRemoveButton?: boolean;
}

export function SimpleMovieCard({ 
  movie, 
  onRemove,
  showRemoveButton = false 
}: SimpleMovieCardProps) {
  const posterSize = window.innerWidth < 640 ? "small" : "medium";
  const posterUrl = getImageUrl(movie.posterPath, "poster", posterSize);
  
  const dispatch = useAppDispatch();
  const isFavorited = useAppSelector((state) =>
    state.favorites.items.some((fav) => fav.movieId === movie.movieId)
  );

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorited) {
      dispatch(removeFavorite(movie.movieId));
    } else {
      dispatch(
        addFavorite({
          movieId: movie.movieId,
          title: movie.title,
          posterPath: movie.posterPath,
          userRating: null,
          notes: "",
          addedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
      );
    }
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemove) {
      onRemove(movie.movieId);
    }
  };

  const handleMovieClick = () => {
    console.log("Movie clicked", movie.title);
    // TODO: Navigate to movie details page
  };

  const isWatchedMovie = (movie: SimpleMovieData): movie is WatchedMovie => {
    return 'watchedAt' in movie;
  };

  const isFavoriteMovie = (movie: SimpleMovieData): movie is Favorite => {
    return 'notes' in movie && 'updatedAt' in movie;
  };

  const getDateLabel = () => {
    if (isWatchedMovie(movie)) {
      return `Watched: ${new Date(movie.watchedAt).toLocaleDateString()}`;
    }
    if ('addedAt' in movie) {
      return `Added: ${new Date(movie.addedAt).toLocaleDateString()}`;
    }
    return '';
  };

  const getUserRating = () => {
    if (isWatchedMovie(movie) || isFavoriteMovie(movie)) {
      return movie.userRating;
    }
    return null;
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden 
                 transform transition-all duration-200 hover:scale-105 hover:shadow-xl 
                 cursor-pointer group"
      role="button"
      tabIndex={0}
      onKeyDown={(e) =>
        e.key === "Enter" && handleMovieClick()
      }
      onClick={handleMovieClick}
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={posterUrl}
          alt={`${movie.title} poster`}
          className="w-full h-64 object-cover"
        />
        

        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 left-2 p-2 rounded-full
          bg-transparent border-0 outline-none ring-0
          hover:bg-transparent hover:border-0 hover:outline-none hover:ring-0
          focus:bg-transparent focus:border-0 focus:outline-none focus:ring-0
          active:bg-transparent active:border-0 active:outline-none active:ring-0
          active:scale-120 transition-transform duration-700 ease-out"
          aria-label={
            isFavorited ? "Remove from favorites" : "Add to favorites"
          }
          style={{ background: "transparent" }}
        >
          {isFavorited ? (
            <HeartIcon className="h-5 w-5 text-white" />
          ) : (
            <HeartOutline className="h-5 w-5 text-white" />
          )}
        </button>

        {getUserRating() !== null && (
          <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 
                        text-xs font-bold px-2 py-1 rounded-full shadow-lg flex items-center gap-1">
            <StarIcon className="h-3 w-3" />
            {getUserRating()?.toFixed(1)}
          </div>
        )}

        {isWatchedMovie(movie) && (
          <div className="absolute bottom-2 left-2 bg-green-500 text-white 
                        text-xs font-bold px-2 py-1 rounded-full shadow-lg flex items-center gap-1">
            <EyeIcon className="h-3 w-3" />
            Watched
          </div>
        )}

        {showRemoveButton && onRemove && (
          <button
            onClick={handleRemoveClick}
            className="absolute bottom-2 right-2 p-2 rounded-full
            bg-black/20 backdrop-blur-sm border-0 outline-none ring-0
            hover:bg-red-500/80 focus:bg-red-500/80
            active:scale-110 transition-all duration-200"
            aria-label="Remove from list"
          >
            <TrashIcon className="h-4 w-4 text-white" />
          </button>
        )}
      </div>
      
      <div className="p-3">
        <h3
          className="font-semibold text-gray-900 dark:text-white truncate 
                       text-sm md:text-base mb-2"
        >
          {movie.title}
        </h3>
        
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
          {getDateLabel()}
        </p>
      </div>
    </div>
  );
}