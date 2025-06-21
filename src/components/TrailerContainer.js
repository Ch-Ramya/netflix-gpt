import { useSelector } from "react-redux";
import TrailerVideoTitle from "./TrailerVideoTitle";
import TrailerVideoBackground from "./TrailerVideoBackground";

const TrailerContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  if (!movies) return;

  const trailerMovie = movies[Math.floor(Math.random() * movies.length)];
  console.log(trailerMovie);
  const { original_title, overview, id, backdrop_path } = trailerMovie;
  return (
    <div className="relative">
      <TrailerVideoTitle title={original_title} description={overview} />
      <TrailerVideoBackground
        movieId={id}
        title={original_title}
        backdrop={backdrop_path}
      />
    </div>
  );
};

export default TrailerContainer;
