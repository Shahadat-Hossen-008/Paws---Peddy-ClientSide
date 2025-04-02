import { Button } from "@mui/material";
import "../BannerSection/Banner.css";
import { Link } from "react-router-dom";
import "../Shared.css"
function Banner() {
  return (
    <div className="min-h-screen photo flex flex-col justify-center items-start relative p-8">
      {/* Overlay for a dark gradient effect */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 md:p-5 md:max-w-4xl">
        {/* Main heading */}
        <h1 className="text-3xl md:text-5xl font-bold text-white md:my-4 tracking-wide leading-tight text-left">
          Best Friend{" "}
          <span className="bg-red-500 text-2xl p-2 md:text-5xl rounded-full">With</span>{" "}
          <br className="my-2"/>
          Happy Time!
        </h1>
        {/* Subtext */}
        <p className=" py-3 md:py-6 text-lg text-white leading-relaxed text-left">
          A pet friend is more than just a companion; they are loyal, affectionate, 
          <br/>
          and a constant source of joy. Make every moment with your pet memorable.
        </p>

        {/* Button */}
        <Link to={"petListing"}><Button variant="contained" className="custom-btn-primary">Adopt Now</Button></Link>
        
      </div>
    </div>
  );
}

export default Banner;
