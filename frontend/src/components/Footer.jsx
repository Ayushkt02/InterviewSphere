import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="container w-[90%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h4 className="text-lg font-semibold text-white">About Us</h4>
          <p className="mt-2">
            InterviewSphere is your trusted platform for scheduling and conducting
            interviews with industry specialists. 
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-white">Quick Links</h4>
          <ul className="mt-2 space-y-2">
            <li><a href='/' className="hover:underline">Home</a></li>
            <li><a href="#why" className="hover:underline">Features</a></li>
            <li><a className="hover:underline">Privacy Policy</a></li>
            <li><a href="/contactus" className="hover:underline">Contact Us</a></li>
          </ul>
        </div>

        {/* Social & Contact */}
        <div>
          <h4 className="text-lg font-semibold text-white">Connect With Us</h4>
          <div className="mt-2 flex space-x-4">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-linkedin"></i></a>
          </div>
          <p className="mt-4 text-sm">Email: support@interviewsphere.com</p>
        </div>
      </div>
      <div className="text-center mt-8 border-t border-gray-600 pt-4">
        © 2025 InterviewSphere. All rights reserved.
      </div>
    </footer>

  );
}

export default Footer;