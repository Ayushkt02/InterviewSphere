import React, { useContext, useState } from "react";
import { UserContext } from "../App";
import { NavLink, useNavigate } from "react-router-dom";
import UploadImage from "../common/fileUpload";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";


const InterviewRequest = () => {
  let navigate = useNavigate();
  const { userAuth, userAuth: { access_token, fullname }, setUserAuth } = useContext(UserContext);
  const getInitials = (name) => {
    if (!name) return '';
    return name.split(' ').map((n) => n[0]).join('');
  };
  
  const initials = getInitials(fullname);

  const [formData, setFormData] = useState({
    title: "",
    companyType: "",
    resume: "",
    date: "",
    time: "",
    duration: "",
    notes: "",
    candidate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Form Data Submitted:", formData);
  //   alert("Your interview request has been submitted!");
  // };

  const handleFileChange = async(e) => {
    let file = e.target.files[0];
    
    if(file){
      let loadingToast = toast.loading("Uploading....")
      UploadImage(file).then((url) => {
          if(url){
              toast.dismiss(loadingToast);
              toast.success("Uploaded 👍")
              setFormData({ ...formData, resume: url  })
          }
      })
      .catch(err => {
          toast.dismiss(loadingToast);
          return toast.error(err);
      })
    }
  }

  const requestInterview = (e) => {
    if(e.target.className.includes("disable")){
      return;
    }
    const { title, companyType, resume, date, time, duration, notes } = formData;
    if(!title.length){
      return toast.error("You must provide a title")
    }
    if(!companyType.length){
      return toast.error("You must provide company type");
    }
    if(!resume.length){
      return toast.error("You must provide a resume")
    }
    if(!date.length){
      return toast.error("You must provide a date");
    }
    if(!time.length){
      return toast.error("You must provide a time");
    }
    if(!duration.length){
      return toast.error("You must provide a duration");
    }
    
    let loadingToast = toast.loading("publishing....");
    e.target.classList.add('disable');

    axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/interview-request", {title, companyType, resume, date, time, duration, notes,}, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    })
    .then(() => {
      e.target.classList.remove('disable');
      toast.dismiss(loadingToast);
      toast.success("Submitted 👍")
      setTimeout(() => {
          navigate("/Candidate/Home");
      }, 500)
    })
    .catch(({ response }) => {
      e.target.classList.remove('disable');
      toast.dismiss(loadingToast);
      return toast.error(response.data.error);
    })
  }

  return (
    <>
    <nav className="bg-black text-white flex justify-between items-center px-6 py-4 sticky top-0 z-10">
         {/* Logo */}
      <div onClick={() => navigate("/")} className="text-4xl font-extrabold text-black tracking-tight cursor-pointer">
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
          <ul className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg hidden group-hover:block">
            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Profile</li>
            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Settings</li>
            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Logout</li>
          </ul>
        </div>
      </div>
    </nav>
    
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row items-start justify-between">
      <Toaster />
      {/* Left Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-10 py-16 mt-24">
        <h1 className="text-4xl font-extrabold mb-6">
          Request Your Next Mock Interview
        </h1>
        <p className="text-lg mb-8">
          Get personalized mock interviews tailored to your job role, company
          style, and skills. Choose the type of interview that works best for
          you!
        </p>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold">Interview Styles</h3>
            <p className="text-sm">
              Product Based, Service Based, Startups, and more.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Job Roles</h3>
            <p className="text-sm">
              Frontend Developer, Backend Developer, Fullstack Development, App Development, Machine Learning, HR Interview, and  more.
            </p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center px-8 py-16">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Fill Out the Details
          </h2>
          <form className="space-y-6">
            {/* Job Role */}
            <div>
              <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                Job Role
              </label>
              <select
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" disabled>
                  Select a job role
                </option>
                <option value="frontend developer">Frontend Developer</option>
                <option value="backend developer">Backend Developer</option>
                <option value="fullstack developer">fullstack Developer</option>
                <option value="app developer">App Developer</option>
                <option value="machine learning">Machine Learning</option>
                <option value="hr interview">HR Interview</option>
              </select>
            </div>

            {/* Preferred Company Style */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Preferred Company Style
              </label>
              <div className="flex gap-4">
                {["Product Based", "Service Based", "Startups"].map((style) => (
                  <label key={style} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="companyType"
                      value={style}
                      onChange={handleChange}
                      required
                    />
                    {style}
                  </label>
                ))}
              </div>
            </div>
            

            {/* Upload Resume */}
            <div>
              <label htmlFor="resume" className="block text-gray-700 font-medium mb-2">
                Upload Resume
              </label>
              <input
                type="file"
                id="resume"
                name="resume"
                onChange={handleFileChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Interview Date */}
            <div>
              <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
                Interview Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Interview Time */}
            <div>
              <label htmlFor="time" className="block text-gray-700 font-medium mb-2">
                Interview Time
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="duration" className="block text-gray-700 font-medium mb-2">
                Duration (in minutes)
              </label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Additional Notes */}
            <div>
              <label htmlFor="notes" className="block text-gray-700 font-medium mb-2">
                Additional Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="4"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Enter any additional details..."
                
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-black text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-700 hover:scale-105 hover:shadow-lg transition duration-200"
              onClick={requestInterview}
            >
              Request Interview
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default InterviewRequest;
