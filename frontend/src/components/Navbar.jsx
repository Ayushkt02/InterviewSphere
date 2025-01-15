import React, { useState } from 'react'
import Logo from '../imgs/Logo.jpg'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and Name */}
        <div className='flex items-center'>
          <NavLink to={'/'}>
            <div class="text-4xl font-extrabold text-black tracking-tight cursor-pointer">
              <span class="text-black">Interview</span><span class="text-gray-500">Sphare</span>
            </div>
          </NavLink>
        </div>

        {/* Hamburger Menu */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Links for Desktop */} 
        <div className="hidden text-center md:flex  space-x-8">
          <a href="#why" className="text-black px-2 py-2 font-semibold hover:text-gray-700">
            Why Us?
          </a>
          <a href="#about" className="text-black px-2 py-2 font-semibold hover:text-gray-700">
            About
          </a>
          <a href="#faq" className="text-black px-2 py-2 font-semibold hover:text-gray-700">
            FAQs
          </a>
          {/* Buttons in Desktop Mode */}
          <NavLink
            to="/join-candidate"
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-700 font-semibold"
          >
            Join as Candidate
          </NavLink>
          <NavLink
            to="/join-interviewer"
            className="bg-white text-black border border-black px-6 py-2 rounded-lg hover:bg-gray-100 font-semibold"
          >
            Join as Interviewer
          </NavLink>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden mt-4 space-y-4`}>
        <a
          href="#why"
          className="text-black font-semibold hover:text-gray-700 block text-center"
        >
          Why
        </a>
        <a
          href="#about"
          className="text-black font-semibold hover:text-gray-700 block text-center"
        >
          About
        </a>
        <NavLink
          to="/join-candidate"
          className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-700 block text-center font-semibold"
        >
          Candidate
        </NavLink>
        <NavLink
          to="/join-interviewer"
          className="bg-white text-black border border-black px-6 py-2 rounded-lg hover:bg-gray-100 block text-center font-semibold"
        >
          Join as Interviewer
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar