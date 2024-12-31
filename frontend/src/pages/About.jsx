import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={"US"} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img src={assets.about_img} alt="" className='w-full md:max-w-[450px]'/>
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Our journey at Forever Pies began with a passion for baking and a desire to revolutionize the way people enjoy pies. From our humble beginnings, we've grown into a beloved bakery dedicated to providing delicious, high-quality pies for every occasion.</p>
          <p>Since day one, we've worked tirelessly to create a diverse selection of pies that cater to every taste and preference. From classic apple and cherry pies to unique seasonal creations, we offer an extensive collection made from the finest ingredients.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Our mission at Forever Pies is to empower our customers with delightful choices, convenience, and confidence. We're dedicated to providing a seamless pie experience that exceeds expectations, from ordering to delivery and every bite in between.</p>
        </div>
      </div>
      <div className=' text-xl py-4'>
        <Title text1={'WHY'} text2={"CHOOSE US"} />
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className=''>We handpick the finest ingredients to craft each pie, ensuring top-tier quality in every bite.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className=''>Our straightforward ordering system and quick delivery make enjoying our pies easy and stress-free.</p>
        </div><div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className=''>Our friendly team is dedicated to ensuring your satisfaction, providing exceptional support with every purchase.</p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  )
}

export default About
