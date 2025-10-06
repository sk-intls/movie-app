import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./slices/moviesSlice";
import favoriteSlice from "./slices/favoriteSlice";
import watchListSlice from "./slices/watchListSlice";

export const store = configureStore({
  reducer: {
    movies: movieSlice,
    favorites: favoriteSlice,
    watchList: watchListSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
