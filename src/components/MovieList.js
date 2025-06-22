import { useState, useEffect, useRef } from "react";
import { IMG_CDN } from "../utils/constants";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const MovieList = ({ title, shows, itemBaseWidth = 180, overlap = false }) => {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(window.innerWidth);
  const [itemWidth, setItemWidth] = useState(itemBaseWidth);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const width = containerRef.current?.offsetWidth || window.innerWidth;
      setContainerWidth(width);

      const fitCount = Math.floor(width / itemBaseWidth);
      setItemsPerPage(fitCount);

      const fullItemWidth = width / fitCount;
      setItemWidth(fullItemWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [itemBaseWidth]);

  const totalPages = Math.ceil(shows?.length / itemsPerPage);

  const pageStartIndex = currentPage * itemsPerPage;
  const pageEndIndex = Math.min(pageStartIndex + itemsPerPage, shows?.length);

  const visibleItems = shows?.slice(pageStartIndex, pageEndIndex);

  return (
    <div
      className={`px-4 md:px-8 ${
        overlap ? "-mt-32 md:-mt-56 relative z-20" : "my-16"
      }`}
    >
      <h2 className="text-white text-lg md:text-2xl font-semibold mb-3">
        {title}
      </h2>

      <div className="relative" ref={containerRef}>
        {/* Left Arrow */}
        {currentPage > 0 && (
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-7 bg-black/50 hover:bg-black/80 p-2 rounded-full text-white"
          >
            <FaChevronLeft />
          </button>
        )}

        {/* Carousel Row */}
        <div className="overflow-hidden">
          <div className="flex gap-4">
            {visibleItems?.map((item) => (
              <img
                key={item.id}
                src={IMG_CDN + item.poster_path}
                alt={item.title || item.name}
                className="rounded-md transition-transform duration-300 hover:scale-105"
                style={{
                  width: `${itemWidth}px`,

                  flexShrink: 0,
                }}
              />
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        {currentPage < totalPages - 1 && (
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
            }
            className="absolute right-0 top-1/2 -translate-y-1/2 z-7 bg-black/50 hover:bg-black/80 p-2 rounded-full text-white"
          >
            <FaChevronRight />
          </button>
        )}

        {/* Fade gradient on sides 
        <div className="absolute top-0 left-0 w-12 h-full bg-gradient-to-r from-black to-transparent z-5 pointer-events-none" />
        <div className="absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-black to-transparent z-5 pointer-events-none" /> */}
      </div>
    </div>
  );
};

export default MovieList;
