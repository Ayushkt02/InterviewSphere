import React from 'react';

const WhyUs = () => {
  const features = [
    {
      title: "Personalized Mock Interviews",
      description: "Tailored to your job role and preferred company style.",
      icon: "🎯",
    },
    {
      title: "Interactive Coding Environment",
      description: "Collaborate with interviewers using a real-time code editor.",
      icon: "💻",
    },
    {
      title: "Expert Interviewers",
      description: "Get feedback from professionals in your field.",
      icon: "🌟",
    },
    {
      title: "Comprehensive Features",
      description:
        "Video calls, chat, resume sharing, and live coding in one platform.",
      icon: "📋",
    },
  ];

  return (
    <section className="bg-white py-16" id='why'>
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Title and Description */}
        <div className="mb-12">
          <h2 className="text-3xl font-extrabold text-black mb-4">Why Us?</h2>
          <p className="text-lg text-gray-700">
            Discover why our platform is the perfect choice for honing your interview skills.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-lg transform transition-transform duration-300 bg-gradient-to-b from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 hover:scale-105 hover:shadow-lg"
            >
              <div className="text-4xl">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-black mt-4 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
