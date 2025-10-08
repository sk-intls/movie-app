import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { WatchedMovie } from "../../types/storage";

import { watchedStorage } from "../../utils/localStorage";

interface WatchedMoviesState {
  items: WatchedMovie[];
}

const initialState: WatchedMoviesState = {
  items: watchedStorage.get(),
};

const watchedMoviesSlice = createSlice({
  name: "watchedMovies",
  initialState,
  reducers: {
    markAsWatched: (state, action: PayloadAction<WatchedMovie>) => {
      const exists = state.items.some(
        (w: WatchedMovie) => w.movieId === action.payload.movieId
      );
      if (!exists) {
        state.items.push(action.payload);
        watchedStorage.set(state.items);
      }
    },
    markAsUnwatched: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (w: WatchedMovie) => w.movieId !== action.payload
      );
      watchedStorage.set(state.items);
    },
    clearAllWatchedMovies: (state) => {
      state.items = [];
      watchedStorage.clear();
    },
  },
});

export const { markAsWatched, markAsUnwatched, clearAllWatchedMovies } =
  watchedMoviesSlice.actions;

export default watchedMoviesSlice.reducer;
