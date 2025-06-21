import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import TrailerContainer from "./TrailerContainer";
import MovieListing from "./MovieListing";

const Browse = () => {
  useNowPlayingMovies();

  return (
    <>
      <TrailerContainer />
      <MovieListing />
    </>
  );
};

export default Browse;
