import { useState, useRef } from "react";
import { IMG_CDN } from "../utils/constants";
import MovieHoverCard from "./MovieHoverCard";
import { useNavigate } from "react-router-dom";

const MovieCard = ({
  item,
  itemWidth = 220,
  pageStartIndex,
  index,
  title = "",
}) => {
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => setIsHover(true), 500);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current);
    setIsHover(false);
  };

  const handleMovieCardClick = () => {
    navigate(`/movie/${item.id}`);
  };

  return (
    <div
      key={item.id}
      className="relative hover:cursor-pointer overflow-visible"
      onClick={handleMovieCardClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        width: `${itemWidth}px`,
        height: "230px",
        flexShrink: 0,
      }}
    >
      {title.includes("Top 10") && (
        <div
          className="absolute font-extrabold text-transparent opacity-65 drop-shadow-lg z-10 flex items-center justify-center h-full bg-black w-1/2"
          style={{
            fontSize: "135px",
            WebkitTextStroke: "2px white",
          }}
        >
          {pageStartIndex + index + 1}
        </div>
      )}
      <img
        src={IMG_CDN + item.poster_path}
        alt={item.title || item.name}
        className="rounded-md transition-transform duration-300 w-full h-full object-fit"
      />

      {isHover && <MovieHoverCard movieId={item.id} />}
    </div>
  );
};

export default MovieCard;
