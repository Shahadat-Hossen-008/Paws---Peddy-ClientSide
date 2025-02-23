import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import MyDonationTable from "../../../Components/MyDonationStatusTable/MyDonationTable";
import toast from "react-hot-toast";
import DynamicTitle from "../../../Dynamic Title/DynamicTitle";

function MyDonations() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [refundCompleted, setRefundCompleted] = useState(false);
  // Fetching pets added by the user
  const { data: myDonation = [], refetch } = useQuery({
    queryKey: ["myDonation", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });
  const handleRefund = (info) => {
    const donationAmount = info.donationAmount;
    const userId = info._id;
    axiosSecure
      .patch(`payments/Id/${info.petId}`, { donationAmount, userId })
      .then((res) => {
        
        const { result, updatedDoc } = res.data;
        if (result.modifiedCount > 0 && updatedDoc.modifiedCount > 0) {
          toast.success("Refund completed successfully");
          refetch();
          
        }
      })
      .catch((err) => {
        toast.error("Refund Error:", err);
      });
  };

  return (
    <div className="w-11/12 mx-auto mt-10">
    <DynamicTitle title={`My Donations | Paws & Tails`} />
      <h1 className="font-display font-bold text-2xl my-4">
        My list of donation{" "}
        <span className="ml-1 bg-blue-200 p-2 font-medium text-xl rounded-full">
          {myDonation?.length} pets
        </span>
      </h1>
      <MyDonationTable
        donators={myDonation}
        handleRefund={handleRefund}
        open={open}
      />
    </div>
  );
}

export default MyDonations;
