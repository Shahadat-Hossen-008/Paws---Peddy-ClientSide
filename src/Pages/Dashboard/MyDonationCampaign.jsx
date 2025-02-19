import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import MyDonationTable from "../../Components/MyDonationTable/MyDonationTable";
import React, { useState } from "react";

function MyDonationCampaign() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [open, setOpen] = useState(false);
  // Fetching pets added by the user
  const { data: myAddedDonation = [], refetch } = useQuery({
    queryKey: ["myAddedDonation", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/donation-user-campaign/${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handlePause = async (pet) => {
    try {
      // Wait for the patch request to complete before refetching
      await axiosSecure.patch(`/donation-campaign/pause/${pet._id}`);
      // Refetch the data after successfully pausing the donation
      refetch();
    } catch (error) {
      console.error("Error pausing the donation:", error);
    }
  };
  
  return (
    <div className="w-11/12 mx-auto mt-10">
      <h1 className="font-display font-bold text-2xl my-4">
        My Added Pets{" "}
        <span className="ml-1 bg-blue-200 p-2 font-medium text-xl rounded-full">
          {myAddedDonation.length} pets
        </span>
      </h1>
      <MyDonationTable
        donationPets={myAddedDonation}
        handlePause={handlePause}
        open={open}
      />
    </div>
  );
}

export default MyDonationCampaign;
