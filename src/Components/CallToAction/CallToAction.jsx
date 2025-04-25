import { Button } from "@mui/material";
import image from "../../assets/Adopt.jpg"
import '../Shared.css'
import { Link } from "react-router-dom";
function CallToAction () {
    return (
        <section className="w-full my-8 md:my-20 ">
         <h2 className="text-2xl md:text-4xl font-display font-bold text-center md:my-4 my-2">
         Adopt a Pet & Change a Life!
        </h2>
          {/* Content */}
         <div className="flex flex-col md:flex-row items-center justify-between max-w-3xl mx-auto md:mt-10">
         <div className="px-6">
            <p className="md:text-lg mt-4 text-left">
            Every pet deserves a chance at a happy and loving home. Right now, countless cats and dogs are waiting for someone like you to give them warmth, care, and a second chance at life. By adopting, you're not just changing their world—you’re gaining a loyal companion who will bring endless love and joy into your life. Open your heart, take the first step, and make a difference today!
            </p>
    
            {/* CTA Buttons */}
            <div className="my-6 gap-4">
              <Link to={"petListing"}><Button variant="contained" className="custom-btn-primary">Adopt Now</Button></Link>
            </div>
           
          </div>
          {/* image */}
          <img src={image} className="w-80 object-cover" />
         </div>
        </section>
      );
    }

export default CallToAction