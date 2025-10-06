import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Movie } from "../../types/movie";
import tmdbApi from "../../services/tmdbApi";

interface MoviesState {
  popular: Movie[];
  searchResults: Movie[];
  currentMovie: Movie | null;
  loading: boolean;
  error: string | null;
}

const initialState: MoviesState = {
  popular: [],
  searchResults: [],
  currentMovie: null,
  loading: false,
  error: null,
};

export const fetchPopularMovies = createAsyncThunk<Movie[], number>(
  "movies/fetchPopularMovies",
  async (page = 1, { rejectWithValue }) => {
    try {
      const response = await tmdbApi.discoverMovies({
        page,
        sortBy: "popularity.desc",
      });
      console.log("API Response:", response);
      return response.results;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch popular movies");
    }
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setPopular: (state, action: PayloadAction<Movie[]>) => {
      state.popular = action.payload;
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.popular = action.payload;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setPopular,
  setSearchResults,
  setCurrentMovie,
  setLoading,
  setError,
} = movieSlice.actions;

export default movieSlice.reducer;
