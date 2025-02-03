import PetTable from "../../../Components/PetTable/PetTable";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import UseFetch from "../../../Hooks/UseFetch";

function MyAddedPets () {
    const {user} = useAuth();
    const[pets] = UseFetch()
    const axiosSecure = useAxiosSecure();
    const myPets = pets.filter(pet => pet.user_Email === user?.email)
    console.log(myPets);
    
    const handleUpdate = (pet) => {
        console.log('Update Pet:', pet);
        // Update logic here
      };
    
      const handleDelete = (pet) => {
        axiosSecure.delete(`/all-pets/${pet._id}`)
      };
    
      const handleAdopt = (pet) => {
        console.log('Toggle Adopt:', pet);
        // Adopt logic here
      };
  return (
    <div className="w-11/12 mx-auto mt-10">
    <h1 className="font-display font-bold text-3xl my-4">My Added Pets</h1>
    <PetTable pets={myPets} handleUpdate={handleUpdate} handleDelete={handleDelete} handleAdopt={handleAdopt} />
    </div>
  )
}

export default MyAddedPets