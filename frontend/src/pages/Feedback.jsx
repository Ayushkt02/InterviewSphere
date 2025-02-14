import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { InterviewerContext } from "../App";
import axios from "axios";

const FeedbackPage = () => {
    let { interview_id } = useParams();
  const [score, setScore] = useState(50);
  const [feedback, setFeedback] = useState("");

    const { interviewerAuth, setInterviewerAuth } = useContext(InterviewerContext);
    const { fullname, username, access_token } = interviewerAuth;

  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  const initials = getInitials(fullname);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (access_token && feedback) {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/save-interview-feedback", { interview_id:interview_id, feedback: feedback, score: score }, {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        })
        .then(({ data }) => {
            alert("Thank you for your feedback!");
            navigate(`/interviewer/Home`);
        })
        .catch(err => console.log(err));
    }
    setScore(50);
    setFeedback("");
  };

  const logOut = () => {
    if(isInterviewer){
      removeFromSession("interviewer");
      setInterviewerAuth({access_token: null});
      navigate('/');
    }else{
      removeFromSession("user");
      setUserAuth({access_token: null});
      navigate('/');
    }
  }

  return (
    <>
    <nav className="bg-black text-white flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div onClick={() => navigate('/')} className="text-4xl font-extrabold text-black tracking-tight cursor-pointer">
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
            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer"><Link  to={`/${username}`}>Profile</Link></li>
            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer"><Link >Settings</Link></li>
            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={logOut}>Logout</li>
            </ul>
        </div>
        </div>
    </nav>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-500 text-white p-6">
      <h2 className="text-2xl font-bold mb-4">Interview Feedback</h2>

      {/* Score Input */}
      <div className="flex items-center space-x-4 mb-4">
        <span className="text-lg">Score: </span>
        <input
          type="number"
          min="0"
          max="100"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          className="w-20 bg-white rounded-lg text-black p-2"
        />
      </div>

      {/* Feedback Input */}
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Share your feedback..."
        className="w-full max-w-lg p-3 text-black bg-white rounded-lg outline-none"
        rows="4"
      ></textarea>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="mt-4 px-6 py-2 text-white bg-black rounded-lg font-semibold hover:bg-gray-300 transition"
      >
        Submit Feedback
      </button>
    </div>
    </>
  );
};

export default FeedbackPage;
