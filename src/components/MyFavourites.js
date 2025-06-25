// pages/MyFavourites.js
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";

const MyFavourites = () => {
  const user = useSelector((store) => store.user);
  const favourites = user?.favourites || [];

  return (
    <div className="pt-24 pb-16 px-4 bg-black text-white min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 p-10 pb-0">
        My Favourite Movies
      </h1>

      {favourites.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center mt-20">
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
  );
};

export default MyFavourites;
