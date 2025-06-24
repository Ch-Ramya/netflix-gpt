import useAllGenreMovies from "../hooks/useGenreMovies";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import MoviesContainer from "./MoviesContainer";
import TrailerContainer from "./TrailerContainer";

const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  useAllGenreMovies();

  return (
    <div className="relative bg-black overflow-visible">
      <TrailerContainer />
      <MoviesContainer />
    </div>
  );
};

export default Browse;
