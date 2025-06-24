export const NETFLIX_LOGO =
  "https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png";
export const IMG_CDN = "https://image.tmdb.org/t/p/w500/";
export const NETFLIX_BACKGROUND =
  "https://assets.nflxext.com/ffe/siteui/vlv3/7968847f-3da9-44b3-8bbb-13a46579881f/web/IN-en-20250609-TRIFECTA-perspective_32b70b51-20d4-46db-8a1a-3d5428be5f0e_large.jpg";
export const USERS_LIST_KEY = "users_list";
export const FAVOURITES_KEY = "my_favourites";
export const CURRENT_USER_INFO = "netflix_user_info";
export const USER_AVATAR = "";
export const SEARCH_PLACEHOLDER = "Movies, Titles, Genres";

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWE5YjMzYWRkMDlkZTIyOTU4YmRjODBjMjE4ZDA5MSIsIm5iZiI6MTc1MDQwMDMzOC4yOTc5OTk5LCJzdWIiOiI2ODU0ZmQ1MjM3MzMxMDNkYWVkYzM5MzMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.mGf528k_A9hS63SKQ9b7Cl5JBp3SuEXDl6VbApGXPsw",
  },
};

export const MOVIE_CATEGORIES = [
  {
    key: "nowPlayingMovies",
    label: "We Think You'll Love These",
    overlap: true,
  },
  { key: "popularMovies", label: "Popular Movies", overlap: false },
  {
    key: "topRatedMovies",
    label: "Today's Top 10 Picks for You",
    overlap: false,
  },
  { key: "upcomingMovies", label: "Upcoming Movies", overlap: false },
  { key: "crimeMovies", label: "Gritty Crime Action", overlap: false },
  { key: "comedyMovies", label: "Comedy Movies", overlap: false },
  { key: "animations", label: "Animation", overlap: false },
];
