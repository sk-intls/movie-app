import { Movie } from "../components/Movie";
import { useAppSelector } from "../store/hooks";

function FavoritesPage() {
  const favorites = useAppSelector((state) => state.favorites.items);

  if (favorites.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          My Favorites
        </h1>
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No favorites yet. Start by adding some movies to your favorites!
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        My Favorites ({favorites.length})
      </h1>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {favorites.map((favorite) => (
          <Movie key={favorite.movieId} movie={favorite} />
        ))}
      </div>
    </main>
  );
}
export default FavoritesPage;
