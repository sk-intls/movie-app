import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  asyncFetchMovieDetails,
  clearCurrentMovie,
} from "../store/slices/movieDetailsSlice";
import { getImageUrl } from "../utils/constants";

function MovieDetailsPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { movie, loading, error } = useAppSelector(
    (state) => state.movieDetails
  );

  useEffect(() => {
    if (id) {
      dispatch(asyncFetchMovieDetails(Number(id)));
    }
  }, [id, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearCurrentMovie());
    };
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-600 dark:text-gray-400">
          Loading movie details...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-red-600 dark:text-red-400 mb-4">
            Error: {error}
          </div>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-600 dark:text-gray-400">
          Movie not found
        </div>
      </div>
    );
  }

  const posterUrl = getImageUrl(movie.poster_path, "poster", "large");
  const backdropUrl = getImageUrl(movie.backdrop_path, "backdrop", "large");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {movie.backdrop_path && (
        <div className="relative h-96 overflow-hidden">
          <img
            src={backdropUrl}
            alt={`${movie.title} backdrop`}
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-32 relative z-10">
          <div className="md:col-span-1">
            <img
              src={posterUrl}
              alt={`${movie.title} poster`}
              className="w-full max-w-md mx-auto rounded-lg shadow-2xl"
            />
          </div>

          <div className="md:col-span-2 text-black dark:text-white">
            <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
            {movie.tagline && (
              <p className="text-xl text-gray-300 mb-4 italic">
                {movie.tagline}
              </p>
            )}

            <div className="grid grid-cols-2 gap-4 mb-6 text-sm pt-10">
              <div>
                <span className="font-semibold">Release Date:</span>{" "}
                {movie.release_date}
              </div>
              {movie.runtime && (
                <div>
                  <span className="font-semibold">Runtime:</span>{" "}
                  {movie.runtime} minutes
                </div>
              )}
              <div>
                <span className="font-semibold">Rating:</span> ⭐{" "}
                {movie.vote_average.toFixed(1)}/10
              </div>
              <div>
                <span className="font-semibold">Status:</span> {movie.status}
              </div>
            </div>

            {movie.genres.length > 0 && (
              <div className="mb-4">
                <span className="font-semibold">Genres: </span>
                {movie.genres.map((genre) => genre.name).join(", ")}
              </div>
            )}

            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Overview</h2>
              <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
            </div>

            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              ← Back to Movies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailsPage;
