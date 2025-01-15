import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ContactUs from './components/ContactUs'
import UserAuth from './pages/CandidateAuth'
import UserAuthForm from './pages/CandidateAuth'

function App() {
  return (
    <div>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/contactus' element={<ContactUs/>}/>
          <Route path="/signin" element={<UserAuthForm type="signin" />}/>
          <Route path="/signup" element={<UserAuthForm type="signup" />}/>
      </Routes>
    </div>
  )
}

export default App