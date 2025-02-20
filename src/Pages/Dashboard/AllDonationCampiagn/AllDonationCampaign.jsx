import React from "react";
import useDonationCampaigns from "../../../Hooks/useDonationCampaigns";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import AllDonationCampaignTable from "../../../Components/AllDonationCampaignTable/AllDonationCampaignTable";
import { Button } from "@mui/material";
import toast from "react-hot-toast";

function AllDonationCampaign() {
  const axiosSecure = useAxiosSecure();
  const [pets, refetch] = useDonationCampaigns();
  
  const handlePause = async (pet) => {
    const pause = pet.pause;
    try {
      // Wait for the patch request to complete before refetching
      await axiosSecure.patch(`/donation-campaign/AdminPause/${pet._id}`, {pause});
      // Refetch the data after successfully pausing the donation
      refetch();
    } catch (error) {
      toast.error("Error pausing the donation:", error);
    }
  };
  const handleDelete =async(petId)=>{
   try{
    const response = await axiosSecure.delete(`/donation-campaign/${petId}`)
    if (response.data.acknowledged) {
      toast.success('Donation campaign deleted successfully!');
      refetch();
    } else {
      toast.error('Failed to delete Donation campaign!');
    }
   }catch(error) {
    toast.error('Error deleting the pet.');
  }
  }
  const deleteConfirmation = (petId) => {
    toast((t) => (
      <div>
        <p className="font-poppins font-semibold my-2">Are you sure</p>
        <div className="flex items-center gap-2">
          <Button
            className="!bg-red-500"
            variant="contained"
            onClick={() => {
              handleDelete(petId, t.id);
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
  return (
    <div>
      <h1 className="text-2xl font-display my-10 mx-10">
        Total Donation Campaign: <span className='ml-1 bg-blue-200 p-2 font-medium text-xl rounded-full'>{pets.length}</span>
      </h1>
      <AllDonationCampaignTable donationPets={pets} handleDelete={deleteConfirmation} handlePause={handlePause} />
    </div>
  );
}

export default AllDonationCampaign;
