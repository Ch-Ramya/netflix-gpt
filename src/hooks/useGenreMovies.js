// hooks/useAllGenreMovies.js

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addCrimeMovies,
  addComedyMovies,
  addAnimation,
  addNowPlayingMovies,
  addPopularMovies,
  addTopRatedMovies,
  addUpcomingMovies,
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
      "https://api.themoviedb.org/3/movie/now_playing?page=1",
      addNowPlayingMovies
    );
    fetchAndDispatch(
      "https://api.themoviedb.org/3/movie/popular?page=3",
      addPopularMovies
    );
    fetchAndDispatch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=4",
      addTopRatedMovies
    );
    fetchAndDispatch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      addUpcomingMovies
    );
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
