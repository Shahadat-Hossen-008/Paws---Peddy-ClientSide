import React from "react";
import useDonationCampaigns from "../../Hooks/useDonationCampaigns";
import PetCard from "../../Components/DonationPetCard/PetCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function DonationCampaign() {
  const [pets] = useDonationCampaigns();

  return (
    <div className="w-11/12 mx-auto mt-10 font-display">
      <h1 class="text-4xl font-bold text-emerald-500 mb-4">
        Help Us Make a Difference, One Paw at a Time!
      </h1>
      <p class="text-lg text-cyan-200-200 mb-6">
        Your generosity can save countless animals in need. With your donation,
        we're able to provide food, shelter, and medical care to homeless pets.
        Join us in creating a brighter future for these loving animals and help
        them find their forever homes.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {pets.length === 0
          ? Array(10)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="col-span-full">
                  <Skeleton
                    count={20}
                    baseColor="#38b2ac"
                    highlightColor="#81e6d9"
                    height={30}
                    duration={1.2}
                    style={{ marginBottom: "20px", borderRadius: "8px" }}
                  />
                </div>
              ))
          : pets.map((pet) => <PetCard key={pet._id} pet={pet}></PetCard>)}
      </div>
    </div>
  );
}

export default DonationCampaign;
