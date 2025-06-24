import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import { MOVIE_CATEGORIES } from "../utils/constants";

const MoviesContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    <div className="relative z-10 pb-20">
      {MOVIE_CATEGORIES.map((category) =>
        movies[category.key]?.length > 0 ? (
          <MovieList
            key={category.key}
            title={category.label}
            shows={movies[category.key]}
            overlap={category.overlap}
          />
        ) : null
      )}
    </div>
  );
};

export default MoviesContainer;
