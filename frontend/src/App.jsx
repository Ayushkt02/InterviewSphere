// import React, { createContext, useEffect, useState } from 'react'
// import { Route, Routes } from 'react-router-dom'
// import Navbar from './components/Navbar'
// import Home from './pages/Home'
// import ContactUs from './components/ContactUs'
// import UserAuthForm from './pages/CandidateAuth'
// import { lookInSession } from './common/session'
// import CandidateHome from './pages/CandidateHome'
// import InterviewRequest from './pages/InterviewRequest'
// import InterviewDetails from './pages/Interview'
// import ProfilePage from './pages/ProfilePage'
// import InterviewerAuth from './pages/InterviewerAuth'
// import InterviewerHome from './pages/InterviewerHome'

// export const UserContext = createContext({});
// export const InterviewerContext = createContext({});


// function App() {

//   const [userAuth, setUserAuth] = useState({});
//   const [interviewerAuth, setInterviewerAuth] = useState({});

//   useEffect(()=>{
//     let userInSession = lookInSession("user");
//     userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({ access_token: null });
//     let interviewerInSession = lookInSession("interviewer");
//     interviewerInSession ? setInterviewerAuth(JSON.parse(interviewerInSession)) : setInterviewerAuth({ access_token: null });
//   }, [])

//   return (
//     <>
//     <UserContext.Provider value={{userAuth, setUserAuth}}>
//       <Routes>
//           <Route path='/' element={<Home/>}/>
//           <Route path='/contactus' element={<ContactUs/>}/>
//           <Route path="/join-candidate/signin" element={<UserAuthForm type="signin" />}/>
//           <Route path="/join-candidate/signup" element={<UserAuthForm type="signup" />}/>
//           <Route path="/Candidate/Home" element={<CandidateHome />}/>
//           <Route path="/Candidate/Interview-request" element={<InterviewRequest />}/>
//           <Route path="interview/:interview_id" element={<InterviewDetails/>}/>
//           <Route path="Candidate/:id" element={<ProfilePage/>}/>
//       </Routes>
//     </UserContext.Provider>
//     <InterviewerContext.Provider value={{interviewerAuth, setInterviewerAuth}}>
//       <Routes>
//         <Route path="/join-interviewer/signin" element={<InterviewerAuth type="signin" />}/>
//         <Route path="/join-interviewer/signup" element={<InterviewerAuth type="signup" />}/>
//         <Route path="/interviewer/Home" element={<InterviewerHome />}/>
//       </Routes>
//     </InterviewerContext.Provider>
//     </>
//   )
// }

// export default App

import React, { createContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ContactUs from './components/ContactUs';
import UserAuthForm from './pages/CandidateAuth';
import CandidateHome from './pages/CandidateHome';
import InterviewRequest from './pages/InterviewRequest';
import InterviewDetails from './pages/Interview';
import ProfilePage from './pages/ProfilePage';
import InterviewerAuth from './pages/InterviewerAuth';
import InterviewerHome from './pages/InterviewerHome';
import { lookInSession } from './common/session';
import FeedbackPage from './pages/Feedback';
import EditProfile from './pages/EditProfile';

export const UserContext = createContext({});
export const InterviewerContext = createContext({});

function App() {
  const [userAuth, setUserAuth] = useState({});
  const [interviewerAuth, setInterviewerAuth] = useState({});

  useEffect(() => {
    const userInSession = lookInSession("user");
    userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({ access_token: null });
    const interviewerInSession = lookInSession("interviewer");
    interviewerInSession ? setInterviewerAuth(JSON.parse(interviewerInSession)) : setInterviewerAuth({ access_token: null });
  }, []);

  return (
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
      <InterviewerContext.Provider value={{ interviewerAuth, setInterviewerAuth }}>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/join-candidate/signin" element={<UserAuthForm type="signin" />} />
          <Route path="/join-candidate/signup" element={<UserAuthForm type="signup" />} />
          <Route path="/Candidate/Home" element={<CandidateHome />} />
          <Route path="/Candidate/Interview-request" element={<InterviewRequest />} />
          <Route path="interview/:interview_id" element={<InterviewDetails />} />
          <Route path="/provide-feedback/:interview_id" element={<FeedbackPage />} />
          <Route path="/:id" element={<ProfilePage />} />
          <Route path="/join-interviewer/signin" element={<InterviewerAuth type="signin" />} />
          <Route path="/join-interviewer/signup" element={<InterviewerAuth type="signup" />} />
          <Route path="/interviewer/Home" element={<InterviewerHome />} />
          <Route path="/edit-interviewer-profile" element={<EditProfile />} />
          <Route path="/edit-candidate-profile" element={<EditProfile />} />
        </Routes>
      </InterviewerContext.Provider>
    </UserContext.Provider>
  );
}

export default App;