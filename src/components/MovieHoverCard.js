import { useState, useEffect } from "react";
import { FaPlay, FaThumbsUp, FaChevronDown, FaChevronUp } from "react-icons/fa";
import useMovieDetails from "../hooks/useMovieDetails";
import { FAVOURITES_KEY } from "../utils/constants";

const MovieHoverCard = ({ movieId }) => {
  const [showDescription, setShowDescription] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const movieDetails = useMovieDetails(movieId);

  useEffect(() => {
    if (!movieDetails) return;
    const favourites = JSON.parse(localStorage.getItem(FAVOURITES_KEY)) || [];
    const exists = favourites.some((item) => item.id === movieDetails.id);
    setIsFavourite(exists);
  }, [movieDetails]);

  const toggleFavourite = () => {
    const favourites = JSON.parse(localStorage.getItem(FAVOURITES_KEY)) || [];
    const index = favourites.findIndex((item) => item.id === movieDetails.id);
    if (index !== -1) {
      favourites.splice(index, 1);
      setIsFavourite(false);
    } else {
      favourites.push(movieDetails);
      setIsFavourite(true);
    }
    localStorage.setItem(FAVOURITES_KEY, JSON.stringify(favourites));
  };

  if (!movieDetails) return null;

  return (
    <div
      className="absolute top-[-40px] left-1/2 -translate-x-1/2 w-[320px] z-50
        bg-zinc-900 rounded-lg shadow-2xl border border-zinc-800
        transition-all duration-300 scale-100 group-hover:scale-110 
        origin-bottom shadow-[0_20px_50px_rgba(0,0,0,0.8)] drop-shadow-md"
    >
      {/* Backdrop Image */}
      <img
        src={`https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`}
        alt="preview"
        className="rounded-t-lg object-cover h-[200px] w-full"
      />

      {/* Info Panel */}
      <div className="p-3 text-white space-y-3">
        {/* Actions */}
        <div className="flex items-center gap-2 mt-1">
          {/* Play Button */}
          <button className="flex items-center gap-2 bg-white text-black font-bold text-sm px-4 py-1.5 rounded hover:bg-opacity-80 transition">
            <FaPlay className="text-sm" />
            Play
          </button>

          {/* Like Button */}
          <button
            className={`w-9 h-9 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/80 transition ${
              isFavourite ? "text-red-500" : "text-white"
            }`}
            onClick={toggleFavourite}
          >
            <FaThumbsUp className="text-sm" />
          </button>

          {/* Expand Button */}
          <button
            className="w-9 h-9 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/80 transition text-white ml-auto"
            onClick={() => setShowDescription((prev) => !prev)}
          >
            {showDescription ? (
              <FaChevronUp className="text-sm" />
            ) : (
              <FaChevronDown className="text-sm" />
            )}
          </button>
        </div>

        {/* Meta Info */}
        <div className="flex items-center gap-2 text-xs text-white">
          <span className="border border-white px-1 py-0.5 rounded">
            U/A {movieDetails?.adult ? "18+" : "13+"}
          </span>
          <span className="border border-white px-1 py-0.5 rounded">
            {movieDetails.runtime} min
          </span>
          <span className="border border-white px-1 py-0.5 rounded">HD</span>
        </div>

        {/* Genres */}
        <div className="text-xs text-gray-300">
          {movieDetails.genres?.map((g) => g.name).join(" • ")}
        </div>

        {/* Description */}
        {showDescription && (
          <p className="text-sm text-gray-400">{movieDetails.overview}</p>
        )}
      </div>
    </div>
  );
};

export default MovieHoverCard;
