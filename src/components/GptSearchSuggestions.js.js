import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import { NETFLIX_BACKGROUND } from "../utils/constants";
import LoadingSpinner from "./LoadingSpinner";

const GptSearchSuggestions = () => {
  const gptStore = useSelector((store) => store.gptSearch);
  const searchResults = gptStore.searchResults;
  const isLoading = gptStore.isLoading;
  const searchText = useSelector((store) => store.gptSearch.searchText);

  const hasSearched = searchText?.trim().length > 0;
  const hasResults = Array.isArray(searchResults) && searchResults.length > 0;

  const shouldShowFallbackBackground = !hasResults;

  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-hidden pt-24 pb-20 px-4 z-10">
      {/* Background Image + Gradient Overlay */}
      {shouldShowFallbackBackground && (
        <>
          <img
            src={NETFLIX_BACKGROUND}
            alt="Background"
            className="absolute w-full h-full object-cover opacity-50 top-0 left-0 -z-10"
          />
          <div className="absolute w-full h-full bg-gradient-to-b from-gray/90 via-black/60 to-black -z-10 top-0 left-0" />
        </>
      )}

      {/* Case 1: No search done yet */}
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[80vh]">
          <LoadingSpinner />
        </div>
      ) : !hasSearched ? (
        <div className="flex flex-col items-center justify-center text-center min-h-[80vh]">
          <p className="text-xl font-medium text-gray-300 mb-2">
            Search for <span className="text-white font-semibold">comedy</span>,{" "}
            <span className="text-white font-semibold">horror</span>,{" "}
            <span className="text-white font-semibold">romantic</span>, etc.
          </p>
          <p className="text-sm text-gray-400">
            Get personalized movie suggestions powered by AI
          </p>
        </div>
      ) : hasResults ? (
        <>
          <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">
            Movie suggestions for{" "}
            <span className="text-blue-400 italic">"{searchText}"</span>
          </h2>

          <div className="flex flex-wrap gap-y-12 gap-x-8 p-10">
            {searchResults.map((item, index) => (
              <MovieCard
                key={item.id}
                item={item}
                index={index}
                pageStartIndex={0}
                itemWidth={220}
              />
            ))}
          </div>
        </>
      ) : (
        // Case 3: Search done, but no results
        <div className="flex flex-col items-center justify-center text-center min-h-[80vh]">
          <p className="text-2xl sm:text-3xl font-bold mb-6">
            No movies found for your search.
          </p>
          <Link
            to="/browse"
            className="px-6 py-3 bg-red-600 text-white text-lg rounded hover:bg-red-700 transition-all"
          >
            Browse Movies
          </Link>
        </div>
      )}
    </div>
  );
};

export default GptSearchSuggestions;
