import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { WatchlistItem } from "../../types/storage";
import { watchListStorage } from "../../utils/localStorage";

interface WatchListState {
  items: WatchlistItem[];
}

const initialState: WatchListState = {
  items: watchListStorage.get(),
};

const watchListSlice = createSlice({
  name: "watchList",
  initialState,
  reducers: {
    addToWatchList: (state, action: PayloadAction<WatchlistItem>) => {
      const exists = state.items.some(
        (w: WatchlistItem) => w.movieId === action.payload.movieId
      );
      if (!exists) {
        state.items.push(action.payload);
        watchListStorage.set(state.items);
      }
    },
    removeFromWatchList: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (w: WatchlistItem) => w.movieId !== action.payload
      );
      watchListStorage.set(state.items);
    },
    clearWatchList: (state: WatchListState) => {
      state.items = [];
      watchListStorage.clear();
    },
  },
});

export const { addToWatchList, removeFromWatchList, clearWatchList } =
  watchListSlice.actions;

export default watchListSlice.reducer;
