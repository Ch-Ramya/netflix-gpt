import useAllGenreMovies from "../hooks/useGenreMovies";
import MoviesContainer from "./MoviesContainer";
import TrailerContainer from "./TrailerContainer";

const Browse = () => {
  useAllGenreMovies();

  return (
    <div className="relative bg-black overflow-visible">
      <TrailerContainer />
      <MoviesContainer />
    </div>
  );
};

export default Browse;
