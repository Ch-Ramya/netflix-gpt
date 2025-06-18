import { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggleSignInform = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div className="relative">
      <Header />
      <div>
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/7968847f-3da9-44b3-8bbb-13a46579881f/web/IN-en-20250609-TRIFECTA-perspective_32b70b51-20d4-46db-8a1a-3d5428be5f0e_large.jpg"
          alt="netflix background"
        />
        <form className="bg-opacity-80 p-12 bg-black absolute top-20 w-1/2 text-white m-auto">
          <h1 className="font-bold text-3xl py-4">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignInForm && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-2 my-2 bg-gray-700"
            />
          )}
          <input
            type="text"
            placeholder="Email Address"
            className="w-full p-2 my-2 bg-gray-700"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 my-2 bg-gray-700"
          />
          <button className="p-4 my-4 bg-red-700 w-full rounded-lg">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          <p className="py-4 cursor-pointer" onClick={toggleSignInform}>
            {isSignInForm
              ? "New to Netflix ? Sign Up Now"
              : "Already Registered ? Sign In Now"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
