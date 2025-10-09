import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IMovie } from "../../types/movie";
import tmdbApi from "../../services/tmdbApi";
import type { TMDBResponse } from "../../types/api";

interface MoviesState {
  movies: IMovie[];
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  searchQuery: string;
}

const initialState: MoviesState = {
  movies: [],
  searchQuery: "",
  currentPage: 1,
  totalPages: 1,
  loading: false,
  error: null,
};

export const fetchPopularMovies = createAsyncThunk<
  TMDBResponse<IMovie>,
  number,
  { rejectValue: string }
>("movies/fetchPopularMovies", async (page, { rejectWithValue }) => {
  try {
    const response = await tmdbApi.discoverMovies({
      page,
      sortBy: "popularity.desc",
    });
    return response;
  } catch (error: unknown) {
    let message = "Failed to fetch popular movies";
    if (error instanceof Error) {
      message = error.message;
    }
    return rejectWithValue(message);
  }
});

export const fetchSearchMovies = createAsyncThunk<
  TMDBResponse<IMovie>,
  { query: string; page?: number },
  { rejectValue: string }
>(
  "movies/fetchSearchMovies",
  async ({ query, page = 1 }, { rejectWithValue }) => {
    try {
      return await tmdbApi.searchMovies(query, page);
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
    clearSearch: (state) => {
      state.searchQuery = "";
      state.movies = [];
      state.currentPage = 1;
      state.totalPages = 1;
    },
  },
  extraReducers: (builder) => {
    // for popular movies searc(on initial load)
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.results;
        state.currentPage = action.payload.page;
        state.totalPages = action.payload.total_pages;
        state.searchQuery = "";
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch movies";
      });
    // for movie search
    builder
      .addCase(fetchSearchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.results;
        state.currentPage = action.payload.page;
        state.totalPages = action.payload.total_pages;
        state.searchQuery = action.meta.arg.query;
      })
      .addCase(fetchSearchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Search failed";
      });
  },
});

export const { clearSearch } = movieSlice.actions;

export default movieSlice.reducer;
