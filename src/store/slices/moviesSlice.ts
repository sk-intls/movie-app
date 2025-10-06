import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { IMovie } from "../../types/movie";
import tmdbApi from "../../services/tmdbApi";

interface MoviesState {
  popular: IMovie[];
  searchResults: IMovie[];
  currentMovie: IMovie | null;
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

export const fetchPopularMovies = createAsyncThunk<IMovie[], number>(
  "movies/fetchPopularMovies",
  async (page = 1, { rejectWithValue }) => {
    try {
      const response = await tmdbApi.discoverMovies({
        page,
        sortBy: "popularity.desc",
      });
      console.log("API Response:", response);
      return response.results;
    } catch (error: unknown) {
      let message = "Failed to fetch popular movies";
      if (error instanceof Error) {
        message = error.message;
      }
      return rejectWithValue(message);
    }
  }
);

export const fetchSearchMovies = createAsyncThunk<
  IMovie[],
  { query: string; page?: number },
  { rejectValue: string }
>(
  "movies/fetchSearchMovies",
  async ({ query, page = 1 }, { rejectWithValue }) => {
    try {
      const response = await tmdbApi.searchMovies(query, page);
      return response.results;
    } catch (error: unknown) {
      let message = "Failed to fetch search results";
      if (error instanceof Error) {
        message = error.message;
      }
      return rejectWithValue(message);
    }
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setPopular: (state, action: PayloadAction<IMovie[]>) => {
      state.popular = action.payload;
    },
    setSearchResults: (state, action: PayloadAction<IMovie[]>) => {
      state.searchResults = action.payload;
    },
    setCurrentMovie: (state, action: PayloadAction<IMovie | null>) => {
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
      })
      .addCase(fetchSearchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(fetchSearchMovies.rejected, (state, action) => {
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
