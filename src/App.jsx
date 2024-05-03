import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Suspense from "./components/global/Suspense";

const Home = lazy(() => import("./pages/Home"));
const Popular = lazy(() => import("./pages/Popular"));
const Trending = lazy(() => import("./pages/Trending"));
const Upcoming = lazy(() => import("./pages/Upcoming"));
const DetailAnime = lazy(() => import("./pages/DetailAnime"));
const Search = lazy(() => import("./pages/Search"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <Suspense>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/trending" Component={Trending} />
        <Route path="/popular" Component={Popular} />
        <Route path="/upcoming" Component={Upcoming} />
        <Route path="/search" Component={Search} />
        <Route path="/anime/:id/:anime_name" Component={DetailAnime} />
        <Route path="*" Component={NotFound} />
      </Routes>
    </Suspense>
  );
}

export default App;
