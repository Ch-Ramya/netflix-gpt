import { useState, useRef, useLayoutEffect } from "react";
import { validateForm } from "../utils/validation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
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
    const userInfo = JSON.parse(localStorage.getItem("netflix_user_info"));
    if (userInfo?.email) {
      emailRef.current.value = userInfo.email;
      setIsSignInForm(userInfo.isSignInForm);
      setTimeout(() => {
        passwordRef.current?.focus();
      }, 100);
      localStorage.removeItem("netflix_user_info");
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

  const handleFormSubmission = () => {
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    const name = !isSignInForm ? nameRef.current.value.trim() : "";

    const errorObj = validateForm(isSignInForm, email, password, name);
    const isValid = Object.values(errorObj).every((e) => e === "");

    setErrors(errorObj);

    if (!isValid) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          const usersList =
            JSON.parse(localStorage.getItem("users_list")) || [];
          if (!usersList.includes(email)) {
            usersList.push(email);
            localStorage.setItem("users_list", JSON.stringify(usersList));
          }
        })
        .catch((error) => {
          console.warn(error.code + ": " + error.message);
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          console.warn(error.code + ": " + error.message);
        });
    }
  };

  return (
    <div className="relative w-full h-screen bg-black text-white">
      {/* Background Image */}
      <img
        src="https://assets.nflxext.com/ffe/siteui/vlv3/7968847f-3da9-44b3-8bbb-13a46579881f/web/IN-en-20250609-TRIFECTA-perspective_32b70b51-20d4-46db-8a1a-3d5428be5f0e_large.jpg"
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
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>

          {!isSignInForm && (
            <div className="mb-4">
              <input
                ref={nameRef}
                type="text"
                placeholder="Full Name"
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
              placeholder="Email Address"
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
              placeholder="Password"
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
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          <p
            className="text-gray-400 mt-6 text-sm cursor-pointer hover:underline"
            onClick={toggleSignInform}
          >
            {isSignInForm
              ? "New to Netflix? Sign up now."
              : "Already have an account? Sign in."}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
