import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isValidEmail } from "../utils/validation";
import {
  USERS_LIST_KEY,
  CURRENT_USER_INFO,
  NETFLIX_BACKGROUND,
} from "../utils/constants";
import lang from "../utils/langConstants";

const HomePage = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const language = useSelector((store) => store.config.language);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setEmailError("");
    const usersList = JSON.parse(localStorage.getItem(USERS_LIST_KEY)) || [];
    const isSignInForm = usersList.includes(email);

    localStorage.setItem(
      CURRENT_USER_INFO,
      JSON.stringify({ email, isSignInForm })
    );

    navigate("/login");
  };

  return (
    <section className="relative w-full h-screen bg-black text-white overflow-hidden">
      {/* Background Image */}
      <img
        src={NETFLIX_BACKGROUND}
        alt="Netflix Banner"
        className="absolute w-full h-full object-cover opacity-50"
      />

      {/* Overlay */}
      <div className="absolute w-full h-full bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-7 flex flex-col items-center justify-center h-full px-4 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          {lang[language].homepage_main_title ||
            "Unlimited movies, TV shows and more"}
        </h1>
        <h2 className="text-xl md:text-2xl mb-6">
          {lang[language].homepage_title || "Watch anywhere. Cancel anytime."}
        </h2>
        <p className="text-lg mb-4">
          {lang[language].homepage_subtitle ||
            "Ready to watch? Enter your email to create or restart your membership."}
        </p>

        {/* Email Form */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
          <div className="w-full sm:w-2/3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={lang[language].email || "Email Address"}
              className={`w-full px-4 py-3 rounded text-black focus:outline-none ${
                emailError ? "border border-red-500" : ""
              }`}
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1 font-semibold text-left">
                {emailError}
              </p>
            )}
          </div>
          <button
            className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded text-white font-semibold text-lg"
            onClick={handleGetStarted}
          >
            {lang[language].getstarted_title || "Get Started"};
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
