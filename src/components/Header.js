import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import { NETFLIX_LOGO } from "../utils/constants";
import { toggleSearchStatus } from "../utils/gptSlice";
import GptSearchbar from "./GptSearchbar";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((store) => store.user);
  const isSearchActive = useSelector((store) => store.gptSearch.isSearchActive);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  const handleSignOut = () => {
    signOut(auth).catch((error) => console.error("Sign-out error:", error));
  };

  const handleSearchClick = () => {
    dispatch(toggleSearchStatus());
  };

  return (
    <header className="flex justify-between items-center w-full px-10 py-4 bg-gradient-to-b from-black fixed z-20">
      {/* Logo */}
      <Link to="/">
        <img className="w-32 md:w-40" src={NETFLIX_LOGO} alt="Netflix Logo" />
      </Link>

      {/* Right Section */}
      {!user ? (
        <div className="flex items-center gap-4">
          {/* Language Dropdown */}
          <div className="relative inline-block">
            <select className="bg-transparent text-white border border-white px-4 py-2 rounded appearance-none pr-10">
              <option className="text-black" value="en">
                English
              </option>
              <option className="text-black" value="hi">
                Hindi
              </option>
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
            Sign In
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
          <Link
            to="/browse"
            className={`transition-colors ${
              location.pathname === "/browse" && !isSearchActive
                ? "text-red-500 font-semibold"
                : "hover:text-red-500"
            }`}
          >
            Browse
          </Link>

          {/* Welcome Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown((prev) => !prev)}
              className="flex items-center gap-1 hover:text-red-500"
            >
              Welcome, <strong>{user.displayName?.split(" ")[0]}</strong>
              <FaChevronDown className="text-sm mt-0.5" />
            </button>
            {showDropdown && (
              <div className="absolute right-0 top-full mt-2 w-44 bg-black border border-zinc-700 rounded-md shadow-lg z-50 text-sm">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-zinc-800"
                >
                  My Account
                </Link>
                <Link
                  to="/favourites"
                  className="block px-4 py-2 hover:bg-zinc-800"
                >
                  My Favourites
                </Link>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 hover:bg-zinc-800"
                >
                  Sign Out
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
