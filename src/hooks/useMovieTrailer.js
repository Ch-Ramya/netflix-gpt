import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addTrailerMovie } from "../utils/movieSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  const getMovieTrailer = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      API_OPTIONS
    );
    const jsonData = await data.json();
    const filteredTrailers = jsonData?.results.filter(
      (video) => video.type === "Trailer"
    );
    const trailerInfo =
      filteredTrailers.length > 0
        ? filteredTrailers[Math.floor(Math.random() * filteredTrailers.length)]
        : jsonData.results[0];

   
    dispatch(addTrailerMovie(trailerInfo));
  };

  useEffect(() => {
    getMovieTrailer();
  }, []);
};

export default useMovieTrailer;
