import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const MoviesContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
    <div className="relative z-10">
      <MovieList
        title={"New Releases"}
        shows={movies.nowPlayingMovies}
        overlap={true}
      />
      <MovieList title={"New Releases"} shows={movies.nowPlayingMovies} />
      <MovieList title={"New Releases"} shows={movies.nowPlayingMovies} />
      <MovieList title={"New Releases"} shows={movies.nowPlayingMovies} />
      <MovieList title={"New Releases"} shows={movies.nowPlayingMovies} />
    </div>
  );
};

export default MoviesContainer;
