import type { IMovie } from "../types/movie";
import type { Favorite } from "../types/storage";
import { getImageUrl } from "../utils/constants";
import { GENRE_MAP } from "../utils/constants";
import { HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addFavorite, removeFavorite } from "../store/slices/favoriteSlice";

export function Movie({ movie }: { movie: IMovie | Favorite }) {
  const posterSize = window.innerWidth < 640 ? "small" : "medium";
  const posterPath = 'poster_path' in movie ? movie.poster_path : movie.posterPath;
  const movieId = 'id' in movie ? movie.id : movie.movieId;
  const posterUrl = getImageUrl(posterPath, "poster", posterSize);
  const dispatch = useAppDispatch();
  const isFavorited = useAppSelector((state) =>
    state.favorites.items.some((fav) => fav.movieId === movieId)
  );
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorited) {
      dispatch(removeFavorite(movieId));
    } else {
      dispatch(
        addFavorite({
          movieId: movieId,
          title: movie.title,
          posterPath: posterPath,
          userRating: null,
          notes: "",
          addedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          ...('overview' in movie && {
            overview: movie.overview,
            vote_average: movie.vote_average,
            genre_ids: movie.genre_ids,
            release_date: movie.release_date,
            original_title: movie.original_title,
            popularity: movie.popularity,
          })
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
        e.key === "Enter" && console.log("Movie clicked:", movieId)
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
        <div
          className="absolute top-2 right-2 bg-yellow-400 text-gray-900 
                        text-xs font-bold px-2 py-1 rounded-full shadow-lg"
        >
          ⭐ {('vote_average' in movie ? movie.vote_average : movie.vote_average || 0).toFixed(1)}
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
          {('overview' in movie ? movie.overview : movie.overview) || "No overview available."}
        </p>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
          Genres:{" "}
          {('genre_ids' in movie ? movie.genre_ids : movie.genre_ids || []).map((id) => GENRE_MAP[id] || "Unknown").join(", ")}
        </p>
      </div>
    </div>
  );
}
