# 🎬 Movie App

## ✨ Features

- **Movie Discovery**: Browse popular movies with pagination
- **Search**: Find movies by title with real-time search
- **Personal Lists**: Manage favorites, watchlist, and watched movies
- **Movie Details**: View detailed information with backdrops and ratings  
- **Dark/Light Theme**: Toggle between themes with persistence
- **Responsive Design**: Mobile-first design that works on all devices

## 🛠️ Tech Stack

- **React 18** + **TypeScript** - Modern UI library with type safety
- **Redux Toolkit** - Predictable state management
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Vite** - Fast build tool and dev server
- **TMDB API** - Movie data from The Movie Database

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- TMDB API key ([get one here](https://www.themoviedb.org/settings/api))

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd movie-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Add your TMDB API key to .env
   VITE_TMDB_API_KEY=your_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📱 Usage

- **Browse**: Scroll through popular movies on the home page
- **Search**: Use the search bar to find specific movies
- **Add to Lists**: Click heart (favorites), bookmark (watchlist), or eye (watched) icons
- **View Details**: Click any movie card to see full details
- **Manage Lists**: Visit dedicated pages for favorites, watchlist, and watched movies
- **Switch Themes**: Use the sun/moon toggle in the header

## 🏗️ Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Route components
├── store/         # Redux store and slices
├── services/      # API service layer
├── utils/         # Utility functions and constants
├── types/         # TypeScript type definitions
└── context/       # React contexts (theme)
```

## 🔧 Available Scripts

- `npm run dev` - Start development server

## 📦 Key Dependencies

- `react` & `react-dom` - UI library
- `@reduxjs/toolkit` - State management
- `react-router-dom` - Routing
- `tailwindcss` - Styling
- `@heroicons/react` - Icons
- `axios` - HTTP client

## 🎨 Features in Detail

### State Management
- **Redux Toolkit** for global state (movies, favorites, watchlist, watched)
- **localStorage** integration for data persistence
- **Theme context** for dark/light mode

### API Integration
- TMDB API for movie data
- Error handling and loading states
- Image optimization with different sizes

### UI/UX
- Responsive grid layouts
- Skeleton loading states
- Hover effects and animations
- Accessible navigation

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ using React and TMDB API
