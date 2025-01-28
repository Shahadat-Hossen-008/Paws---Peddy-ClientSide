import React from "react";
import loading from "../assets/Lottie/Loading.json";
import Lottie from "lottie-react";
function Loading() {
  return (
    <div className="flex justify-center items-center">
      <Lottie
        animationData={loading}
        className="w-32"
      ></Lottie>
    </div>
  );
}

export default Loading;
