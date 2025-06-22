import { useSelector } from "react-redux";
import TrailerVideoTitle from "./TrailerVideoTitle";
import TrailerVideoBackground from "./TrailerVideoBackground";

const TrailerContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  if (!movies || movies.length === 0) return null;

  const trailerMovie = movies[Math.floor(Math.random() * movies.length)];
  const { original_title, overview, id, backdrop_path } = trailerMovie;

  return (
    <div className="relative w-full h-[59vw] z-0">
      {/* Background Trailer Video */}
      <TrailerVideoBackground
        movieId={id}
        title={original_title}
        backdrop={backdrop_path}
      />

      {/* Title Overlay */}
      <TrailerVideoTitle title={original_title} description={overview} />
    </div>
  );
};

export default TrailerContainer;
