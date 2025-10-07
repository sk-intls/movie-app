import type { IMovie } from "../types/movie";
import type { Favorite } from "../types/storage";

export const favoriteToMovie = (favorite: Favorite): IMovie => {
  return {
    id: favorite.movieId,
    title: favorite.title,
    overview: favorite.overview || "",
    poster_path: favorite.posterPath,
    backdrop_path: null,
    release_date: favorite.release_date || "",
    vote_average: favorite.vote_average || 0,
    vote_count: 0,
    popularity: favorite.popularity || 0,
    genre_ids: favorite.genre_ids || [],
    adult: false,
    original_language: "en",
    original_title: favorite.original_title || favorite.title,
  };
};
