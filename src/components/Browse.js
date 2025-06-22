import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MoviesContainer from "./MoviesContainer";
import TrailerContainer from "./TrailerContainer";

const Browse = () => {
  useNowPlayingMovies();

  return (
    <div className="relative bg-black">
      <TrailerContainer />
      <MoviesContainer />
    </div>
  );
};

export default Browse;
