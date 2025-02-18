import React from 'react'
import useAxiosPublic from '../../../Hooks/useAxiosPublic'
import { useQuery } from '@tanstack/react-query'
import useAuth from '../../../Hooks/useAuth'
import AdoptionRequestTable from '../../../Components/AdoptionRequestPetTable/AdoptionRequestTable';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';

function AdoptionRequest () {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic()
    const {data: adoptionRequest=[], refetch} = useQuery({
    queryKey:['adoptRequest', user?.email],
    queryFn: async ()=>{
        const res = await axiosPublic.get(`/adopt-pet/${user?.email}`)
        return res.data
    }
})


const handleAccept =async(petId, status, petName)=>{
  try {
    const res = await axiosPublic.patch(`/adopt-pet/${petId}`, {
      adopted: status 
    });  
    if (res.data.adoptPetCollectionResult.modifiedCount > 0) {
      refetch();
      toast.success(`${petName}'s adoption status updated successfully!`);
    } else {
      toast.error(`Failed to update ${petName}'s adoption status.`);
    }
  } catch (error) {
    toast.error('Error updating adoption status:', error);
  }
}
const handleReject = async(petId, status, petName)=>{
  try {
    const res = await axiosPublic.patch(`/adopt-pet/${petId}`, {
      adopted: status 
    });  
    if (res.data.adoptPetCollectionResult.modifiedCount > 0) {
      refetch();
      toast.error(`${petName}'s adoption status reject successfully!`);
    } else {
      toast.error(`Failed to reject ${petName}'s adoption status.`);
    }
  } catch (error) {
    toast.error('Error rejecting adoption status:', error);
  }
}
  return (
    <div className='w-11/12 mx-auto'>
     <h1 className="font-display font-bold text-2xl my-6">Adoption Request <span className='ml-1 bg-blue-200 p-2 font-medium text-xl rounded-full'>{adoptionRequest.length} Requests</span></h1>
     <div>
      <AdoptionRequestTable adoptionRequestPets={adoptionRequest} handleAccept={handleAccept} handleReject={handleReject} />
     </div>
    </div>
  )
}

export default AdoptionRequest