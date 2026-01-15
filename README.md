# AnimeGeek

![React](https://img.shields.io/badge/Frontend-React-blue)
![Chakra UI](https://img.shields.io/badge/UI-Chakra--UI-teal)
![Vite](https://img.shields.io/badge/Build-Vite-purple)
![HLS.js](https://img.shields.io/badge/Streaming-HLS.js-orange)
![ESLint](https://img.shields.io/badge/Code%20Quality-ESLint-yellow)

AnimeGeek is a streaming platform dedicated to anime with English subtitles. It provides a seamless experience for anime enthusiasts to discover, watch, download, and enjoy their favorite shows.

> **Developed by Alan Cyril Sunny**  
> If you enjoy this project, please ⭐ [star the repository](https://github.com/dragonpilee/AnimeGeek) — it really helps!

**Live Demo:** [animegeek.netlify.app](https://animegeek.netlify.app/)

---

## Features

- **Extensive Anime Library**: Access a vast collection of anime series and movies
- **English Subtitles**: All content includes English subtitles
- **Multi-Provider Support**: Choose from 6+ streaming providers with automatic fallback
- **Provider Selection**: Switch providers on-the-fly from the header dropdown
- **Automatic Fallback**: If one provider fails, automatically tries others
- **Responsive Design**: Optimized for desktops, tablets, and mobile devices
- **Search Functionality**: Discover anime by searching titles
- **Multiple Categories**: Browse Trending, Popular, and Upcoming anime
- **User-Friendly Interface**: Clean and intuitive navigation with Chakra UI
- **High-Quality Streaming**: Fast-loading, high-definition HLS streaming with native browser support
- **Episode Management**: Easy navigation through anime episodes with seasons support
- **Character Information**: View character details and roles
- **Recommendations**: Get anime recommendations based on your interests
- **Docker Ready**: Full Docker and Docker Compose support for easy deployment

---

## Future Enhancement: English Audio with Subtitles

Planned features:

- **Dual Audio Support**
- **User Language Preferences**
- **Audio/Sub Selection**
- **Backend/Player Integration**
- **Testing & Optimization**

---

## Tech Stack

### Frontend

- [React](https://reactjs.org/) - UI library
- [Chakra UI](https://chakra-ui.com/) - Component library
- [React Router](https://reactrouter.com/) - Routing
- [React Responsive Carousel](https://www.npmjs.com/package/react-responsive-carousel) - Carousel component
- [HLS.js](https://github.com/video-dev/hls.js/) - HLS video streaming
- [Axios](https://axios-http.com/) - HTTP client

### Build Tools

- [Vite](https://vitejs.dev/) - Build tool and dev server
- [ESLint](https://eslint.org/) - Code linting

### Deployment

- Docker support included
- Vercel/Netlify ready

---

## API Used

This project uses the [Consumet API](https://github.com/consumet/api.consumet.org) for anime data. The Consumet API is a modern search engine API that scrapes data from various anime providers.

> **⚠️ Important:** Consumet API is no longer publicly available. You need to self-host your own instance or use a public instance. See [Self-Hosting Consumet API](#self-hosting-consumet-api) section below.

**Default Base URL:** `https://consumet-instance.vercel.app/meta/anilist`

### Endpoints

All endpoints require the `provider` parameter (default: `gogoanime`):

- **Trending Anime**: `/trending?provider=gogoanime`
- **Popular Anime**: `/popular?provider=gogoanime&perPage=20`
- **Upcoming Anime**: `/upcoming?provider=gogoanime`
- **Anime Details**: `/info/{id}?fetchFiller=true&dub=false&provider=gogoanime`
- **Search**: `/search?query={query}&provider=gogoanime`
- **Streaming**: `/watch/{episodeId}?provider=gogoanime`

### Supported Providers

The app supports multiple streaming providers with automatic fallback:

1. **Gogoanime** (default) - Most reliable, large library
2. **Zoro** - Good quality, fast loading
3. **AnimePahe** - High quality streams
4. **Marin** - Alternative source
5. **9Anime** - Backup option
6. **Crunchyroll** - Official (limited availability)

**Provider Selection:**
- Users can select their preferred provider from the header dropdown
- If the selected provider fails, the app automatically tries other providers
- Provider preference is saved in localStorage

**Note:** Provider availability depends on the Consumet API instance you're using. Some providers may not be available on all instances.

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**  
   ```bash
   git clone https://github.com/dragonpilee/AnimeGeek.git
   cd AnimeGeek
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Configure environment variables (optional)**  
   Create a `.env` file in the root directory:
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` and set your Consumet API instance URL:
   ```env
   VITE_API_BASE_URL=https://consumet-instance.vercel.app/meta/anilist
   VITE_ANIME_PROVIDER=gogoanime
   ```
   
   > If you're self-hosting Consumet API, set `VITE_API_BASE_URL` to your instance URL (e.g., `http://localhost:3000/meta/anilist`)

4. **Start the development server**  
   ```bash
   npm start
   ```

5. **Open in browser**  
   Visit [http://localhost:5173](http://localhost:5173)

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

---

## Docker Deployment

### Using Docker Compose (Recommended)

1. **Configure environment variables** (optional)
   
   Create a `.env` file or set environment variables:
   ```env
   VITE_API_BASE_URL=https://consumet-instance.vercel.app/meta/anilist
   VITE_ANIME_PROVIDER=gogoanime
   PORT=3000
   ```

2. **Build and run**
   ```bash
   docker-compose up -d
   ```

   The application will be available at `http://localhost:3000`

3. **Optional: Self-host Consumet API with Docker Compose**
   
   Uncomment the `consumet-api` service in `docker-compose.yml` and update `VITE_API_BASE_URL` to `http://consumet-api:3000/meta/anilist`:
   ```yaml
   consumet-api:
     image: riimuru/consumet-api:latest
     container_name: consumet-api
     ports:
       - "3001:3000"
     restart: unless-stopped
     environment:
       - NODE_ENV=PROD
   ```

### Using Docker

Build with environment variables:
```bash
docker build \
  --build-arg VITE_API_BASE_URL=https://consumet-instance.vercel.app/meta/anilist \
  --build-arg VITE_ANIME_PROVIDER=gogoanime \
  -t animegeek .
```

Run the container:
```bash
docker run -p 3000:80 animegeek
```

---

## Self-Hosting Consumet API

Since Consumet API is no longer publicly available, you have several options:

### Option 1: Docker (Easiest)

```bash
docker pull riimuru/consumet-api
docker run -d -p 3000:3000 -e NODE_ENV=PROD --name consumet-api riimuru/consumet-api
```

Then set `VITE_API_BASE_URL=http://localhost:3000/meta/anilist` in your `.env` file.

### Option 2: Deploy to Vercel/Netlify/Railway

Follow the [Consumet API installation guide](https://github.com/consumet/api.consumet.org#installation) to deploy your own instance.

### Option 3: Local Development

```bash
git clone https://github.com/consumet/api.consumet.org.git
cd api.consumet.org
npm install
npm start
```

The API will be available at `http://localhost:3000`. Update your `.env` file accordingly.

### Option 4: Use Docker Compose (Included)

The `docker-compose.yml` file includes an optional Consumet API service. Uncomment it to run both services together.

---

## Project Structure

```
AnimeGeek/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images and icons
│   ├── components/     # React components
│   │   ├── detail-anime/    # Anime detail components
│   │   ├── global/          # Reusable global components
│   │   └── home/            # Home page components
│   ├── constants/      # Constants and configuration
│   ├── helpers/        # Utility functions (videoHLS, formatWord)
│   ├── hooks/          # Custom React hooks (useProvider, useFetchData)
│   ├── pages/          # Page components
│   ├── style/          # CSS files
│   ├── utils/          # Utility functions (providerHelper)
│   └── theme.js        # Chakra UI theme
├── Dockerfile          # Docker configuration
├── docker-compose.yml  # Docker Compose configuration
├── env.example         # Environment variables example
├── vercel.json         # Vercel deployment config
└── vite.config.js      # Vite configuration
```

---

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

---

## Contributing

Contributions are welcome!  
Feel free to fork the repo, submit pull requests, or open issues.

### Contribution Guidelines

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Consumet API base URL | `https://consumet-instance.vercel.app/meta/anilist` |
| `VITE_ANIME_PROVIDER` | Anime provider (gogoanime, zoro, etc.) | `gogoanime` |
| `PORT` | Docker container port | `3000` |

Create a `.env` file in the root directory to override defaults. See `env.example` for reference.

---

## Security

- No sensitive data is stored in the repository
- All API calls are made from the client-side
- Environment variables are properly ignored (see `.gitignore`)
- XSS protection: Be cautious with `dangerouslySetInnerHTML` usage in description rendering
- Docker images use multi-stage builds for smaller production images
- Nginx configuration includes security headers

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgments

- [Consumet API](https://github.com/consumet/api.consumet.org) for providing anime data
- [AniList](https://anilist.co/) for anime metadata
- All the open-source libraries and tools used in this project

---

## Disclaimer

This project is for educational purposes only. Please respect copyright laws and the terms of service of the APIs used.
