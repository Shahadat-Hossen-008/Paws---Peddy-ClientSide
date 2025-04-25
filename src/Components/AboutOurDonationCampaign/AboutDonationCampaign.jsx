import image1 from "../../assets/dog-rescue.jpg"
import image2 from "../../assets/dog2-rescue.jpg"
import image3 from "../../assets/cat-rescue.jpg"
import image4 from "../../assets/cat-2-rescue.jpg"
import { Link } from "react-router-dom"
import { Button } from "@mui/material"
function AboutDonationCampaign () {
  return (
   <div className="w-10/12 mx-auto my-10 md:my-20">
     <h2 className="text-xl md:text-3xl font-display font-bold text-center md:my-8 my-2">Support Beyond Adoption</h2>
    <div className="grid grid-cols-1 md:grid-cols-2">
    <div className="flex justify-center flex-col">
        <p className="mb-4"> Your donations help us provide food, shelter, and medical care to rescued pets. Every contribution brings us closer to giving them a second chance at life.</p>
        <p className="mb-6">Want to get involved more? Join our volunteer program or sponsor a pet! We believe everyone can make a difference in a pet's life.</p>
        <Link to={"donationCampaign"}>
          <Button variant="contained" className="!bg-teal-500">
            More Donation
          </Button>
        </Link>
    </div>
    <div className="flex flex-wrap gap-1">
    <img src={image1} alt="Rescued dog" className="rounded-lg shadow-lg object-cover w-[250px]" />
      <img src={image2} alt="Volunteers caring" className="rounded-lg shadow-lg object-cover w-[250px]" />
      <img src={image3} alt="Medical help for pet" className="rounded-lg shadow-lg object-cover w-[250px]" />
      <img src={image4} alt="Rescued pet" className="rounded-lg shadow-lg object-cover w-[250px]" />
    </div>
    </div>
   </div>
  )
}

export default AboutDonationCampaign