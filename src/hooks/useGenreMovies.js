// hooks/useAllGenreMovies.js

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addCrimeMovies,
  addComedyMovies,
  addAnimation,
} from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constants";

const useAllGenreMovies = () => {
  const dispatch = useDispatch();

  const fetchAndDispatch = async (url, action) => {
    const res = await fetch(url, API_OPTIONS);
    const json = await res.json();
    dispatch(action(json.results));
  };

  useEffect(() => {
    fetchAndDispatch(
      "https://api.themoviedb.org/3/discover/movie?with_genres=80&sort_by=popularity.desc&page=1",
      addCrimeMovies
    );
    fetchAndDispatch(
      "https://api.themoviedb.org/3/discover/movie?with_genres=35&sort_by=popularity.desc&page=1",
      addComedyMovies
    );
    fetchAndDispatch(
      "https://api.themoviedb.org/3/discover/movie?with_genres=16&sort_by=popularity.desc&page=1",
      addAnimation
    );
  }, []);
};

export default useAllGenreMovies;
