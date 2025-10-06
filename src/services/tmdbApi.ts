import axios from "axios";
import { TMDB_BASE_URL, TMDB_API_KEY } from "../utils/constants";
import type { Movie, MovieDetails, Genre } from "../types/movie";
import type { TMDBResponse } from "../types/api";

const tmdbClient = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});

export const tmdbApi = {
  searchMovies: async (
    query: string,
    page: number = 1
  ): Promise<TMDBResponse<Movie>> => {
    const response = await tmdbClient.get<TMDBResponse<Movie>>(
      "/search/movie",
      {
        params: { query, page },
      }
    );
    return response.data;
  },

  getMovieDetails: async (movieId: number): Promise<MovieDetails> => {
    const response = await tmdbClient.get<MovieDetails>(`/movie/${movieId}`);
    return response.data;
  },

  getGenres: async (): Promise<Genre[]> => {
    const response = await tmdbClient.get<{ genres: Genre[] }>(
      "/genre/movie/list"
    );
    return response.data.genres;
  },

  discoverMovies: async (params: {
    page?: number;
    genre?: number;
    year?: number;
    sortBy?: string;
    minRating?: number;
  }): Promise<TMDBResponse<Movie>> => {
    const response = await tmdbClient.get<TMDBResponse<Movie>>(
      "/discover/movie",
      {
        params: {
          page: params.page || 1,
          with_genres: params.genre,
          primary_release_year: params.year,
          sort_by: params.sortBy || "popularity.desc",
          "vote_average.gte": params.minRating,
        },
      }
    );
    return response.data;
  },
};

export default tmdbApi;
