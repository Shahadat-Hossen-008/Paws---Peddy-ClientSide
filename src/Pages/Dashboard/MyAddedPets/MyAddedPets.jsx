import PetTable from "../../../Components/PetTable/PetTable";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import UseFetch from "../../../Hooks/UseFetch";
import toast from "react-hot-toast";
import { Button } from '@mui/material';
function MyAddedPets () {
    const {user} = useAuth();
    const[pets, setPets] = UseFetch()
    const axiosSecure = useAxiosSecure();
    const myPets = pets.filter(pet => pet.user_Email === user?.email)
    console.log(myPets);
    
    const handleUpdate = (pet) => {
        console.log('Update Pet:', pet);
        // Update logic here
      };
    
      const handleDelete =  async(id) => {
       const res = await axiosSecure.delete(`/all-pets/${id}`)
       try {
        const response = await axiosSecure.delete(`/all-pets/${id}`);
        if (response.status === 200 || response.status === 204) {
          toast.success('Pet deleted successfully!');
          setPets(pets.filter(pet => pet._id !== id));
        } else {
          toast.error('Failed to delete pet!');
        }
      } catch (error) {
        toast.error('Error deleting the pet.');
        console.error('Delete Error:', error);
      }
      };
      const deleteConfirmation = (pet) => {
        toast((t) => (
          <div>
            <p className="font-poppins font-semibold my-2">Are you sure</p>
            <div className="flex items-center gap-2">
              <Button
                className="!bg-red-500"
                variant="contained"
                onClick={() => {
                  toast.dismiss(t.id);
                  console.log(pet._id)
                  handleDelete(pet._id);
                }}
              >
                Delete
              </Button>
              <Button
                className="!bg-green-500"
                variant="contained"
                onClick={() => toast.dismiss(t.id)}
              >
                Cancel
              </Button>
            </div>
          </div>
        ));
      };
      const handleAdopt = (pet) => {
        console.log('Toggle Adopt:', pet);
        // Adopt logic here
      };
  return (
    <div className="w-11/12 mx-auto mt-10">
    <h1 className="font-display font-bold text-3xl my-4">My Added Pets</h1>
    <PetTable pets={myPets} handleUpdate={handleUpdate} deleteConfirmation={deleteConfirmation} handleAdopt={handleAdopt} />
    </div>
  )
}

export default MyAddedPets