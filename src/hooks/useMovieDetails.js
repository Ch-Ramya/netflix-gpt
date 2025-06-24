import { useEffect, useState } from "react";
import { API_OPTIONS } from "../utils/constants";

const useMovieDetails = (movieId) => {
    const [movieDetails, setMovieDetails] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
          const res = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,API_OPTIONS
          );
          const data = await res.json();
          setMovieDetails(data);
        };
    
        fetchMovieDetails();
      }, [movieId]);

      return movieDetails;
    
}

export default useMovieDetails;