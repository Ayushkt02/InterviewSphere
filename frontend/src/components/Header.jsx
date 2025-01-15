import React from 'react'
import Hero from '../imgs/Hero.webp'

const Header = () => {
  return (
    // <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20'>
    //   {/* Left Side */}
    //   <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
    //     <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>Book Mock Interviews <br/> with Industry Specialists</p>
    //     <p className='text-white text-sm font-light'>Ace Your Next Interview with Confidence—Practice <br className='hidden sm:block'/> Through Realistic Mock Interviews and Gain the Edge You Need to Succeed.</p>
    //     <a href='#speciality' className='bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300'>
    //       Book interview
    //     </a>
    //   </div>
    //   {/* Right Side */}
    //   <div className='md:w-1/2 relative'>
    //       <img className='w-full md:absolute bottom-0 h-auto rounded-lg' src={Hero}/>
    //   </div>
    // </div>
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
              href="/join-candidate"
              className="bg-black text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-700 hover:scale-105 hover:shadow-lg transition duration-200"
            >
              Join as Candidate
              <img src="" alt="" />
            </a>
            <a
              href="/join-interviewer"
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