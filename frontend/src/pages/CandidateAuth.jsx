import React, { useContext, useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { storeInSession } from "../common/session";
import { UserContext } from "../App";

const CandidateAuth = ({ type }) => {
  const isSignIn = type === "signin"; // Determines the form type
  const { userAuth, setUserAuth } = useContext(UserContext);

  const userAuthThroughServer = (serverRoute, formData) => {
    axios.post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, formData)
      .then(({ data }) => {
        storeInSession("user", JSON.stringify(data));
        setUserAuth(data);
      })
      .catch(({ response }) => {
        toast.error(response.data.error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let serverRoute = type === "signin" ? "/join-candidate/signin" : "/join-candidate/signup";

    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

    let form = new FormData(e.target);
    let formData = {};

    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }

    let { fullname, email, password } = formData;

    if (fullname) {
      if (fullname.length < 3) {
        return toast.error("Full name must be at least 3 letters long");
      }
    }
    if (email.length === 0) {
      return toast.error("Enter Email");
    }
    if (!emailRegex.test(email)) {
      return toast.error("Email is invalid");
    }
    if (!passwordRegex.test(password)) {
      return toast.error("Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letter");
    }
    userAuthThroughServer(serverRoute, formData);
  };

  if (userAuth && userAuth.access_token) {
    return <Navigate to="/Candidate/Home" />;
  }

  return (
    <>
      {userAuth && userAuth.access_token ? <Navigate to="/Candidate/Home" /> : null}
      <div className='flex pt-4 pl-7 pb-4 items-center bg-gray-300'>
        <NavLink to={'/'}>
          <div className="text-4xl font-extrabold text-black tracking-tight cursor-pointer">
            <span className="text-black">Interview</span><span className="text-gray-500">Sphere</span>
          </div>
        </NavLink>
      </div>
      <div className="min-h-screen flex flex-col md:flex-row">
        <Toaster />
        {/* Left Side */}
        <div className="w-full md:w-1/2 text-white flex flex-col justify-center items-center p-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-black">
            {isSignIn ? "Welcome Back!" : "Join Us Today!"}
          </h1>
          <p className="text-lg text-center max-w-md text-black">
            {isSignIn
              ? "Sign in to access your account and continue your journey with us."
              : "Sign up to start your journey with us and explore exciting opportunities."}
          </p>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-10 bg-white">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-6">
            {isSignIn ? "Sign In" : "Sign Up"}
          </h2>
          <form
            id="formElement"
            className="w-full max-w-md space-y-6"
            onSubmit={handleSubmit}
          >
            {!isSignIn && (
              <div>
                <label className="block text-black font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullname"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-black font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-black font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              {isSignIn ? "Sign In" : "Sign Up"}
            </button>
          </form>
          <p className="text-gray-600 mt-6">
            {isSignIn
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <NavLink
              to={isSignIn ? "/join-candidate/signup" : "/join-candidate/signin"}
              className="text-black font-medium underline"
            >
              {isSignIn ? "Sign Up" : "Sign In"}
            </NavLink>
          </p>
        </div>
      </div>
    </>
  );
};

export default CandidateAuth;
