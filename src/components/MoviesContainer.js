import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const MoviesContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
    <div className="relative z-10 pb-20">
      <MovieList
        title={"We Think You'll Love These"}
        shows={movies.nowPlayingMovies}
        overlap={true}
      />

      <MovieList title={"Popular Movies"} shows={movies.popularMovies} />
      <MovieList
        title={"Today's Top 10 Picks for You"}
        shows={movies.topRatedMovies?.slice(4, 14)}
      />
      <MovieList title={"Upcoming Movies"} shows={movies.upcomingMovies} />
      <MovieList title={"Gritty Crime Action"} shows={movies.crimeMovies} />

      <MovieList title={"Comedy Movies"} shows={movies.comedyMovies} />
      <MovieList title={"Animation"} shows={movies.animations} />
    </div>
  );
};

export default MoviesContainer;
