import React, { useContext, useState } from 'react'
import Logo from '../imgs/Logo.jpg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../App';
import { removeFromSession } from '../common/session';

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const { userAuth, userAuth: { fullname, username, access_token }, setUserAuth} = useContext(UserContext);

  const getInitials = (name) => {
    if (!name) return '';
    return name.split(' ').map((n) => n[0]).join('');
  };

  const initials = getInitials(fullname);

  const logOutUser = () => {
    removeFromSession("user");
    setUserAuth({access_token: null})
  }

  return (
    <nav className="bg-white shadow-md px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and Name */}
        <div className='flex items-center'>
          <NavLink to={'/'}>
            <div className="text-4xl font-extrabold text-black tracking-tight cursor-pointer">
              <span className="text-black">Interview</span><span className="text-gray-500">Sphere</span>
            </div>
          </NavLink>
        </div>

        {/* Hamburger Menu */}
        <div className="md:hidden flex items-center">
          {!access_token?
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
        :
          <button onClick={toggleMenu} className="text-black">
            <button className="flex m-auto items-center gap-2 focus:outline-none">
              <div className="bg-green-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
                <span className="uppercase">{initials}</span>
              </div>
            </button>
          </button>
        }
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
          {
            access_token ?
            <div className="relative group">
              <button className="flex items-center gap-2 focus:outline-none">
                <div className="bg-green-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
                  <span className="uppercase">{initials}</span>
                </div>
                <span className="capitalize hidden md:flex">{fullname}</span>
              </button>
              {/* Dropdown */}
              <ul className="absolute right-0 w-48 bg-white text-black rounded-lg shadow-lg hidden group-hover:block">
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer"><Link  to={`/${username}`}>Profile</Link></li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Settings</li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={logOutUser}>Logout</li>
              </ul>
            </div>
            :
            <>
            <NavLink
              to="/join-candidate/signin"
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-700 font-semibold"
            >
              Join as Candidate
            </NavLink>
            <NavLink
              to="/join-interviewer/signin"
              className="bg-white text-black border border-black px-6 py-2 rounded-lg hover:bg-gray-100 font-semibold"
            >
              Join as Interviewer
            </NavLink>
            </>
          }
          
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden mt-4 space-y-4`}>
        <a
          href="#why"
          className="text-black font-semibold hover:text-gray-700 block text-center"
        >
          Why Us?
        </a>
        <a
          href="#about"
          className="text-black font-semibold hover:text-gray-700 block text-center"
        >
          About
        </a>
        {
          access_token ?
          <>
          <a
          href="#about"
          className="text-black font-semibold hover:text-gray-700 block text-center"
        >
          <Link  to={`/${username}`}>Profile</Link>
        </a>
        <a
        onClick={logOutUser}
        className="text-black font-semibold hover:text-gray-700 block text-center"
      >
        Logout
      </a>
      </>
          :
          <>
          <NavLink
            to="/join-candidate/signin"
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-700 block text-center font-semibold"
          >
            Join as Candidate
          </NavLink>
          <NavLink
            to="/join-interviewer/signin"
            className="bg-white text-black border border-black px-6 py-2 rounded-lg hover:bg-gray-100 block text-center font-semibold"
          >
            Join as Interviewer
          </NavLink>
          </>

        }
        
      </div>
    </nav>
  )
}

export default Navbar