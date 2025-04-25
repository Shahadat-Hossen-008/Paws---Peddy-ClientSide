import React from 'react'
import Banner from '../../Components/BannerSection/Banner'
import Category from '../../Components/AllCategory/Category'
import CallToAction from '../../Components/CallToAction/CallToAction'
import HappyClients from '../../Components/HappyClients/HappyClients'
import LimitedPetsHome from '../../Components/LimitedPetsHome/LimitedPetsHome'
import LimitedDonationPets from '../../Components/LimitedDonationPets/LimitedDonationPets'
import AboutDonationCampaign from '../../Components/AboutOurDonationCampaign/AboutDonationCampaign'


function Home () {
  return (
    <div>
    <Banner></Banner>
    <Category></Category>
    <LimitedPetsHome/>
    <CallToAction/>
    <AboutDonationCampaign/>
    <LimitedDonationPets/>
    <HappyClients/>
    </div>
  )
}

export default Home