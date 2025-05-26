# AnimeGeek

![React](https://img.shields.io/badge/Frontend-React-blue)
![Chakra UI](https://img.shields.io/badge/UI-Chakra--UI-teal)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![Express](https://img.shields.io/badge/API-Express-lightgrey)
![Vite](https://img.shields.io/badge/Build-Vite-purple)
![HLS.js](https://img.shields.io/badge/Streaming-HLS.js-orange)
![dotenv](https://img.shields.io/badge/Env-dotenv-yellowgreen)
![ESLint](https://img.shields.io/badge/Code%20Quality-ESLint-yellow)

AnimeGeek is a streaming platform dedicated to anime with English subtitles. It provides a seamless experience for anime enthusiasts to discover, watch, download, and enjoy their favorite shows.

> **Developed by Alan Cyril Sunny**  
> If you enjoy this project, please ⭐ [star the repository](https://github.com/dragonpilee/anime-geek) — it really helps!

---

## Features

- **Extensive Anime Library**: Access a vast collection of anime series and movies.
- **English Subtitles**: All content includes English subtitles.
- **Responsive Design**: Optimized for desktops, tablets, and mobile.
- **Search and Filter**: Discover anime by genre, date, or popularity.
- **User-Friendly Interface**: Clean and intuitive navigation.
- **High-Quality Streaming**: Fast-loading, high-definition content.

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

- [React](https://reactjs.org/)
- [Chakra UI](https://chakra-ui.com/)
- [React Router](https://reactrouter.com/)
- [React Responsive Carousel](https://www.npmjs.com/package/react-responsive-carousel)

### Backend

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)

### Streaming

- [HLS.js](https://github.com/video-dev/hls.js/)

### Tools

- [Axios](https://axios-http.com/)
- [Vite](https://vitejs.dev/)
- [ESLint](https://eslint.org/)
- [dotenv](https://www.npmjs.com/package/dotenv)

---

## API Used

### Trending Anime
```
https://march-api1.vercel.app/meta/anilist/trending?provider=gogoanime
```

### Popular Anime
```
https://march-api1.vercel.app/meta/anilist/popular?provider=gogoanime&perPage=20
```

### Anime Details & Recommendations
```
https://march-api1.vercel.app/meta/anilist/info/20954?fetchFiller=true&dub=false
```

### Streaming
```
https://march-api1.vercel.app/meta/anilist/watch/koe-no-katachi-movie-episode-1?provider=gogoanime
```

---

## Getting Started

1. **Clone the repository**  
   ```bash
   git clone https://github.com/dragonpilee/anime-geek.git
   cd anime-geek
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Environment Variables**  
   Create a `.env` file and define your config variables.

4. **Start the development server**  
   ```bash
   npm start
   ```

5. **Open in browser**  
   Visit [http://localhost:3000](http://localhost:3000)

---

## Contributing

Contributions are welcome!  
Feel free to fork the repo, submit pull requests, or open issues.

---

## License

This project is licensed under the [MIT License](LICENSE).
