import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../App";
import axios from "axios";
import { getDay, getFullDay } from "../common/date";


const InterviewDetails = () => {

  let { interview_id } = useParams();
  const [ interview, setInterview ] = useState({});
  const { userAuth, userAuth: { fullname, total_interviews, avg_score, access_token }, setUserAuth } = useContext(UserContext);
  const getInitials = (name) => {
    if (!name) return '';
    return name.split(' ').map((n) => n[0]).join('');
  };

  const initials = getInitials(fullname);
  const navigate = useNavigate(); 


  const fetchInterview = () => {
    axios.post(import.meta.env.VITE_SERVER_DOMAIN + '/get-interview', { interview_id })
    .then( async ({ data: { interview } }) => {
        setInterview(interview);
    })
    .catch(err => {
        console.log(err);
    })
  }

  useEffect(() => {
        fetchInterview();
    }, [interview_id])

  const details = interview;

  const deleteInterview = (interview_id, access_token, target) => {
  
    target.setAttribute("disabled", true);
  
    axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/delete-interview", { interview_id }, {
        headers:{
            'Authorization': `Bearer ${access_token}`
        }
    })
    .then(({ data }) => {
        target.removeAttribute("disabled");
        navigate('/Candidate/Home');
    })
    .catch(err => {
        console.log(err);
    })
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
            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Profile</li>
            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Settings</li>
            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Logout</li>
          </ul>
        </div>
      </div>
    </nav>
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-6">
      {/* Header Section */}
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 capitalize">{details.title}</h1>
        <p
          className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${
            details.status === "Requested"
              ? "bg-yellow-100 text-yellow-600"
              : details.status === "Scheduled"
              ? "bg-green-100 text-green-600"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Status: {details.status}
        </p>
      </div>

      {/* Details Section */}
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8 mt-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Interview Details</h2>
        <div className="space-y-4">
          
          <p className="text-gray-700">
            <strong>Company Type:</strong> {details.companyType}
          </p>
          <p className="text-gray-700">
            <strong>Resume:</strong>{" "}
            <a
              href={details.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View Resume
            </a>
          </p>
          <p className="text-gray-700">
            <strong>Interview Date:</strong> {getFullDay(details.date)}
          </p>
          <p className="text-gray-700">
            <strong>Interview Time:</strong> {details.time}
          </p>
          <p className="text-gray-700">
            <strong>Duration:</strong> {details.duration} minutes
          </p>
          <p className="text-gray-700">
            <strong>Notes:</strong> {details.notes || "No additional notes"}
          </p>
          <p className="text-gray-700">
            <strong>Interviewer:</strong> {details.interviewer || "Not assigned yet"}
          </p>
        </div>
      </div>

      {/* Feedback Section */}
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8 mt-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Feedback & Score</h2>
        <div className="space-y-4">
          <p className="text-gray-700">
            <strong>Feedback:</strong> {details.feedback || "No feedback provided yet"}
          </p>
          <p className="text-gray-700">
            <strong>Score:</strong>{" "}
            {details.score !== undefined ? (
              <span className="font-bold text-green-600">{details.score}/100</span>
            ) : (
              "Not scored yet"
            )}
          </p>
        </div>
      </div>

      {/* Actions Section */}
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8 mt-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Actions</h2>
        <div className="flex flex-wrap gap-4">
          {details.status === "Scheduled" && (
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md">
              Join Interview
            </button>
          )}
          {(details.status === "Requested") && (
            <button onClick={(e) => deleteInterview(interview_id, access_token, e.target)} className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition duration-300 shadow-md">
              Cancel Interview Request
            </button>
          )}
          {details.status === "Completed" && (
            <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300 shadow-md">
              View Feedback
            </button>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default InterviewDetails;
