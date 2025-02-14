import React, { useContext, useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { storeInSession } from "../common/session";
import { InterviewerContext, UserContext } from "../App";

const InterviewerAuth = ({ type }) => {
  const isSignIn = type === "signin";
  const { interviewerAuth, setInterviewerAuth } = useContext(InterviewerContext);

  const userAuthThroughServer = (serverRoute, formData) => {
    axios.post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, formData)
      .then(({ data }) => {
        storeInSession("interviewer", JSON.stringify(data));
        setInterviewerAuth(data);
      })
      .catch(({ response }) => {
        console.log(response);
        toast.error(response.data.error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const serverRoute = isSignIn ? "/join-interviewer/signin" : "/join-interviewer/signup";
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    const form = new FormData(e.target);
    const formData = {};

    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }

    const { fullname, company, position, yearOfExperience, email, password } = formData;

    if (!isSignIn) {
      if (fullname.length < 3) return toast.error("Full name must be at least 3 letters long");
      if (company.length === 0) return toast.error("Enter Company Name");
      if (position.length === 0) return toast.error("Enter Position");
      if (isNaN(yearOfExperience) || yearOfExperience < 0) return toast.error("Enter a valid Year of Experience");
    }

    if (email.length === 0) return toast.error("Enter Email");
    if (!emailRegex.test(email)) return toast.error("Email is invalid");
    if (!passwordRegex.test(password)) {
      return toast.error("Password should be 6 to 20 characters long with a numeric, 1 lowercase, and 1 uppercase letter");
    }

    userAuthThroughServer(serverRoute, formData);
  };

  if (interviewerAuth && interviewerAuth.access_token) {
    return <Navigate to="/interviewer/Home" />;
  }

  return (
    <>
      {interviewerAuth && interviewerAuth.access_token ? <Navigate to="/interviewer/Home" /> : null}
      <Toaster />
      <div className='flex pt-4 pl-7 pb-4 items-center bg-gray-300'>
        <NavLink to={'/'}>
          <div className="text-4xl font-extrabold text-black tracking-tight cursor-pointer">
            <span className="text-black">Interview</span><span className="text-gray-500">Sphere</span>
          </div>
        </NavLink>
      </div>

      <div className="min-h-screen flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 text-white flex flex-col justify-center items-center p-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-black">
            {isSignIn ? "Welcome Back!" : "Join Us Today!"}
          </h1>
          <p className="text-lg text-center max-w-md text-black">
            {isSignIn
              ? "Sign in to manage your interview schedules and connect with candidates."
              : "Sign up to become an interviewer and contribute to evaluating top talents."}
          </p>
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-10 bg-white">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-6">
            {isSignIn ? "Sign In" : "Sign Up"}
          </h2>
          <form className="w-full max-w-md space-y-6" onSubmit={handleSubmit}>
            {!isSignIn && (
              <>
                <div>
                  <label className="block text-black font-medium mb-2">Full Name</label>
                  <input type="text" name="fullname" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black" placeholder="Enter your full name" required />
                </div>
                <div>
                  <label className="block text-black font-medium mb-2">Company Name</label>
                  <input type="text" name="company" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black" placeholder="Enter your company name" required />
                </div>
                <div>
                  <label className="block text-black font-medium mb-2">Position</label>
                  <input type="text" name="position" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black" placeholder="Enter your position" required />
                </div>
                <div>
                  <label className="block text-black font-medium mb-2">Years of Experience</label>
                  <input type="number" name="yearOfExperience" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black" placeholder="Enter your years of experience" required />
                </div>
              </>
            )}
            <div>
              <label className="block text-black font-medium mb-2">Email</label>
              <input type="email" name="email" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black" placeholder="Enter your email" required />
            </div>
            <div>
              <label className="block text-black font-medium mb-2">Password</label>
              <input type="password" name="password" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black" placeholder="Enter your password" required />
            </div>
            <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
              {isSignIn ? "Sign In" : "Sign Up"}
            </button>
          </form>
          <p className="text-gray-600 mt-6">
            {isSignIn ? "Don't have an account?" : "Already have an account?"} {" "}
            <NavLink to={isSignIn ? "/join-interviewer/signup" : "/join-interviewer/signin"} className="text-black font-medium underline">
              {isSignIn ? "Sign Up" : "Sign In"}
            </NavLink>
          </p>
        </div>
      </div>
    </>
  );
};

export default InterviewerAuth;
