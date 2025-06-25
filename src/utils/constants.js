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
    Authorization: "Bearer " + process.env.REACT_APP_TMDB_KEY,
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

export const LANGUAGE_OPTIONS = [
  { key: "", label: "" },
  { key: "", label: "" },
  { key: "", label: "" },
  { key: "", label: "" },
];

export const GENRE_ID_MAP = {
  action: 28,
  comedy: 35,
  romance: 10749,
  horror: 27,
  drama: 18,
  animation: 16,
  crime: 80,
  thriller: 53,
  fantasy: 14,
  sciFi: 878,
};

export const GENRE_KEYWORD_MAP = {
  action: ["action", "fight", "war", "battle", "guns"],
  comedy: ["comedy", "funny", "humor", "laugh", "sitcom", "hilarious"],
  romance: ["romance", "love", "romcom", "date", "relationship"],
  drama: ["drama", "emotional", "serious", "tragedy"],
  horror: ["horror", "scary", "ghost", "thriller", "haunted", "creepy"],
  animation: ["animation", "cartoon", "anime", "pixar", "disney"],
  sciFi: ["sci-fi", "space", "future", "technology", "alien"],
  crime: ["crime", "detective", "mafia", "gangster", "mystery"],
  fantasy: ["fantasy", "magic", "myth", "legend", "epic"],
};
