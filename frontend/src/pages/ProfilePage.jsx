// // import React, { useContext, useEffect, useState } from 'react'
// // import { useParams } from 'react-router-dom';
// // import { UserContext } from '../App';
// // import axios from 'axios';

// // export const profileDataStructure = {
// //     "personal_info": {
// //         "fullname": "",
// //         "username": "",
// //         "email": ""
// //     },
// //     "account_info": {
// //         "total_interviews": 0,
// //         "avg_score": 0
// //     },
// //     "social_links": { },
// //     "joinedAt": ""
// // }

// // const ProfilePage = () => {
// //     let { id: profileId } = useParams();

// //     let [profile, setProfile] = useState(profileDataStructure);
// //     let [ loading, setLoading] = useState(true);
// //     let [ profileLoaded, setProfileLoaded ] = useState();

// //     let { personal_info: { fullname, username: profile_username, email}, account_info: { total_interviews, avg_score}, social_links, joinedAt } = profile;

// //     let { userAuth: { username } } = useContext(UserContext);

// //     const fetchCandidateProfile = () => {
// //         axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-candidate-profile", {username: profileId})
// //         .then(({data: candidate}) => {
// //             if(candidate!=null){
// //                 setProfile(candidate);
// //             }
// //             setProfileLoaded(profileId);
// //             setLoading(false);
// //         })
// //         .catch(err => {
// //             console.log(err);
// //             setLoading(false);
// //         })
// //     }

// //     useEffect(() =>{
// //         if(profileId != profileLoaded){
// //             resetStates();
// //             fetchCandidateProfile();
// //         }
// //     }, [profileId])

// //     const resetStates = () => {
// //         setProfile(profileDataStructure);
// //         setProfileLoaded("");
// //         setLoading(true);
// //     }

// //   return (
// //     <div>{fullname}</div>
// //   )
// // }

// // export default ProfilePage

// import React, { useContext, useEffect, useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import { UserContext } from '../App';
// import axios from 'axios';

// export const profileDataStructure = {
//   personal_info: {
//     fullname: "",
//     username: "",
//     email: ""
//   },
//   account_info: {
//     total_interviews: 0,
//     avg_score: 0
//   },
//   social_links: {},
//   joinedAt: ""
// };

// const ProfilePage = () => {
//   let { id: profileId } = useParams();

//   const [profile, setProfile] = useState(profileDataStructure);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [profileLoaded, setProfileLoaded] = useState("");

//   const { personal_info: { fullname, username: profile_username, email }, account_info: { total_interviews, avg_score }, social_links, joinedAt } = profile;
//   const { userAuth: { username } } = useContext(UserContext);

//   const fetchCandidateProfile = () => {
//     setLoading(true);
//     setError(null);

//     axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-candidate-profile", { username: profileId })
//       .then(({ data: candidate }) => {
//         if (candidate) {
//           setProfile(candidate);
//         }
//         setProfileLoaded(profileId);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error(err);
//         setError("Failed to load profile.");
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     if (profileId !== profileLoaded) {
//       resetStates();
//       fetchCandidateProfile();
//     }
//   }, [profileId]);

//   const resetStates = () => {
//     setProfile(profileDataStructure);
//     setProfileLoaded("");
//     setLoading(true);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center min-h-screen text-red-500 text-xl">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
//       {/* Profile Header */}
//       <div className="text-center">
//         <h2 className="text-2xl font-semibold text-gray-800">{fullname || "Candidate Name"}</h2>
//         <p className="text-gray-500">@{profile_username}</p>
//         <p className="text-gray-600">{email}</p>
//       </div>

//       {/* Account Information */}
//       <div className="mt-6 border-t pt-4">
//         <h3 className="text-lg font-semibold text-gray-700">Account Info</h3>
//         <p className="text-gray-600">Total Interviews: <span className="font-semibold">{total_interviews}</span></p>
//         <p className="text-gray-600">Average Score: <span className="font-semibold">{avg_score}</span></p>
//         <p className="text-gray-600">Joined At: <span className="font-semibold">{new Date(joinedAt).toLocaleDateString()}</span></p>
//       </div>

//       {/* Social Links */}
//       {social_links && Object.keys(social_links).length > 0 && (
//         <div className="mt-6 border-t pt-4">
//           <h3 className="text-lg font-semibold text-gray-700">Social Links</h3>
//           <div className="flex gap-4 mt-2">
//             {Object.entries(social_links).map(([key, link]) => (
//             <Link key={key}>
//               <i className={"fi " + (key != 'website' ? "fi-brands-"+key : "fi-rr-globe") + " text-2xl hover:text-black"}></i>
//               <a key={key} href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
//                 {key.toUpperCase()}
//               </a>
//             </Link>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Edit Button (Visible only if logged-in user is viewing their own profile) */}
//       {username === profile_username && (
//         <div className="mt-6 text-center">
//           <button className=" bg-black text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
//             Edit Profile
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfilePage;


import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../App';
import axios from 'axios';
import { FaGithub, FaLinkedin, FaTwitter, FaGlobe, FaLink } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import { getFullDay } from '../common/date';

export const profileDataStructure = {
  personal_info: {
    fullname: "",
    username: "",
    email: ""
  },
  account_info: {
    total_interviews: 0,
    avg_score: 0
  },
  social_links: {},
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
  
  let { id: profileId } = useParams();
  
  const [profile, setProfile] = useState(profileDataStructure);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileLoaded, setProfileLoaded] = useState("");

  const { personal_info: { fullname, username: profile_username, email }, account_info: { total_interviews, avg_score }, social_links, joinedAt } = profile;
  const { userAuth: { username } } = useContext(UserContext);

  const getInitials = (name) => {
    if (!name) return '';
    return name.split(' ').map((n) => n[0]).join('');
  };
  const navigate = useNavigate(); 

  const initials = getInitials(fullname);

  const [activeTab, setActiveTab] = useState("Requested");

  const tabs = ["Requested", "Scheduled", "Completed"];

  // Sample statistics data
  const userStats = {
    averageScore: avg_score,
    interviewsCompleted: total_interviews,
  };

  const logOutUser = () => {
    removeFromSession("user");
    setUserAuth({access_token: null});
    navigate('/');
  }

  const fetchCandidateProfile = () => {
    setLoading(true);
    setError(null);

    axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-candidate-profile", { username: profileId })
      .then(({ data: candidate }) => {
        if (candidate) {
          setProfile(candidate);
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
      resetStates();
      fetchCandidateProfile();
    }
  }, [profileId]);

  const resetStates = () => {
    setProfile(profileDataStructure);
    setProfileLoaded("");
    setLoading(true);
  };

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

  

  return (
    <>
    <nav className="bg-black text-white flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div className="text-4xl font-extrabold text-black tracking-tight cursor-pointer">
          <span className="text-white">Interview</span><span className="text-gray-500">Sphare</span>
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
              <span className="capitalize hidden md:flex">{fullname}</span>
            </button>
            {/* Dropdown */}
            <ul className="absolute right-0 mt-1 w-48 bg-white text-black rounded-lg shadow-lg hidden group-hover:block">
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer"><Link  to={`/Candidate/${username}`}>Profile</Link></li>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer"><Link >Settings</Link></li>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={logOutUser}>Logout</li>
            </ul>
          </div>
        </div>
      </nav>

    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      {/* Profile Header */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 capitalize">{fullname || "Candidate Name"}</h2>
        <p className="text-gray-500">@{profile_username}</p>
        <p className="text-gray-600">{email}</p>
      </div>

      {/* Account Information */}
      <div className="mt-6 border-t pt-4">
        <h3 className="text-lg font-semibold text-gray-700">Account Info</h3>
        <p className="text-gray-600">Total Interviews: <span className="font-semibold">{total_interviews}</span></p>
        <p className="text-gray-600">Average Score: <span className="font-semibold">{avg_score}</span></p>
        <p className="text-gray-600">Joined At: <span className="font-semibold">{getFullDay(joinedAt)}</span></p>
      </div>

      {/* Social Links */}
      {social_links && Object.keys(social_links).length > 0 && (
        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-700">Social Links</h3>
          <div className="flex gap-4 mt-2">
            {Object.entries(social_links).map(([platform, link]) => (
              <a key={platform} href={link} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-500 capitalize">
                {/* {socialIcons[platform] || socialIcons.default} */}
                {platform}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Edit Button (Visible only if logged-in user is viewing their own profile) */}
      {username === profile_username && (
        <div className="mt-6 text-center">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Edit Profile
          </button>
        </div>
      )}
    </div>
    </>
  );
};

export default ProfilePage;
