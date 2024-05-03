# AnimeGeek 

AnimeGeek is a streaming platform dedicated to Anime with English subtitles. It provides a seamless experience for anime enthusiasts to discover, watch,download and enjoy their favorite shows.

## Features

- **Extensive Anime Library**: Access a vast collection of Japanese anime series and movies.
- **English Subtitles**: All content is available with English subtitles for non-Japanese speaking users.
- **Responsive Design**: Enjoy a smooth viewing experience across various devices, including desktops, tablets, and mobile phones.
- **Search and Filter**: Easily find anime titles using the search feature or filter by genre, release date, popularity, and more.
- **User-Friendly Interface**: Intuitive interface designed for easy navigation and user interaction.
- **High-Quality Streaming**: Enjoy high-definition streaming with fast loading times.

## Future Enhancement: English Audio with English Subtitles

### Features:

1. **Dual Audio Support**: Allow users to switch between Japanese audio with English subtitles and English audio with English subtitles for supported content.

2. **Language Preferences**: Implement a user profile system where users can set their preferred language for audio and subtitles.

3. **Audio and Subtitle Selection**: Provide options for users to select their preferred audio track and subtitle language while watching an anime.

### Implementation Steps:

1. **Content Licensing**: Ensure proper licensing agreements are in place to legally provide anime with English audio tracks.

2. **Media Encoding**: Convert anime episodes or movies into formats that support multiple audio tracks and subtitles.

3. **UI/UX Changes**: Update the user interface to accommodate language selection options, both for audio and subtitles. This may include dropdown menus or settings panels.

4. **Backend Changes**: Modify backend APIs to handle requests for fetching specific audio tracks and subtitle files.

5. **Player Integration**: Integrate a media player that supports switching between multiple audio tracks and subtitles seamlessly.

6. **Testing**: Thoroughly test the feature across different devices and platforms to ensure compatibility and smooth user experience.

### Considerations:

- **Bandwidth Optimization**: Provide options for users to adjust streaming quality to conserve bandwidth while streaming content with dual audio and subtitles.

- **Content Availability**: Inform users about the availability of English audio and subtitles for each anime title.

- **User Feedback**: Gather feedback from users to continuously improve the feature and address any issues or concerns.

## Tech Stack

- **Frontend**:
  - [React](https://reactjs.org/)
  - [Chakra UI](https://chakra-ui.com/)
  - [React Router](https://reactrouter.com/)
  - [React Responsive Carousel](https://www.npmjs.com/package/react-responsive-carousel)
- **Backend**:
  - [Node.js](https://nodejs.org/)
  - [Express](https://expressjs.com/)
- **Video Streaming**:
  - [HLS.js](https://github.com/video-dev/hls.js/)
- **HTTP Client**:
  - [Axios](https://axios-http.com/)
- **Development Tools**:
  - [Vite](https://vitejs.dev/)
  - [ESLint](https://eslint.org/)
  - [dotenv](https://www.npmjs.com/package/dotenv)

## API Used

### 1. List Anime

- **Trending**:
  - `https://march-api1.vercel.app/meta/anilist/trending?provider=gogoanime`
- **Popular**:
  - `https://march-api1.vercel.app/meta/anilist/popular?provider=gogoanime&perPage=20`

    a. Card
    b. Text

### 2. Detail Anime & Recommendation

- **Detail Anime**:
  - `https://march-api1.vercel.app/meta/anilist/info/20954?fetchFiller=true&dub=false`

    a. Card
    b. Text
    c. Carousel (recommendation)

- **Streaming Anime**:
  - `https://march-api1.vercel.app/meta/anilist/watch/koe-no-katachi-movie-episode-1?provider=gogoanime`

    a. Card
    b. Text
    c. Library Video

## Getting Started

To get a local copy up and running, follow these simple steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/anime-geek.git
   cd anime-geek

2. **Install dependencies**:
    ```bash

   npm install
3. **Set up environment variables**:
    Create a .env file in the root directory.
   
    Define environment variables required for your application.
4. **Run the development server**:
  
   ```bash

    npm start

5. **Open your browser**:

    Visit http://localhost:3000 to view the application.



Contributions are welcome! Feel free to open issues or pull requests for any improvements or features you'd like to add.

License
This project is licensed under the MIT License.











