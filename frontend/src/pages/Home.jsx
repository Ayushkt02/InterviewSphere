import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import Navbar from '../components/Navbar'
import WhyUs from '../components/WhyUs'
import FAQ from '../components/FAQ'
import About from '../components/About'
import ContactUs from '../components/ContactUs'
import Footer from '../components/Footer'
import Testimonial from '../components/Testimonial'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <div className='m-auto w-[85%] mt-4'>
        <Header/>
        <WhyUs/>
        <Testimonial/>
        <About/>
        <FAQ/>
      </div>
      <Footer/>
    </div>
  )
}

export default Home