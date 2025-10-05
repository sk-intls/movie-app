export interface BaseMovieItem {
  movieId: number;
  title: string;
  posterPath: string | null;
}

export interface Favorite extends BaseMovieItem {
  userRating: number | null;
  notes: string | null;
  addedAt: string;
  updatedAt: string;
}

export interface WatchlistItem extends BaseMovieItem {
  addedAt: string;
}

export interface WatchedMovie extends BaseMovieItem {
  watchedAt: string;
  userRating: string | null;
  notes: string | null;
}

export type Theme = "light" | "dark";
export type ViewMode = "grid" | "list";

export interface UserPreferences {
  theme: Theme;
  viewMode: ViewMode;
  moviesPerPage: number;
}
