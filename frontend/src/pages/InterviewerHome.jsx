import React, { useContext, useState } from 'react'
import { InterviewerContext } from '../App';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Interviews from '../components/Interviews';

function InterviewerHome() {
    const { interviewerAuth, interviewerAuth: {username, fullname, avg_rating, total_interviews}, setInterviewerAuth } = useContext(InterviewerContext);
    const getInitials = (name) => {
        if (!name) return '';
        return name.split(' ').map((n) => n[0]).join('');
    };
    const navigate = useNavigate(); 

    const initials = getInitials(fullname);

    const [activeTab, setActiveTab] = useState("Requested");

    const tabs = ["Requested", "Scheduled", "Completed"];

    const interviewerStats = {
        averageRating: avg_rating,
        interviewsCompleted: total_interviews,
      };
    
      const logOutInterviewer = () => {
        removeFromSession("interviewer");
        setInterviewerAuth({access_token: null});
        navigate('/');
      }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
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
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={logOutInterviewer}>Logout</li>
                    </ul>
                </div>
                </div>
            </nav>
            {/* Main Content */}
            <div className="flex flex-wrap p-6">
                {/* Left Section */}
                <div className="w-full md:w-2/3">
                <h2 className="text-2xl font-bold mb-2">Hi, <span className="capitalize">{fullname}</span></h2>
                <p className="text-gray-600 mb-4">
                    Welcome to your mock interviews dashboard, here you will find the
                    scheduled interviews along with detailed history of the ones you have
                    completed.
                </p>

                {/* Tabs */}
                <div className="flex space-x-6 border-b mb-4 overflow-x-auto">
                    {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`py-2 px-4 ${
                        activeTab === tab
                            ? "border-b-2 border-black text-black"
                            : "text-gray-500"
                        }`}
                    >
                        {tab}
                    </button>
                    ))}
                </div>

                {/* Content based on tab */}
                {<Interviews type={activeTab} interviewer={true} />}
                </div>

                {/* Right Section: User Stats */}
                <div className="w-full md:w-1/3 p-4">
                    <h3 className="text-lg font-bold mb-4">Your Statistics</h3>
                    <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
                        {/* Average Score */}
                        <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-600">Average Score</span>
                        <span className="text-xl font-bold text-blue-500">
                            {interviewerStats.averageScore}%
                        </span>
                        </div>

                        {/* Interviews Completed */}
                        <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-600">Interviews Completed</span>
                        <span className="text-xl font-bold text-purple-500">
                            {interviewerStats.interviewsCompleted}
                        </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InterviewerHome