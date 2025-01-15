import React from 'react'
import WebDev from '../imgs/website.png'
import AppDev from '../imgs/App.png'
import ML from '../imgs/Machine-learning.png'
import DSA from '../imgs/DSA.png'
import HR from '../imgs/HR.png'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  let specialityData = [
    {
      speciality: 'Web Development',
      image: WebDev
    },
    {
      speciality: 'App Development',
      image: AppDev
    },
    {
      speciality: 'Machine Learning',
      image: ML
    },
    {
      speciality: 'Data Structures & Algorithm',
      image: DSA
    },
    {
      speciality: 'HR Interview',
      image: HR
    }
  ]

  return (
    <div className='flex flex-col items-center gap-4 py-16 text-gray-800' id='speciality'>
      <h1 className='text-3xl font-medium'>Book by Speciality</h1>
      <p className='sm:w-1/3 text-center text-sm'>Easily book interviews tailored to your specific job role and connect with industry experts.</p>
      <div className='flex text-center sm:justify-center gap-10 pt-5 w-full overflow-scroll'>
        {specialityData.map((item, index)=>(
          <Link onClick={() => scrollTo(0,0)} className='flex flex-col item-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500' key={index} to={`/interviewers/${item.speciality}`}>
            <img className='w-14 sm:w-24 mb-2' src={item.image} alt="" />
            <p>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SpecialityMenu