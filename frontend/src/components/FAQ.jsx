import React, { useState } from "react";

const FAQ = () => {
  const faqs = [
    {
      question: "What is the purpose of this platform?",
      answer:
        "Our platform helps candidates prepare for interviews with tailored mock interview sessions, coding challenges, and real-time collaboration with expert interviewers.",
    },
    {
      question: "How do I schedule a mock interview?",
      answer:
        "Simply sign up as a candidate, choose your job role and preferred interview style, and request a session. An expert interviewer will pick your request.",
    },
    {
      question: "What features are available in the interview environment?",
      answer:
        "The environment includes video calls, live chat, a collaborative code editor, resume sharing, and pair programming functionality.",
    },
    {
      question: "Can I join as both a candidate and an interviewer?",
      answer:
        "Yes, you can create separate profiles for each role and switch between them as needed.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-14" id="faq">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-extrabold text-black text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-300 pb-4 overflow-hidden"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full text-left flex justify-between items-center font-semibold text-lg text-black"
              >
                {faq.question}
                <span className="text-xl">
                  {activeIndex === index ? "-" : "+"}
                </span>
              </button>
              <div
                className={`transition-all duration-500 ease-in-out ${
                  activeIndex === index ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                }`}
                style={{ overflow: "hidden" }}
              >
                <p className="mt-4 text-gray-700">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
