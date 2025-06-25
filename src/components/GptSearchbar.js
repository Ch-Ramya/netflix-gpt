import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS, SEARCH_PLACEHOLDER } from "../utils/constants";
import { FaSearch } from "react-icons/fa";
import {
  setSearchResults,
  toggleSearchStatus,
  setSearchText,
  setLoading,
} from "../utils/gptSlice";
import mapInputToGenreId from "../utils/mapInputToGenreId";

const GptSearchbar = () => {
  const dispatch = useDispatch();
  const searchInput = useRef(null);
  const gptSearch = useSelector((store) => store.gptSearch);
  const isSearchActive = gptSearch.isSearchActive;

  const handleSearchClick = async () => {
    const searchText = searchInput.current.value.trim();
    if (isSearchActive && searchText === "") {
      dispatch(toggleSearchStatus());
    }

    //make api call to get movie results
    const genreIds = mapInputToGenreId(searchText);
    dispatch(setSearchText(searchText));
    dispatch(setLoading(true));
    let url = "";
    try {
      if (genreIds.length > 0) {
        const genres = genreIds.join(",");
        url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genres}&sort_by=popularity.desc`;
      } else {
        url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          searchText
        )}`;
      }

      const res = await fetch(url, API_OPTIONS);
      if (!res.ok) {
        throw new Error(`API failed: ${res.status}`);
      }
      const data = await res.json();
      console.log(data);

      if (!data || !data.results || data.results.length === 0) {
        dispatch(setSearchResults(null)); // fallback trigger
      } else {
        dispatch(setSearchResults(data.results.slice(0, 18))); // update state
      }
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults(null); // fallback trigger
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex items-center bg-black border border-zinc-500 px-4 py-2 rounded shadow-lg">
      <FaSearch
        onClick={handleSearchClick}
        className="text-white opacity-70 mr-2 hover:cursor-pointer"
      />
      <input
        ref={searchInput}
        type="text"
        placeholder={SEARCH_PLACEHOLDER}
        className="bg-black text-white w-full outline-none placeholder-gray-400 text-sm"
        autoFocus
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearchClick();
          }
        }}
      />
    </div>
  );
};

export default GptSearchbar;
