import { FaPlay, FaInfoCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import lang from "../utils/langConstants";

const TrailerVideoTitle = ({ title, description }) => {
  const language = useSelector((store) => store.config.language);
  return (
    <div className="absolute bottom-96 left-8 md:left-16 max-w-2xl text-white z-10">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
        {title}
      </h1>
      <p className="text-sm md:text-base font-medium mb-6 text-gray-200 drop-shadow-md line-clamp-3 w-2/3">
        {description}
      </p>
      <div className="flex gap-4">
        <button className="bg-white text-black px-6 py-2 rounded-md font-semibold hover:bg-gray-300 transition flex gap-2 justify-center items-center">
          <FaPlay className="text-sm" />
          {lang[language].play || "Play"}
        </button>
        <button className="bg-white/30 text-white px-6 py-2 rounded-md font-semibold hover:bg-white/50 transition flex gap-2 justify-center items-center">
          <FaInfoCircle className="text-sm" />
          {lang[language].more_info || "More Info"}
        </button>
      </div>
    </div>
  );
};

export default TrailerVideoTitle;
