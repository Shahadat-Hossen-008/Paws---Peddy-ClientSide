import React from 'react'
import useDonationCampaigns from '../../Hooks/useDonationCampaigns'
import PetCard from '../../Components/DonationPetCard/PetCard';

function DonationCampaign () {
    const [pets] = useDonationCampaigns()
    console.log(pets);
    
  return (
    <div className='w-11/12 mx-auto mt-10'>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
       {pets.map(pet=><PetCard key={pet._id} pet={pet}></PetCard>)}
    </div>
    </div>
  )
}

export default DonationCampaign