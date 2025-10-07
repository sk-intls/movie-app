import type { IMovie } from "../types/movie";
import { Movie } from "../components/Movie";

import { useEffect, useState } from "react";
import { favoritesStorage } from "../utils/localStorage";
import type { Favorite } from "../types/storage";

function FavoritesPage() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
//   useEffect(() => {
//     const favoritesFromLocal = favoritesStorage.get();
//     setFavorites(favoritesFromLocal);
//     console.log(favorites);
//   }, [favorites]);
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {favorites.length > 0 && (
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 
                     lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6"
        >
          {/* {favorites.map((movie: IMovie) => (
            <Movie movie={movie} key={movie.id} />
          ))} */}
        </div>
      )}
    </main>
  );
}
export default FavoritesPage;
