import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store/store";
import { useEffect } from "react";
import { fetchPopularMovies } from "./store/slices/moviesSlice";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import { Movie } from "./components/Movie";
import type { IMovie } from "./types/movie";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { popular, loading, error } = useSelector(
    (state: RootState) => state.movies
  );

  useEffect(() => {
    dispatch(fetchPopularMovies(2));
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchBar />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-2 
        sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {popular.map((movie: IMovie) => (
            <Movie movie={movie} key={movie.id} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
