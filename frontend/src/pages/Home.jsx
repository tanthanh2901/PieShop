import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import Recommend from '../components/Recommend'
import OurPolicy from '../components/OurPolicy'
import NewsLetterBox from '../components/NewsLetterBox'
const Home = () => {
  return (
      <div>
        
        <Hero />
        <LatestCollection />
        <Recommend />
        <OurPolicy />
        <NewsLetterBox />
      </div>
  )
}

export default Home
