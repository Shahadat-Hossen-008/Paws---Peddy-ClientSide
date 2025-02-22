import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import CheckoutForm from "./CheckoutForm";


function DonationPayment({currentPet}) {
  
  const StripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
  return (
    <div>
      <h1 className="font-display font-semibold text-2xl my-4 text-center ">Donate for <span className="text-emerald-500">"{currentPet.petName}"</span></h1>
      <Elements stripe={StripePromise}>
        <CheckoutForm currentPet={currentPet} />
      </Elements>
    </div>
  );
}

export default DonationPayment;
