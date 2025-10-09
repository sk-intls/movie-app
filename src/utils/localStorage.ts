import type {
  Favorite,
  WatchlistItem,
  WatchedMovie,
  UserPreferences,
} from "../types/storage";

const STORAGE_KEYS = {
  FAVORITES: "moviesApp_favorites",
  WATCHLIST: "moviesApp_watchlist",
  WATCHED: "moviesApp_watched",
  PREFERENCES: "moviesApp_preferences",
} as const;

const DEFAULT_PREFERENCES: UserPreferences = {
  theme: "light",
  viewMode: "grid",
  moviesPerPage: 20,
};

function getFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error getting ${key} from local storage: `, error);
    return defaultValue;
  }
}

function setToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting value at ${key}`, error);
  }
}

function removeFromStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing value at ${key}`, error);
  }
}

export const favoritesStorage = {
  get: (): Favorite[] => {
    return getFromStorage<Favorite[]>(STORAGE_KEYS.FAVORITES, []);
  },
  set: (favorites: Favorite[]): void => {
    setToStorage(STORAGE_KEYS.FAVORITES, favorites);
  },

  clear: (): void => {
    removeFromStorage(STORAGE_KEYS.FAVORITES);
  },

  has: (movieId: number): boolean => {
    const favorites = favoritesStorage.get();
    return favorites.some((f) => f.movieId === movieId);
  },

  add: (favorite: Favorite): Favorite[] => {
    const favorites = favoritesStorage.get();
    const exists = favorites.some((item) => item.movieId === favorite.movieId);
    if (exists) {
      console.warn("Movie already in favorites");
      return favorites;
    }
    const updated = [...favorites, favorite];
    favoritesStorage.set(updated);
    return updated;
  },

  remove: (movieId: number): Favorite[] => {
    const favorites = favoritesStorage.get();
    const updated = favorites.filter((movie) => movie.movieId === movieId);
    favoritesStorage.set(updated);
    return updated;
  },

  update: (
    movieId: number,
    updates: Partial<Omit<Favorite, "movieId" | "addedAt">>
  ): Favorite[] => {
    const favorites = favoritesStorage.get();
    const updated = favorites.map((f) =>
      f.movieId === movieId
        ? {
            ...f,
            ...updates,
            updatedAt: new Date().toISOString(),
          }
        : f
    );
    favoritesStorage.set(updated);
    return updated;
  },
};

export const watchListStorage = {
  get: (): WatchlistItem[] => {
    return getFromStorage<WatchlistItem[]>(STORAGE_KEYS.WATCHLIST, []);
  },
  set: (watchlist: WatchlistItem[]): void => {
    setToStorage(STORAGE_KEYS.WATCHLIST, watchlist);
  },

  clear: (): void => {
    removeFromStorage(STORAGE_KEYS.WATCHLIST);
  },

  has: (movieId: number): boolean => {
    const watchList = watchListStorage.get();
    return watchList.some((w) => w.movieId === movieId);
  },

  add: (item: WatchlistItem): WatchlistItem[] => {
    const watchList = watchListStorage.get();
    const exists = watchList.some((item) => item.movieId === item.movieId);
    if (exists) {
      console.warn("Movie already in favorites");
      return watchList;
    }
    const updated = [...watchList, item];
    watchListStorage.set(updated);
    return updated;
  },

  remove: (movieId: number): WatchlistItem[] => {
    const watchList = watchListStorage.get();
    const updated = watchList.filter((movie) => movie.movieId === movieId);
    watchListStorage.set(updated);
    return updated;
  },
};

export const watchedStorage = {
  get: (): WatchedMovie[] => {
    return getFromStorage<WatchedMovie[]>(STORAGE_KEYS.WATCHED, []);
  },
  set: (watched: WatchedMovie[]): void => {
    setToStorage(STORAGE_KEYS.WATCHED, watched);
  },

  clear: (): void => {
    removeFromStorage(STORAGE_KEYS.WATCHED);
  },

  has: (movieId: number): boolean => {
    const watched = watchedStorage.get();
    return watched.some((w) => w.movieId === movieId);
  },

  add: (watched: WatchedMovie): WatchedMovie[] => {
    const allWatched = watchedStorage.get();
    const exists = allWatched.some((item) => item.movieId === watched.movieId);
    if (exists) {
      console.warn("Movie already in favorites");
      return allWatched;
    }
    const updated = [...allWatched, watched];
    watchedStorage.set(updated);
    return updated;
  },

  remove: (movieId: number): WatchedMovie[] => {
    const allWatched = watchedStorage.get();
    const updated = allWatched.filter((movie) => movie.movieId === movieId);
    watchedStorage.set(updated);
    return updated;
  },

  update: (
    movieId: number,
    updates: Partial<Omit<WatchedMovie, "movieId" | "watchedAt">>
  ): WatchedMovie[] => {
    const all = watchedStorage.get();
    const updated = all.map((w) =>
      w.movieId === movieId
        ? {
            ...w,
            ...updates,
            updatedAt: new Date().toISOString(),
          }
        : w
    );
    watchedStorage.set(updated);
    return updated;
  },
};

export const preferencesStorage = {
  get: (): UserPreferences => {
    return getFromStorage<UserPreferences>(
      STORAGE_KEYS.PREFERENCES,
      DEFAULT_PREFERENCES
    );
  },
  set: (preferences: UserPreferences): void => {
    setToStorage(STORAGE_KEYS.PREFERENCES, preferences);
  },
  update: (updates: Partial<UserPreferences>): UserPreferences => {
    const current = preferencesStorage.get();
    const updated = { ...current, ...updates };
    preferencesStorage.set(updated);
    return updated;
  },
  clear: (): void => {
    setToStorage(STORAGE_KEYS.PREFERENCES, DEFAULT_PREFERENCES);
  },
};

export const clearAllStorage = (): void => {
  favoritesStorage.clear();
  watchListStorage.clear();
  watchedStorage.clear();
  preferencesStorage.clear();
};

export const getStorageCounts = () => {
  return {
    favorites: favoritesStorage.get().length,
    watchList: watchListStorage.get().length,
    watched: watchedStorage.get().length,
  };
};

export { STORAGE_KEYS, DEFAULT_PREFERENCES };
