import PetTable from "../../../Components/PetTable/PetTable";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import UseFetch from "../../../Hooks/UseFetch";
import toast from "react-hot-toast";
import { Button } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
function MyAddedPets () {
    const[pets, usersPets, refetch] = UseFetch()
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure();
    const handleUpdate = (pet) => {
        console.log('Update Pet:', pet);
        navigate(`/dashboard/updatePetInfo/${pet._id}`)
      };
    
      const handleDelete =  async(id) => {
       const res = await axiosSecure.delete(`/all-pets/${id}`)
       try {
        const response = await axiosSecure.delete(`/all-pets/${id}`);
        if (response.status === 200 || response.status === 204) {
          toast.success('Pet deleted successfully!');
          refetch();
        } else {
          toast.error('Failed to delete pet!');
        }
      } catch (error) {
        toast.error('Error deleting the pet.');
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
                  handleDelete(pet._id);
                  toast.dismiss(t.id);
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
      const handleAdopt = async(pet) => {
        const res = await axiosSecure.patch(`/all-pets/${pet._id}`)
        refetch()
        console.log('Toggle Adopt:', res.data);
        
        // Adopt logic here
      };
  return (
    <div className="w-11/12 mx-auto mt-10">
    <h1 className="font-display font-bold text-3xl my-4">My Added Pets</h1>
    <PetTable pets={usersPets} handleUpdate={handleUpdate} deleteConfirmation={deleteConfirmation} handleAdopt={handleAdopt} />
    </div>
  )
}

export default MyAddedPets