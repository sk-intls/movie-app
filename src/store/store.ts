import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./slices/moviesSlice";
import favoriteSlice from "./slices/favoriteSlice";
import watchListSlice from "./slices/watchListSlice";
import watchedMoviesSlice from "./slices/watchedMoviesSlice";

export const store = configureStore({
  reducer: {
    movies: movieSlice,
    favorites: favoriteSlice,
    watchList: watchListSlice,
    watchedMovies: watchedMoviesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
