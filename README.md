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
- **Responsive Design**: Optimized for desktops, tablets, and mobile devices
- **Search Functionality**: Discover anime by searching titles
- **Multiple Categories**: Browse Trending, Popular, and Upcoming anime
- **User-Friendly Interface**: Clean and intuitive navigation with Chakra UI
- **High-Quality Streaming**: Fast-loading, high-definition HLS streaming
- **Episode Management**: Easy navigation through anime episodes
- **Character Information**: View character details and roles
- **Recommendations**: Get anime recommendations based on your interests

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

This project uses the [Consumet API](https://github.com/consumet/api.consumet.org) for anime data:

**Base URL:** `https://consumet-instance.vercel.app/meta/anilist`

### Endpoints

- **Trending Anime**: `/trending?provider=gogoanime`
- **Popular Anime**: `/popular?provider=gogoanime&perPage=20`
- **Upcoming Anime**: `/upcoming?provider=gogoanime`
- **Anime Details**: `/info/{id}?fetchFiller=true&dub=false`
- **Search**: `/search?query={query}&provider=gogoanime`
- **Streaming**: `/watch/{episodeId}?provider=gogoanime`

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

3. **Start the development server**  
   ```bash
   npm start
   ```

4. **Open in browser**  
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

### Using Docker Compose

```bash
docker-compose up -d
```

The application will be available at `http://localhost:3000`

### Using Docker

```bash
docker build -t animegeek .
docker run -p 3000:80 animegeek
```

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
│   ├── helpers/        # Utility functions
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components
│   ├── style/          # CSS files
│   └── theme.js        # Chakra UI theme
├── Dockerfile          # Docker configuration
├── docker-compose.yml  # Docker Compose configuration
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

## Security

- No sensitive data is stored in the repository
- All API calls are made from the client-side
- Environment variables are properly ignored (see `.gitignore`)
- XSS protection: Be cautious with `dangerouslySetInnerHTML` usage in description rendering

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
