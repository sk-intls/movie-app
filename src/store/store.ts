import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./slices/moviesSlice";
import favoriteSlice from "./slices/favoriteSlice";
import watchListSlice from "./slices/watchListSlice";
import watchedMoviesSlice from "./slices/watchedMoviesSlice";
import movieDetailsSlice from "./slices/movieDetailsSlice";

export const store = configureStore({
  reducer: {
    movies: movieSlice,
    favorites: favoriteSlice,
    watchList: watchListSlice,
    watchedMovies: watchedMoviesSlice,
    movieDetails: movieDetailsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
