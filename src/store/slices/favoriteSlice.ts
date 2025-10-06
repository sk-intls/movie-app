import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Favorite } from "../../types/storage";
import { favoritesStorage } from "../../utils/localStorage";

interface FavoriteState {
  items: Favorite[];
}

const initialState: FavoriteState = {
  items: favoritesStorage.get(),
};

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Favorite>) => {
      const exists = state.items.some(
        (f: Favorite) => f.movieId === action.payload.movieId
      );
      if (!exists) {
        state.items.push(action.payload);
        favoritesStorage.set(state.items);
      }
    },
    removeFavorite: (state, action: PayloadAction<Favorite>) => {
      const updated = state.items.filter(
        (f: Favorite) => f.movieId === action.payload.movieId
      );
      favoritesStorage.set(updated);
    },
    updateFavorite: (
      state,
      action: PayloadAction<{ movieId: number; updates: Partial<Favorite> }>
    ) => {
      const index = state.items.findIndex(
        (f: Favorite) => f.movieId === action.payload.movieId
      );
      if (index != -1) {
        state.items[index] = {
          ...state.items[index],
          ...action.payload.updates,
          updatedAt: new Date().toISOString(),
        };
        favoritesStorage.set(state.items);
      }
    },
    clearFavorites: (state) => {
      state.items = [];
      favoritesStorage.clear();
    },
  },
});

export const { addFavorite, removeFavorite, updateFavorite, clearFavorites } =
  favoriteSlice.actions;

export default favoriteSlice.reducer;
