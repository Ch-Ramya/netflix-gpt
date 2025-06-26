import { useState } from "react";
import { saveUserFavourites } from "../utils/firestore";
import { addToFavourites, removeFromFavourites } from "../utils/userSlice";
import { useSelector } from "react-redux";
import { FaPlay, FaThumbsUp, FaChevronDown, FaChevronUp } from "react-icons/fa";
import useMovieDetails from "../hooks/useMovieDetails";
import useToggleFavourite from "../hooks/useToggleFavourite";
import lang from "../utils/langConstants";

const MovieHoverCard = ({ movieId }) => {
  const language = useSelector((store) => store.config.language);
  const [showDescription, setShowDescription] = useState(false);
  const movieDetails = useMovieDetails(movieId);

  const { isFavourite, toggleFavourite } = useToggleFavourite(movieDetails);

  if (!movieDetails) return null;

  return (
    <div
      className="absolute top-[-40px] left-1/2 -translate-x-1/2 w-[320px] z-50
        bg-zinc-900 rounded-lg border border-zinc-800
        transition-all duration-300 scale-100 group-hover:scale-110 
        origin-bottom shadow-[0_20px_50px_rgba(0,0,0,0.8)] drop-shadow-md"
    >
      {/* Backdrop Image */}
      <img
        src={
          movieDetails.backdrop_path
            ? `https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`
            : `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
        }
        alt="preview"
        className="rounded-t-lg object-fit h-[200px] w-full"
      />
      {/* Movie Title */}
      <h3 className="text-base font-semibold text-white mt-2 px-2 truncate">
        {movieDetails.title || movieDetails.name}
      </h3>

      {/* Info Panel */}
      <div className="p-3 text-white space-y-3">
        {/* Actions */}
        <div className="flex items-center gap-2 mt-1">
          {/* Play Button */}
          <button className="flex items-center gap-2 bg-white text-black font-bold text-sm px-4 py-1.5 rounded hover:bg-opacity-80 transition">
            <FaPlay className="text-sm" />
            {lang[language].play || "Play"}
          </button>

          {/* Like Button */}
          <button
            className={`w-9 h-9 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/80 transition ${
              isFavourite ? "text-red-500" : "text-white"
            }`}
            title={
              isFavourite
                ? lang[language].remove_favourites || "Remove from My Faourites"
                : lang[language].add_favourites || "Add to My Favourites"
            }
            onClick={toggleFavourite}
          >
            <FaThumbsUp className="text-sm" />
          </button>

          {/* Expand Button */}
          <button
            className="w-9 h-9 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/80 transition text-white ml-auto"
            onClick={() => setShowDescription((prev) => !prev)}
            title={
              showDescription
                ? lang[language].hide_description || "Hide Movie Details"
                : lang[language].show_description || "See Movie Details"
            }
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
