import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { NETFLIX_BACKGROUND } from "../utils/constants";

const MyFavourites = () => {
  const user = useSelector((store) => store.user);
  const favourites = user?.favourites || [];

  return (
    <div
      className={`pt-24 pb-16 px-4 text-white min-h-screen relative overflow-hidden ${
        favourites.length > 0 ? "bg-black" : ""
      }`}
    >
      {/* Background Image + Gradient Overlay */}
      {favourites.length === 0 && (
        <>
          <img
            src={NETFLIX_BACKGROUND}
            alt="Background"
            className="absolute w-full h-full object-cover opacity-50 top-0 left-0 -z-10"
          />
          <div className="absolute w-full h-full bg-gradient-to-b from-black/90 via-black/60 to-black -z-10 top-0 left-0" />
        </>
      )}

      {/* Foreground Content */}
      <div className="relative z-10">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 p-10 pb-0">
          My Favourite Movies
        </h1>

        {favourites.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center mt-32">
            <p className="text-xl mb-4">You have no favourite movies yet.</p>
            <Link
              to="/browse"
              className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Browse Movies
            </Link>
          </div>
        ) : (
          <div className="flex flex-wrap gap-y-12 gap-x-8 p-10">
            {favourites.map((item, index) => (
              <MovieCard
                key={item.id}
                item={item}
                index={index}
                pageStartIndex={0}
                itemWidth={220}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFavourites;
