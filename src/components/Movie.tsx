import type { IMovie } from "../types/movie";
import { getImageUrl } from "../utils/constants";
import { GENRE_MAP } from "../utils/constants";
import { HeartIcon, BookmarkIcon, EyeIcon } from "@heroicons/react/24/solid";
import {
  HeartIcon as HeartOutline,
  BookmarkIcon as BookmarkOutline,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addFavorite, removeFavorite } from "../store/slices/favoriteSlice";
import {
  addToWatchList,
  removeFromWatchList,
} from "../store/slices/watchListSlice";
import {
  markAsWatched,
  markAsUnwatched,
} from "../store/slices/watchedMoviesSlice";
import ButtonIcon from "./ButtonIcon";

export function Movie({ movie }: { movie: IMovie }) {
  const posterSize = window.innerWidth < 640 ? "small" : "medium";
  const posterUrl = getImageUrl(movie.poster_path, "poster", posterSize);
  const dispatch = useAppDispatch();
  const isFavorited = useAppSelector((state) =>
    state.favorites.items.some((fav) => fav.movieId === movie.id)
  );
  const isInWatchlist = useAppSelector((state) =>
    state.watchList.items.some((item) => item.movieId === movie.id)
  );
  const isWatched = useAppSelector((state) =>
    state.watchedMovies.items.some((item) => item.movieId === movie.id)
  );
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorited) {
      dispatch(removeFavorite(movie.id));
    } else {
      dispatch(
        addFavorite({
          movieId: movie.id,
          title: movie.title,
          posterPath: movie.poster_path,
          userRating: null,
          notes: "",
          addedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
      );
    }
  };

  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWatchlist) {
      dispatch(removeFromWatchList(movie.id));
    } else {
      dispatch(
        addToWatchList({
          movieId: movie.id,
          title: movie.title,
          posterPath: movie.poster_path,
          addedAt: new Date().toISOString(),
        })
      );
    }
  };

  const handleWatchedClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isWatched) {
      dispatch(markAsUnwatched(movie.id));
    } else {
      dispatch(
        markAsWatched({
          movieId: movie.id,
          title: movie.title,
          posterPath: movie.poster_path,
          watchedAt: new Date().toISOString(),
          userRating: null,
          notes: null,
        })
      );
    }
  };
  const handleMovieClick = () => {
    console.log("Movie clicked", movie.title);
  };
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden 
                 transform transition-all duration-200 hover:scale-105 hover:shadow-xl 
                 cursor-pointer group"
      role="button"
      tabIndex={0}
      onKeyDown={(e) =>
        e.key === "Enter" && console.log("Movie clicked:", movie.id)
      }
      onClick={handleMovieClick}
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={posterUrl}
          alt={`${movie.title} poster`}
          className="w-full h-64 object-cover"
        />
        <ButtonIcon
          isActive={isFavorited}
          handleClick={handleFavoriteClick}
          ActiveIcon={HeartIcon}
          InactiveIcon={HeartOutline}
          entity="favorites"
          className="top-2"
        />

        <ButtonIcon
          isActive={isInWatchlist}
          handleClick={handleWatchlistClick}
          ActiveIcon={BookmarkIcon}
          InactiveIcon={BookmarkOutline}
          entity="watchlist"
          className="top-14"
        />

        <ButtonIcon
          isActive={isWatched}
          handleClick={handleWatchedClick}
          ActiveIcon={EyeIcon}
          InactiveIcon={EyeSlashIcon}
          entity="watched"
          className="top-[6.5rem]"
        />

        <div
          className="absolute top-2 right-2 bg-yellow-400 text-gray-900 
                        text-xs font-bold px-2 py-1 rounded-full shadow-lg"
        >
          ⭐ {movie.vote_average.toFixed(1)}
        </div>
      </div>
      <div className="p-3">
        <h3
          className="font-semibold text-gray-900 dark:text-white truncate 
                       text-sm md:text-base mb-1"
        >
          {movie.title}
        </h3>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
          {movie.overview || "No overview available."}
        </p>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
          Genres:{" "}
          {movie.genre_ids.map((id) => GENRE_MAP[id] || "Unknown").join(", ")}
        </p>
      </div>
    </div>
  );
}
