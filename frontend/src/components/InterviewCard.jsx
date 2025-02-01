import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../App";
import axios from "axios";



const InterviewCard = ({ title, companyType, duration, content }) => {
  return (
    <div className="flex flex-col justify-between w-full md:w-72 border-2 rounded-lg bg-white p-6 shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300">
      {/* Card Details */}
      <div className="mb-4">
        <p className="text-xl font-bold text-gray-800 capitalize">{title}</p>
        <p className="text-gray-600 capitalize">Company Type: {companyType}</p>
        <p className="text-gray-600">Duration: {duration} min</p>
      </div>

      {/* More Info Button */}
      <div className="flex justify-center gap-4">
        <NavLink
          to={`/interview/${content}`}
          className=" bg-black text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
        >
          More Info
        </NavLink>
      </div>
    </div>
  );
};

export default InterviewCard;