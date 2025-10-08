export interface BaseMovieItem {
  movieId: number;
  title: string;
  posterPath: string | null;
}

export interface Favorite extends BaseMovieItem {
  movieId: number;
  posterPath: string | null;
  userRating: number | null;
  notes: string;
  addedAt: string;
  updatedAt: string;
  overview?: string;
  vote_average?: number;
  genre_ids?: number[];
  release_date?: string;
  original_title?: string;
  popularity?: number;
}

export interface WatchlistItem extends BaseMovieItem {
  addedAt: string;
}

export interface WatchedMovie extends BaseMovieItem {
  watchedAt: string;
  userRating: number | null;
  notes: string | null;
}

export type Theme = "light" | "dark";
export type ViewMode = "grid" | "list";

export interface UserPreferences {
  theme: Theme;
  viewMode: ViewMode;
  moviesPerPage: number;
}
