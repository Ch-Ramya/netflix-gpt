import { GENRE_ID_MAP, GENRE_KEYWORD_MAP } from "./constants";

const mapInputToGenreId = (searchText) => {
  const input = searchText.toLowerCase();
  const matchedGenres = [];

  for (const [genreKey, keywords] of Object.entries(GENRE_KEYWORD_MAP)) {
    if (keywords.some((kw) => input.includes(kw))) {
      matchedGenres.push(genreKey);
    }
  }

  // Map to genre IDs
  const genreIds = matchedGenres.map((g) => GENRE_ID_MAP[g]).filter(Boolean);
  return genreIds;
};

export default mapInputToGenreId;
