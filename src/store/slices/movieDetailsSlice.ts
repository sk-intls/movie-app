import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { MovieDetails } from "../../types/movie";
import tmdbApi from "../../services/tmdbApi";

interface IMovieDetailsState {
  movie: MovieDetails | null;
  error: string | null;
  loading: boolean;
}

const initialState: IMovieDetailsState = {
  movie: null,
  error: null,
  loading: false,
};

export const asyncFetchMovieDetails = createAsyncThunk<
  MovieDetails,
  number,
  { rejectValue: string }
>("currentMovie/fetchDetails", async (id, { rejectWithValue }) => {
  try {
    const response = await tmdbApi.getMovieDetails(id);
    return response;
  } catch (error) {
    let message = "Failed to fetch movie details";
    if (error instanceof Error) {
      message = error.message;
    }
    return rejectWithValue(message);
  }
});

const movieDetailsSlice = createSlice({
  name: "currentMovie",
  initialState,
  reducers: {
    clearCurrentMovie: (state: IMovieDetailsState) => {
      state.error = null;
      state.loading = false;
      state.movie = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncFetchMovieDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncFetchMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.movie = action.payload;
        state.error = null;
      })
      .addCase(asyncFetchMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch movie details";
      });
  },
});

export const { clearCurrentMovie } = movieDetailsSlice.actions;
export default movieDetailsSlice.reducer;
