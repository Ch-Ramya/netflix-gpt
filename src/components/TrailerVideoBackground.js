import { useState, useRef } from "react";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { useSelector } from "react-redux";
import { FaVolumeMute, FaVolumeUp, FaRedo } from "react-icons/fa";
import ReactPlayer from "react-player/youtube";

const TrailerVideoBackground = ({ movieId, title, backdrop }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [trailerEnded, setTrailerEnded] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const playerRef = useRef(null);

  useMovieTrailer(movieId);
  const trailer = useSelector((store) => store.movies?.trailerMovie);

  const handleReplay = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(0);
      setTrailerEnded(false);
      setShowFallback(false);
    }
  };

  if (!trailer) return null;

  return (
    <div className="relative w-full h-[59vw] overflow-hidden bg-black z-0">
      {!showFallback ? (
        <ReactPlayer
          ref={playerRef}
          url={`https://www.youtube.com/watch?v=${trailer.key}`}
          playing
          muted={isMuted}
          width="100%"
          height="100%"
          controls={false}
          onEnded={() => {
            setTrailerEnded(true);
            setShowFallback(true);
          }}
          config={{
            youtube: {
              playerVars: {
                modestbranding: 1,
                rel: 0,
                showinfo: 0,
              },
            },
          }}
          className="absolute top-0 left-0 z-0"
        />
      ) : (
        <img
          src={`https://image.tmdb.org/t/p/original${backdrop}`}
          alt={title}
          className="w-full h-full object-cover"
        />
      )}

      {/* Fade at bottom */}
      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />

      {/* Mute / Replay / UA */}
      <div className="absolute bottom-96 right-8 z-20 flex items-center gap-3">
        {!showFallback ? (
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="bg-white/30 text-white p-2 rounded-full border border-white"
          >
            {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
          </button>
        ) : (
          <button
            onClick={handleReplay}
            className="bg-white/30 text-white p-2 rounded-full border border-white"
          >
            <FaRedo size={20} />
          </button>
        )}
        <div className="bg-white/30 text-white text-sm px-6 py-2 font-medium backdrop-blur-sm border-l-4 border-l-white">
          U/A 16+
        </div>
      </div>
    </div>
  );
};

export default TrailerVideoBackground;
