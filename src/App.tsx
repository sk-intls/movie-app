import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store/store";
import { useEffect } from "react";
import { fetchPopularMovies } from "./store/slices/moviesSlice";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { popular, loading, error } = useSelector(
    (state: RootState) => state.movies
  );

  useEffect(() => {
    dispatch(fetchPopularMovies(1));
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <>
      <Header />
      <SearchBar />
      {popular.map((movie) => (
        <p key={movie.id}>{movie.title}</p>
      ))}
    </>
  );
}

export default App;
