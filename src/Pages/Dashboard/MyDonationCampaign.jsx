import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import MyDonationTable from "../../Components/MyDonationTable/MyDonationTable";

function MyDonationCampaign() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

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
console.log(myAddedDonation);
const handleUpdate = (petId)=>{
  console.log("Inside PetId", petId);
  
}
const handlePause= (pet) =>{
  console.log("Inside Pet pause", pet);
  
}
const handleView = (pet)=>{
  console.log("Inside handle view", pet);
  
}
  return (
    <div className="w-11/12 mx-auto mt-10">
      <h1 className="font-display font-bold text-2xl my-4">
        My Added Pets{" "}
        <span className="ml-1 bg-blue-200 p-2 font-medium text-xl rounded-full">
          {myAddedDonation.length} pets
        </span>
      </h1>
      <MyDonationTable donationPets={myAddedDonation} handleUpdate={handleUpdate} handlePause={handlePause} handleView={handleView} />
    </div>
  );
}

export default MyDonationCampaign;
