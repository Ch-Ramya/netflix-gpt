import { useState, useRef, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { validateForm } from "../utils/validation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useSelector } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  USERS_LIST_KEY,
  CURRENT_USER_INFO,
  NETFLIX_BACKGROUND,
} from "../utils/constants";
import lang from "../utils/langConstants";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const language = useSelector((store) => store.config.language);
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  useLayoutEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem(CURRENT_USER_INFO));
    if (userInfo?.email) {
      emailRef.current.value = userInfo.email;
      setIsSignInForm(userInfo.isSignInForm);
      setTimeout(() => {
        passwordRef.current?.focus();
      }, 100);
      localStorage.removeItem(CURRENT_USER_INFO);
    }
  }, []);

  const toggleSignInform = () => {
    setIsSignInForm(!isSignInForm);
    setErrors({
      name: "",
      email: "",
      password: "",
    });
  };

  const redirectIfNeeded = () => {
    if (location.pathname === "/" || location.pathname === "/login") {
      navigate("/browse");
    }
  };

  const handleSignUp = async (email, password, name) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Add user email to localStorage list
      const usersList = JSON.parse(localStorage.getItem(USERS_LIST_KEY)) || [];
      if (!usersList.includes(email)) {
        usersList.push(email);
        localStorage.setItem(USERS_LIST_KEY, JSON.stringify(usersList));
      }

      // Update displayName
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: "",
      });

      console.log("profile updated");
      redirectIfNeeded();
    } catch (error) {
      console.error(error.code + ": " + error.message);
    }
  };

  const handleSignIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      redirectIfNeeded();
    } catch (error) {
      console.error(error.code + ": " + error.message);
    }
  };

  const handleFormSubmission = () => {
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    const name = !isSignInForm ? nameRef.current.value.trim() : "";

    const errorObj = validateForm(isSignInForm, email, password, name);
    const isValid = Object.values(errorObj).every((e) => e === "");
    setErrors(errorObj);
    if (!isValid) return;

    isSignInForm
      ? handleSignIn(email, password)
      : handleSignUp(email, password, name);
  };

  return (
    <div className="relative w-full h-screen bg-black text-white">
      {/* Background Image */}
      <img
        src={NETFLIX_BACKGROUND}
        alt="netflix background"
        className="absolute w-full h-full object-cover opacity-60"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Form Container */}
      <div className="relative z-7 flex justify-center items-center h-full px-4">
        <form
          className="w-full max-w-md bg-black bg-opacity-80 p-10 rounded-md"
          onSubmit={(e) => {
            e.preventDefault();
            handleFormSubmission();
          }}
        >
          <h1 className="text-3xl font-bold mb-6">
            {isSignInForm
              ? lang[language].sign_in || "Sign In"
              : lang[language].sign_up || "Sign Up"}
          </h1>

          {!isSignInForm && (
            <div className="mb-4">
              <input
                ref={nameRef}
                type="text"
                placeholder={lang[language].name || "Full Name"}
                className={`w-full p-3 bg-gray-700 rounded placeholder-gray-300 focus:outline-none ${
                  errors.name ? "border border-red-500" : ""
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
          )}

          <div className="mb-4">
            <input
              ref={emailRef}
              type="text"
              placeholder={lang[language].email || "Email Address"}
              className={`w-full p-3 bg-gray-700 rounded placeholder-gray-300 focus:outline-none ${
                errors.email ? "border border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-4 relative">
            <input
              ref={passwordRef}
              type={showPassword ? "text" : "password"}
              placeholder={lang[language].password || "Password"}
              className={`w-full p-3 bg-gray-700 rounded placeholder-gray-300 pr-10 focus:outline-none ${
                errors.password ? "border border-red-500" : ""
              }`}
            />
            <div
              className="absolute right-3 top-1/2 transform -translate-y-2/3 cursor-pointer text-gray-500 pt-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded font-semibold text-lg"
          >
            {isSignInForm
              ? lang[language].sign_in || "Sign In"
              : lang[language].sign_up || "Sign Up"}
          </button>

          <p
            className="text-gray-400 mt-6 text-sm cursor-pointer hover:underline"
            onClick={toggleSignInform}
          >
            {isSignInForm
              ? lang[language].newToNetflix || "New to Netflix? Sign up now."
              : lang[language].alreadyAcc ||
                "Already have an account? Sign in."}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
