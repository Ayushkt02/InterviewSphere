// import React, { useState, useEffect } from "react";

// const testimonials = [
//   {
//     text: "This platform completely transformed my interview preparation! The mock interviews and coding challenges are top-notch.",
//     name: "John Doe",
//     designation: "Software Engineer at TechCorp"
//   },
//   {
//     text: "I loved the real-time collaboration tools! The pair programming feature is amazing.",
//     name: "Jane Smith",
//     designation: "Frontend Developer at WebX"
//   },
//   {
//     text: "As an interviewer, I found it easy to connect with candidates and provide meaningful feedback. Great platform!",
//     name: "Mike Johnson",
//     designation: "Interview Coach",
//   },
// ];

// const Testimonial = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isFading, setIsFading] = useState(false);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIsFading(true);
//       setTimeout(() => {
//         setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
//         setIsFading(false);
//       }, 500); // Fade-out duration
//     }, 5000); // Change testimonial every 5 seconds

//     return () => clearInterval(interval); // Cleanup on unmount
//   }, []);

//   const handleNavigation = (index) => {
//     setIsFading(true);
//     setTimeout(() => {
//       setCurrentIndex(index);
//       setIsFading(false);
//     }, 500); // Fade-out duration
//   };

//   return (
//     <section className="bg-gray-300 rounded-2xl py-16">
//       <div className="max-w-3xl mx-auto text-center px-6">
//         <div className="text-gray-400 text-6xl mb-4">“</div>
//         <div
//           className={`transition-opacity duration-500 ${
//             isFading ? "opacity-0" : "opacity-100"
//           }`}
//         >
//           <p className="text-lg font-medium text-gray-700">{testimonials[currentIndex].text}</p>
//           <div className="flex justify-center items-center gap-4 mt-6">
//             <div>
//               <h4 className="text-lg font-semibold text-gray-900">
//                 {testimonials[currentIndex].name}
//               </h4>
//               <p className="text-sm text-gray-500">{testimonials[currentIndex].designation}</p>
//             </div>
//           </div>
//         </div>
//         <div className="flex justify-center mt-6 space-x-2">
//           {testimonials.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => handleNavigation(index)}
//               className={`h-2 w-2 rounded-full ${
//                 currentIndex === index ? "bg-gray-800" : "bg-gray-400"
//               }`}
//             ></button>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Testimonial;


import React, { useState, useEffect } from "react";
import Background from '../imgs/testBack.webp'

const testimonials = [
  {
    text: "This platform completely transformed my interview preparation! The mock interviews and coding challenges are top-notch.",
    name: "John Doe",
    designation: "Software Engineer at TechCorp",
    photo: "https://via.placeholder.com/800", // Replace with actual photo URLs
  },
  {
    text: "I loved the real-time collaboration tools! The pair programming feature is amazing.",
    name: "Jane Smith",
    designation: "Frontend Developer at WebX",
    photo: "https://via.placeholder.com/800",
  },
  {
    text: "As an interviewer, I found it easy to connect with candidates and provide meaningful feedback. Great platform!",
    name: "Mike Johnson",
    designation: "Interview Coach",
    photo: "https://via.placeholder.com/800",
  },
];

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    < >
        <h2 id="testimonials" className="text-3xl font-extrabold text-black text-center mb-8 mt-7">
          Testimonials
        </h2>
    <section className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[60vh] overflow-hidden rounded-2xl">
      {testimonials.map((testimonial, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentIndex
              ? " opacity-100"
              : " opacity-0"
          }`}
          style={{
            backgroundImage: `url(${Background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative h-full flex flex-col justify-center items-center px-6 text-center text-white">
            <p className="text-2xl sm:text-3xl font-medium max-w-2xl mb-8">
              {testimonial.text}
            </p>
            <h4 className="text-xl sm:text-2xl font-bold">{testimonial.name}</h4>
            <p className="text-sm sm:text-lg font-light">{testimonial.designation}</p>
          </div>
        </div>
      ))}

      {/* Navigation dots */}
      <div className="absolute bottom-6 w-full flex justify-center space-x-3">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 w-3 rounded-full ${
              currentIndex === index ? "bg-white" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div>
    </section>
    </>
  );
};

export default Testimonial;
