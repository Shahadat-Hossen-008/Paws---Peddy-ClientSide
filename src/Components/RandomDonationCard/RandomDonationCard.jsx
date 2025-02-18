import React, { useEffect, useState } from 'react'
import useDonationCampaigns from '../../Hooks/useDonationCampaigns';
import PetCard from '../DonationPetCard/PetCard';

function RandomDonationCard ({petId}) {
    const [pets] = useDonationCampaigns();
    const [randomPets, setRandomPets] = useState([]);
  
     // Function to get a random selection of pets
     
  const getRandomPets = () => {
    const filteredPets = pets.filter(pet => pet._id !== petId); 
    const shuffledPets = [...filteredPets].sort(() => 0.5 - Math.random());
    return shuffledPets.slice(0, 3); 
  };
  
    useEffect(() => {
      if (pets.length) {
        setRandomPets(getRandomPets()); 
      }
    }, [pets, petId]);
  
  return (
    <div className='w-11/12 mx-auto mt-10'>
    <h2 className="text-xl font-semibold mb-6 font-display">Recommended Donation Campaigns</h2>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
      {randomPets.length > 0 && randomPets.map(pet => (
        <PetCard key={pet._id} pet={pet} />
      ))}
    </div>
  </div>
  )
}

export default RandomDonationCard