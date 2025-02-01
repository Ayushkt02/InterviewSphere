import React from 'react'
import Hero from '../imgs/Hero.webp'

const Header = () => {
  return (
    <section className="bg-gray-200 rounded-3xl  py-6">
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between">
        {/* Left Side Content */}
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <h1 className="text-4xl font-extrabold text-black leading-tight">
          Book Mock Interviews <br/> with Industry Experts.
          </h1>
          <p className="text-lg text-gray-700 py-4">
            A platform designed to connect candidates with expert interviewers for personalized mock interviews. Enhance your skills with live coding, 1:1 video, and feedback.
          </p>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-start space-y-4 md:space-y-0 md:space-x-4">
            <a
              href="/join-candidate/signin"
              className="bg-black text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-700 hover:scale-105 hover:shadow-lg transition duration-200"
            >
              Join as Candidate
              <img src="" alt="" />
            </a>
            <a
              href="/join-interviewer/signin"
              className="bg-white text-black border border-black px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition duration-200 hover:scale-105 hover:shadow-lg"
            >
              Join as Interviewer
            </a>
          </div>
        </div>

        {/* Right Side Picture */}
        <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
          <img
            src={Hero}
            alt="Hero Illustration"
            className="w-full max-w-md md:max-w-lg"
          />
        </div>
      </div>
    </section>
  )
}

export default Header