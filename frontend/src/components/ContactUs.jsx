import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send to email API)
    console.log(formData);
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };
  return (
    <>
    <div className='flex pt-7 pl-7 pb-4 items-center bg-gray-300'>
      <NavLink to={'/'}>
        <div className="text-4xl font-extrabold text-black tracking-tight cursor-pointer">
          <span className="text-black">Interview</span><span className="text-gray-500">Sphare</span>
        </div>
      </NavLink>
    </div>
    <div className='bg-gray-300 pt-7'>
      <div className="min-h-screen flex flex-col md:flex-row items-center justify-center px-6">
        {/* Left Section */}
        <div className="flex-1 max-w-lg text-center md:text-left md:pr-10 pb-7">
          <h1 className="text-4xl font-bold mb-4">Talk to us 🗣️</h1>
          <p className="text-lg text-gray-700">
            Whether you need more info about our product, are curious about our company, or just want
            to share some feedback, we want to hear from you. The easiest way to reach us is by filling
            out this form, and we'll get back to you!
          </p>
        </div>

        {/* Right Section */}
        <div className="flex-1 max-w-md bg-gray-100 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-center mb-6">Let’s talk!</h2>
          <form onSubmit={handleSubmit}>
             <div className="mb-4">
              <label htmlFor="name" className="text-lg text-gray-700">Your Name</label>
               <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="text-lg text-gray-700">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="text-lg text-gray-700">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                required
              />
            </div>
            <button type="submit" className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-700 hover:scale-105 hover:shadow-lg transition duration-200">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default ContactUs;
