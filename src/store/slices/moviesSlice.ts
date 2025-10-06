import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Movie } from "../../types/movie";

interface MoviesState {
  popular: Movie[];
  trending: Movie[];
  searchResults: Movie[];
  currentMovie: Movie | null;
  loading: boolean;
  error: string | null;
}

const initialState: MoviesState = {
  popular: [],
  trending: [],
  searchResults: [],
  currentMovie: null,
  loading: false,
  error: null,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setPopular: (state, action: PayloadAction<Movie[]>) => {
      state.popular = action.payload;
    },
    setTrending: (state, action: PayloadAction<Movie[]>) => {
      state.trending = action.payload;
    },
    setSearchResults: (state, action: PayloadAction<Movie[]>) => {
      state.searchResults = action.payload;
    },
    setCurrentMovie: (state, action: PayloadAction<Movie | null>) => {
      state.currentMovie = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setPopular,
  setTrending,
  setSearchResults,
  setCurrentMovie,
  setLoading,
  setError,
} = movieSlice.actions;

export default movieSlice.reducer;
