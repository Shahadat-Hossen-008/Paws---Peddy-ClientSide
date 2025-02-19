import PetTable from "../../../Components/PetTable/PetTable";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";

function MyAddedPets() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Fetching pets added by the user
  const { data: myAddedPets = [], refetch } = useQuery({
    queryKey: ['myAddedPets', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-pets/email/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email 
  });

  const handleUpdate = (pet) => {
    navigate(`/dashboard/updatePetInfo/${pet._id}`);
  };

  const handleDelete = async (id) => {
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
        <p className="font-poppins font-semibold my-2">Are you sure?</p>
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

  const handleAdopt = async (pet) => {
    try {
      const res = await axiosSecure.patch(`/all-pets/${pet._id}`, {
        adopted: !pet.adopted
      });
      toast.success('Adoption status updated!');
      refetch(); 
    } catch (error) {
      toast.error('Error updating adoption status.');
    }
  };

  return (
    <div className="w-11/12 mx-auto mt-10">
      <h1 className="font-display font-bold text-2xl my-4">My Added Pets  <span className='ml-1 bg-blue-200 p-2 font-medium text-xl rounded-full'>{myAddedPets.length} pets</span></h1>
      <PetTable pets={myAddedPets} handleUpdate={handleUpdate} deleteConfirmation={deleteConfirmation} handleAdopt={handleAdopt} />
    </div>
  );
}

export default MyAddedPets;
