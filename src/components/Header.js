import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { FaChevronDown } from "react-icons/fa";
import { NETFLIX_LOGO } from "../utils/constants";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

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

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("user signed out");
      })
      .catch((error) => {
        console.error("Sign-out error:", error);
      });
  };

  return (
    <header className="flex justify-between items-center w-full px-10 py-4 bg-gradient-to-b from-black fixed z-20">
      {/* Logo */}
      <Link to="/">
        <img className="w-32 md:w-40" src={NETFLIX_LOGO} alt="Netflix Logo" />
      </Link>

      {/* Right side */}
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
            {/* Chevron */}
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-white">
              <FaChevronDown />
            </div>
          </div>

          {/* Sign In button */}
          <button
            onClick={() => navigate("/login")}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold"
          >
            Sign In
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-6 text-white font-medium">
          <span className="hidden md:inline">
            Welcome, <strong>{user.displayName?.split(" ")[0]}</strong>
          </span>

          <Link to="/browse" className="hover:text-red-500 transition-colors">
            Browse
          </Link>

          <button
            onClick={handleSignOut}
            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
          >
            Sign Out
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
