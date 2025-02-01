import React, { createContext, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ContactUs from './components/ContactUs'
import UserAuthForm from './pages/CandidateAuth'
import { lookInSession } from './common/session'
import CandidateHome from './pages/CandidateHome'
import InterviewRequest from './pages/InterviewRequest'
import InterviewDetails from './pages/Interview'
import ProfilePage from './pages/ProfilePage'

export const UserContext = createContext({});

function App() {

  const [userAuth, setUserAuth] = useState({});

  useEffect(()=>{
    let userInSession = lookInSession("user");
    userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({ access_token: null });
  }, [])

  return (
    <UserContext.Provider value={{userAuth, setUserAuth}}>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/contactus' element={<ContactUs/>}/>
          <Route path="/join-candidate/signin" element={<UserAuthForm type="signin" />}/>
          <Route path="/join-candidate/signup" element={<UserAuthForm type="signup" />}/>
          <Route path="/Candidate/Home" element={<CandidateHome />}/>
          <Route path="/Candidate/Interview-request" element={<InterviewRequest />}/>
          <Route path="interview/:interview_id" element={<InterviewDetails/>}/>
          <Route path="Candidate/:id" element={<ProfilePage/>}/>
      </Routes>
    </UserContext.Provider>
  )
}

export default App