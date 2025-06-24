import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    trailerMovie: null,
    popularMovies: null,
    topRatedMovies: null,
    upcomingMovies: null,
    crimeMovies: null,
    comedyMovies: null,
    animations: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addTrailerMovie: (state, action) => {
      state.trailerMovie = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    addCrimeMovies: (state, action) => {
      state.crimeMovies = action.payload;
    },
    addComedyMovies: (state, action) => {
      state.comedyMovies = action.payload;
    },
    addAnimation: (state, action) => {
      state.animations = action.payload;
    },
  },
});

export const {
  addNowPlayingMovies,
  addTrailerMovie,
  addPopularMovies,
  addTopRatedMovies,
  addUpcomingMovies,
  addCrimeMovies,
  addComedyMovies,
  addAnimation,
} = movieSlice.actions;
export default movieSlice.reducer;
