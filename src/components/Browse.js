import { useSelector } from "react-redux";
import useAllGenreMovies from "../hooks/useGenreMovies";
import MoviesContainer from "./MoviesContainer";
import TrailerContainer from "./TrailerContainer";
import GptSearchSuggestions from "./GptSearchSuggestions.js";

const Browse = () => {
  useAllGenreMovies();
  const isSearchActive = useSelector((store) => store.gptSearch.isSearchActive);

  return (
    <div className="relative bg-black overflow-visible">
      {isSearchActive ? (
        <GptSearchSuggestions />
      ) : (
        <>
          <TrailerContainer />
          <MoviesContainer />
        </>
      )}
    </div>
  );
};

export default Browse;
