import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

function CheckoutForm({ currentPet }) {
  const {
    _id,
    petName,
    petImage,
    highestDonationAmount,
    donatedAmount,
    lastDateOfDonation,
    shortDescription,
    longDescription,
    campaignCreatedDateTime,
    pause
  } = currentPet || {};
  
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [error, setError] = useState('');
  const [donationAmount, setDonationAmount] = useState(0); 
  const [isInvalidAmount, setIsInvalidAmount] = useState(false); 

  const stripe = useStripe();
  const elements = useElements();

  const maxAllowedDonation = highestDonationAmount - donatedAmount;

  // useEffect to fetch clientSecret on render and when donationAmount changes
  useEffect(() => {
    if (donationAmount > 0 && donationAmount <= maxAllowedDonation) {
      // Create payment intent when donation amount is set and valid
      axiosSecure.post('/create-payment-intent', { amount: donationAmount })
        .then((response) => {
          const clientSecret = response.data.clientSecret;
          if (clientSecret) {
            setClientSecret(clientSecret);
          } else {
            setError('Failed to create payment intent.');
          }
        })
        .catch((error) => {
          setError('Failed to create payment intent.');
        });
    }
  }, [axiosSecure, donationAmount, maxAllowedDonation]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || !clientSecret) {
      setError('Stripe or elements not loaded or clientSecret missing');
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setError('Card element not found');
      return;
    }

    // Create payment method
    const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
      billing_details: {
        name: user?.displayName || 'anonymous name',
        email: user?.email || 'anonymous email',
      },
    });

    if (paymentError) {
      setError(paymentError.message);
    } else {
      setError('');
      const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });
     
      if (intentError) {
        setError(intentError.message);
      } else {
        setTransactionId(paymentIntent.id);
        toast.success(`Thank you for donating $${donationAmount} for ${petName}!`);
        // now save the info in the database
        const donationInfo = {
          petName: petName,
          petId: _id,
          petImage: petImage,
          transactionId: paymentIntent.id,
          donatorName: user?.displayName,
          donatorEmail: user?.email,
          donationAmount: parseInt(donationAmount),
          donationDate: format(new Date(), 'P'),
        };
        const res = await axiosSecure.post('/payments', donationInfo);
      }
    }
  };

  const handleDonationChange = (e) => {
    const amount = parseInt(e.target.value);
    setDonationAmount(amount);

    // Validate the entered donation amount
    if (amount > maxAllowedDonation) {
      setIsInvalidAmount(true);
      setError(`Donation amount cannot exceed the remaining amount of $${maxAllowedDonation}`);
    } else {
      setIsInvalidAmount(false);
      setError(''); 
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full">
        <TextField
          name="donationAmount"
          type="number"
          helperText={`Please enter the donation amount. Maximum allowed: $${maxAllowedDonation}`}
          id="donation-amount-input"
          fullWidth
          label="Donation Amount"
          onChange={handleDonationChange}
          error={isInvalidAmount}
        />
      </div>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <Button
        variant="outlined"
        fullWidth
        type="submit"
        disabled={!stripe || !clientSecret || isInvalidAmount }  
        className="!my-2"
      >
        Donate Now
      </Button>
      <p className="text-red-500">{error}</p>
      {transactionId && <p className="my-5">Your Transaction ID: <span className="text-green-500"> {transactionId}</span></p>}
    </form>
  );
}

export default CheckoutForm;
