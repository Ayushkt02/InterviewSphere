import React from 'react'

const About = () => {
  return (
    <section id='about' className="py-14 bg-gray-100 rounded-2xl mb-7">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-extrabold text-black mb-6">About Us</h2>
            <p className="text-lg text-gray-700 mb-8">
            Our platform is designed to help candidates prepare for real-world job interviews through tailored mock sessions with industry experts.
            </p>
            <ul className="list-disc text-left mx-auto max-w-xl space-y-4 text-gray-700">
            <li>Personalized mock interviews based on job role and company style</li>
            <li>Live coding sessions with real-time collaboration</li>
            <li>Experienced interviewers to guide you through the process</li>
            <li>Video call and screen sharing functionalities for a complete interview experience</li>
            </ul>
        </div>
    </section>
  )
}

export default About