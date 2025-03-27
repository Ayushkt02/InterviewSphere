import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { InterviewerContext, UserContext } from "../App";
import axios from "axios";
import { getDay, getFullDay } from "../common/date";
import { getCandidateName, getInterviewerName } from "../common/GetInterviewerName";

const InterviewDetails = () => {
  let { interview_id } = useParams();
  const [interview, setInterview] = useState({});
  const [interviewerName, setInterviewerName] = useState("");
  const [candidateName, setCandidateName] = useState("");


  const [inputValue, setInputValue] = useState("");

  const { userAuth, setUserAuth } = useContext(UserContext);
  const { interviewerAuth, setInterviewerAuth } = useContext(InterviewerContext);

  const fullname = userAuth?.fullname || interviewerAuth?.fullname || "";
  const username = userAuth?.username || interviewerAuth?.username || "";
  const access_token = userAuth?.access_token || interviewerAuth?.access_token || "";
  const isInterviewer = interviewerAuth.access_token? true : false;

  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  const initials = getInitials(fullname);
  const navigate = useNavigate();

  const fetchInterview = () => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/get-interview", { interview_id })
      .then(({ data: { interview } }) => {
        setInterview(interview);
      })
      .catch((err) => {
        console.log(err);
      });
    };
    
  useEffect(() => {
    fetchInterview();

    if (interview.interviewer) {
        getInterviewerName(interview.interviewer).then(name => {
            setInterviewerName(name);
        });
    }
    if (interview.candidate) {
      getCandidateName(interview.candidate).then(name => {
          setCandidateName(name);
      });
  }
  }, [interview_id, access_token, interview.status, interview.interviewer, interview.candidate]);
  
  const deleteInterview = (interview_id, access_token, target) => {
    target.setAttribute("disabled", true);

    axios
      .post(
        import.meta.env.VITE_SERVER_DOMAIN + "/delete-interview",
        { interview_id },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then(() => {
        target.removeAttribute("disabled");
        navigate("/Candidate/Home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleStart = () => {
    if(access_token){
      if(interview.interviewLink != ''){
        window.open(interview.interviewLink, '_blank');
      }else{
        alert('Interview link is not set');
      }
    }
  }

  const handleAccept = () => {
    if(access_token){
      axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/accept-interview", {interview_id}, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })
      .then(({data}) => {
        console.log(data);
        fetchInterview();
      })
      .catch(err => console.log(err));
    }
  }

  const handleCompleted = () => {
    if(access_token){
      axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/complete-interview", {interview_id}, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })
      .then(({data}) => {
        console.log(data);
        fetchInterview();
      })
      .catch(err => console.log(err));
    }
  }

  const handleFeedback = () => {
    navigate(`/provide-feedback/${interview_id}`);
  };

  const handleJoin = () => {
    if(access_token){
      if(interview.interviewLink != ''){
        window.open(interview.interviewLink, '_blank');
      }else{
        alert('Interview not started yet.');
      }
    }
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

  const saveInterviewLink = () => {
    if (access_token && inputValue) {
      axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/save-interview-link", { interview_id, link: inputValue }, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })
      .then(({ data }) => {
        console.log(data);
        fetchInterview();
      })
      .catch(err => console.log(err));
    }
  }

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

      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-6">
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-800 capitalize">{interview.title}</h1>
          <p
            className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${
              interview.status === "Requested"
                ? "bg-yellow-100 text-yellow-600"
                : interview.status === "Scheduled"
                ? "bg-green-100 text-green-600"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Status: {interview.status}
          </p>
        </div>

        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8 mt-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Interview Details</h2>
          <div className="space-y-4">
            <p><strong>Company Type:</strong> {interview.companyType}</p>
            <p><strong>Resume:</strong> <a href={interview.resume} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View Resume</a></p>
            <p><strong>Interview Date:</strong> {getFullDay(interview.date)}</p>
            <p><strong>Interview Time:</strong> {interview.time}</p>
            <p><strong>Duration:</strong> {interview.duration} minutes</p>
            <p><strong>Notes:</strong> {interview.notes || "No additional notes"}</p>
            {!isInterviewer && <p><strong>Interviewer:</strong> <Link to={`/${interviewerName}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{interviewerName}</Link></p>}
            {isInterviewer && <p><strong>Candidate:</strong> <Link to={`/${candidateName}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{candidateName}</Link></p>}
          </div>
        </div>

        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8 mt-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Feedback & Score</h2>
          <p><strong>Feedback:</strong> {interview.feedback !== '' ? interview.feedback : "No feedback provided yet"}</p>
          <p><strong>Score:</strong> {interview.score !== -1 ? `${interview.score}/100` : "Not scored yet"}</p>
        </div>

        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8 mt-8">
          {isInterviewer && interview.interviewLink === '' && interview.status === "Scheduled" && (
            <>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Enter Meeting Link</h2>
            <div className="flex items-center mr-56 p-3 rounded-lg flex-wrap gap-4">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter interview link..."
                className="px-4 py-2 rounded-lg text-black bg-white border-2 flex-grow"
              />
              <button
                onClick={saveInterviewLink}
                className="ml-3 px-4 py-2 text-white bg-black rounded-lg font-semibold hover:bg-gray-700 transition"
              >
                Save
              </button>
            </div>
            </>
          )}
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Actions</h2>
          <div className="flex flex-wrap gap-4">
            {isInterviewer && interview.status === "Scheduled" && (
              <button onClick={handleStart} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md">
                Start Interview
              </button>
            )}
            {!isInterviewer && interview.status === "Scheduled" && (
              <button onClick={handleJoin} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md">
                Join Interview
              </button>
            )}
            {!isInterviewer && interview.status === "Requested" && (
              <button onClick={(e) => deleteInterview(interview_id, access_token, e.target)} className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition duration-300 shadow-md">
                Cancel Interview Request
              </button>
            )}
            {isInterviewer && interview.score === -1 && interview.status === "Completed" && (
              <button onClick={handleFeedback} className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300 shadow-md">
                Provide Feedback
              </button>
            )}
            {isInterviewer && interview.status === "Requested" && (
              <button onClick={handleAccept} className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300 shadow-md">
                Accept Interview
              </button>
            )}
            {isInterviewer && interview.status === "Scheduled" && (
              <button onClick={handleCompleted} className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition duration-300 shadow-md">
                Mark as Completed
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default InterviewDetails;
