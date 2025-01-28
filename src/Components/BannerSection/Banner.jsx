import { Button } from "@mui/material";
import "../BannerSection/Banner.css";

function Banner() {
  return (
    <div className="min-h-screen photo flex flex-col justify-center items-start relative p-8">
      {/* Overlay for a dark gradient effect */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 p-5 max-w-4xl">
        {/* Main heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-white my-4 tracking-wide leading-tight text-left">
          Best Friend{" "}
          <span className="bg-red-500 p-2 m-2 rounded-full">With</span>{" "}
          <br className="mt-2"/>
          Happy Time!
        </h1>

        {/* Subtext */}
        <p className="py-6 text-lg text-white leading-relaxed text-left">
          A pet friend is more than just a companion; they are loyal, affectionate, 
          <br/>
          and a constant source of joy. Make every moment with your pet memorable.
        </p>

        {/* Button */}
        <Button variant="contained">Adopt Now</Button>
      </div>
    </div>
  );
}

export default Banner;
