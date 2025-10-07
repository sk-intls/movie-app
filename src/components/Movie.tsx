import type { IMovie } from "../types/movie";
import { getImageUrl } from "../utils/constants";
import { GENRE_MAP } from "../utils/constants";
// import { HeartIcon } from "@heroicons/react/24/solid";

export function Movie({ movie }: { movie: IMovie }) {
  const posterSize = window.innerWidth < 640 ? "small" : "medium";
  const posterUrl = getImageUrl(movie.poster_path, "poster", posterSize);
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
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={posterUrl}
          alt={`${movie.title} poster`}
          className="w-full h-64 object-cover"
        />
        <div
          className="absolute top-2 right-2 bg-yellow-400 
        text-gray-900 text-xs font-bold px-2 py-1 rounded-full"
        >
          {movie.vote_average.toFixed(1)} / 10
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
