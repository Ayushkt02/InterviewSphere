import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { InterviewerContext, UserContext } from '../App';
import axios from 'axios';
import { FaGithub, FaLinkedin, FaTwitter, FaGlobe, FaLink } from 'react-icons/fa';
import { getFullDay } from '../common/date';

const profileDataStructure = {
  personal_info: {
    fullname: "",
    username: "",
    email: ""
  },
  account_info: {
    total_interviews: 0,
    avg_score: 0,
    avg_rating: 0
  },
  social_links: {},
  professional_info: {
    company: "",
    position: "",
    yearOfExperience: 0
  },
  joinedAt: ""
};

const socialIcons = {
  github: <FaGithub size={24} />,
  linkedin: <FaLinkedin size={24} />,
  twitter: <FaTwitter size={24} />,
  website: <FaGlobe size={24} />,
  default: <FaLink size={24} />
};

const ProfilePage = () => {
  const { id: profileId } = useParams(); // type can be 'candidate' or 'interviewer'
  const [profile, setProfile] = useState(profileDataStructure);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileLoaded, setProfileLoaded] = useState("");
  const { userAuth } = useContext(UserContext);
  const { interviewerAuth } = useContext(InterviewerContext);

  const username = userAuth?.username || interviewerAuth?.username || "";
  const isInterviewer = interviewerAuth.username ? true : false;
  console.log(isInterviewer);
  const navigate = useNavigate();

  const getInitials = (name) => {
    if (!name) return '';
    return name.split(' ').map((n) => n[0]).join('');
  };

  const initials = getInitials(profile.personal_info.fullname);

  const logOutUser = () => {
    sessionStorage.removeItem("user");
    navigate('/');
  };

  const fetchProfile = () => {
    setLoading(true);
    setError(null);

    const endpoint = isInterviewer ? '/get-interviewer-profile' : '/get-candidate-profile';

    axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}${endpoint}`, { username: profileId })
      .then(({ data }) => {
        if(data){
          setProfile(data);
        }
        setProfileLoaded(profileId);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Failed to load profile.");
        setLoading(false);
      });
  };

  useEffect(() => {
    if (profileId !== profileLoaded) {
      setProfile(profileDataStructure);
      fetchProfile();
    }
  }, [profileId, isInterviewer, profile]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500 text-xl">
        {error}
      </div>
    );
  }

  const editProfile = () => {
    navigate(isInterviewer ? '/edit-interviewer-profile' : '/edit-candidate-profile');
  };

  const { personal_info, account_info, social_links, professional_info, joinedAt } = profile;
  const isOwnProfile = username === personal_info.username;

  return (
    <>
    <nav className="bg-black text-white flex justify-between items-center px-6 py-4">
            {/* Logo */}
            <div onClick={() => navigate('/')} className="text-4xl font-extrabold text-black tracking-tight cursor-pointer">
              <span className="text-white">Interview</span><span className="text-gray-500">Sphere</span>
            </div>
    
            {/* Right side */}
            <div className="flex items-center gap-6">
              <NavLink to="/contactus" className="hover:underline hidden md:flex">
                Contact us
              </NavLink>
              <div className="relative group">
                <button className="flex items-center gap-2 focus:outline-none">
                  <div className="bg-green-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
                    <span className="uppercase">{initials}</span>
                  </div>
                  <span className="capitalize hidden md:flex">{personal_info.fullname}</span>
                </button>
                {/* Dropdown */}
                <ul className="absolute right-0 mt-1 w-48 bg-white text-black rounded-lg shadow-lg hidden group-hover:block">
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer"><Link  to={`/${username}`}>Profile</Link></li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer"><Link>Settings</Link></li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={logOutUser}>Logout</li>
                </ul>
              </div>
            </div>
          </nav>
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 capitalize">{personal_info.fullname}</h2>
        <p className="text-gray-500">@{personal_info.username}</p>
        <p className="text-gray-600">{personal_info.email}</p>
      </div>

      <div className="mt-6 border-t pt-4">
        <h3 className="text-lg font-semibold text-gray-700">Account Info</h3>
        <p className="text-gray-600">Total Interviews: <span className="font-semibold">{account_info.total_interviews}</span></p>
        {!isInterviewer ? (
          <p className="text-gray-600">Average Score: <span className="font-semibold">{account_info.avg_score}</span></p>
        ) : (
          <>
            <p className="text-gray-600">Company: <span className="font-semibold">{professional_info.company}</span></p>
            <p className="text-gray-600">Position: <span className="font-semibold">{professional_info.position}</span></p>
            <p className="text-gray-600">Years of Experience: <span className="font-semibold">{professional_info.yearOfExperience}</span></p>
            <p className="text-gray-600">Average Rating: <span className="font-semibold">{account_info.avg_rating}</span></p>
          </>
        )}
        <p className="text-gray-600">Joined At: <span className="font-semibold">{getFullDay(joinedAt)}</span></p>
      </div>

      {social_links && Object.keys(social_links).length > 0 && (
        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-700">Social Links</h3>
          <div className="flex gap-4 mt-2">
            {Object.entries(social_links).map(([platform, link]) => (
              <a key={platform} href={link} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-500">
                {socialIcons[platform] || socialIcons.default}
              </a>
            ))}
          </div>
        </div>
      )}

      {isOwnProfile && (
        <div className="mt-6 text-center">
          <button onClick={editProfile} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Edit Profile
          </button>
        </div>
      )}
    </div>
    </>
  );
};

export default ProfilePage;
