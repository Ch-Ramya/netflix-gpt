import { useParams } from "react-router-dom";
import useMovieDetails from "../hooks/useMovieDetails";
import ReactPlayer from "react-player/youtube";

const MovieDetails = () => {
  const { movieId } = useParams();
  const movie = useMovieDetails(movieId);

  if (!movie) return <p className="text-white p-10">Loading...</p>;

  const trailer = movie?.videos?.results?.find(
    (vid) => vid.type === "Trailer" && vid.site === "YouTube"
  );

  return (
    <div className="min-h-screen bg-black text-white p-8 space-y-6 pt-20">
      <h1 className="text-3xl font-bold">{movie.title || movie.name}</h1>

      {/* Trailer or Poster Fallback */}
      <div className="w-full max-w-4xl aspect-video mx-auto rounded overflow-hidden shadow-lg">
        {trailer?.key ? (
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer.key}`}
            width="100%"
            height="100%"
            playing
            muted
            controls
          />
        ) : (
          <img
            src={
              movie.backdrop_path
                ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
                : `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            }
            alt="Movie Poster"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Overview */}
      <p className="text-gray-400 text-sm">{movie.overview}</p>

      {/* Details */}
      <ul className="text-sm space-y-1">
        <li>
          <strong>Rating:</strong> {movie.vote_average} ({movie.vote_count}{" "}
          votes)
        </li>
        <li>
          <strong>Release Date:</strong> {movie.release_date}
        </li>
        <li>
          <strong>Runtime:</strong> {movie.runtime} min
        </li>
        <li>
          <strong>Genres:</strong> {movie.genres?.map((g) => g.name).join(", ")}
        </li>
        <li>
          <strong>Starring:</strong>{" "}
          {movie.credits?.cast
            ?.slice(0, 10)
            ?.map((actor) => actor.name)
            .join(", ")}
        </li>
      </ul>
    </div>
  );
};

export default MovieDetails;
