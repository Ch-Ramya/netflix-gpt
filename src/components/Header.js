import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { addUser, removeUser, setFavourites } from "../utils/userSlice";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import { NETFLIX_LOGO, LANGUAGE_OPTIONS } from "../utils/constants";
import { clearSearch, toggleSearchStatus } from "../utils/gptSlice";
import GptSearchbar from "./GptSearchbar";
import { getUserFavourites } from "../utils/firestore";
import lang from "../utils/langConstants";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((store) => store.user);
  const config = useSelector((store) => store.config);
  const language = config.language;
  const isSearchActive = useSelector((store) => store.gptSearch.isSearchActive);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const rawUserName =
    user?.displayName || (user?.email ? user.email.split("@")[0] : "N/A");
  const userName =
    rawUserName !== "N?A"
      ? rawUserName.charAt(0).toUpperCase() + rawUserName.slice(1)
      : rawUserName;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        const favourites = await getUserFavourites(uid);
        dispatch(setFavourites(favourites));
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    // Sync language from localStorage
    const savedLang = localStorage.getItem("app_language");
    if (savedLang && savedLang !== config.language) {
      dispatch(changeLanguage(savedLang));
    }

    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  useEffect(() => {
    setShowDropdown(false);
  }, [location.pathname]);

  const handleSignOut = () => {
    signOut(auth).catch((error) => console.error("Sign-out error:", error));
  };

  const handleSearchClick = () => {
    dispatch(toggleSearchStatus());
    if (location.pathname !== "/browse") {
      navigate("/browse");
    }
  };

  const handleBrowseClick = () => {
    if (isSearchActive) dispatch(clearSearch());
    else if (location.pathname !== "/browse") {
      navigate("/browse");
    }
  };

  return (
    <header className="flex justify-between items-center w-full px-10 py-4 bg-gradient-to-b from-black fixed z-20">
      {/* Logo */}

      <img
        onClick={() => navigate(user ? "/browse" : "/")}
        className="w-32 md:w-40"
        src={NETFLIX_LOGO}
        alt="Netflix Logo"
      />

      {/* Right Section */}
      {!user ? (
        <div className="flex items-center gap-4">
          {/* Language Dropdown */}
          <div className="relative inline-block">
            <select
              className="bg-transparent text-white border border-white px-4 py-2 rounded appearance-none pr-10"
              value={language}
              defaultValue="en"
              onChange={(e) => dispatch(changeLanguage(e.target.value))}
            >
              {LANGUAGE_OPTIONS.map((language) => (
                <option
                  key={language.key}
                  value={language.key}
                  className="text-black"
                >
                  {language.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-white">
              <FaChevronDown />
            </div>
          </div>

          {/* Sign In */}
          <button
            onClick={() => navigate("/login")}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold"
          >
            {lang[language].sign_in || "Sign In"}
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-6 text-white font-medium relative">
          {/* Search Input + Icon */}
          <div className="relative">
            {!isSearchActive ? (
              <button
                onClick={handleSearchClick}
                className={`p-2 hover:text-red-500 ${
                  isSearchActive ? "text-white" : ""
                }`}
              >
                <FaSearch className="text-lg" />
              </button>
            ) : (
              <GptSearchbar handleSearchClick={handleSearchClick} />
            )}
          </div>

          {/* Browse */}
          <button
            onClick={handleBrowseClick}
            className={`transition-colors ${
              location.pathname === "/browse" && !isSearchActive
                ? "text-red-500 font-semibold"
                : "hover:text-red-500"
            }`}
          >
            {lang[language].browse || "Browse"}
          </button>
          <Link
            to="/favourites"
            className={`transition-colors ${
              location.pathname === "/favourites"
                ? "text-red-500 font-semibold"
                : "hover:text-red-500"
            }`}
          >
            {lang[language].my_favourites || "My Favourites"}
          </Link>

          {/* Welcome Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown((prev) => !prev)}
              className="flex items-center gap-1 hover:text-red-500"
            >
              <img
                src={
                  user?.photoURL ||
                  "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                }
                alt="Profile"
                className="w-8 h-8 rounded-full object-fit"
              />
              <span className="capitalize hidden sm:block font-medium px-1">
                {userName}
              </span>
              <FaChevronDown className="text-sm mt-0.5" />
            </button>
            {showDropdown && (
              <div className="absolute right-0 top-full mt-2 w-44 bg-black border border-zinc-700 rounded-md shadow-lg z-50 text-sm">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-zinc-800"
                >
                  {lang[language].my_profile || "My Profile"}
                </Link>
                <Link
                  to="/favourites"
                  className="block px-4 py-2 hover:bg-zinc-800"
                >
                  {lang[language].my_favourites || "My Favourites"}
                </Link>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 hover:bg-zinc-800"
                >
                  {lang[language].sign_out || "Sign Out"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
