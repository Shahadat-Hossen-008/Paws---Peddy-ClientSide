import { Button, TextField } from '@mui/material';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import toast from 'react-hot-toast';
import {  format } from 'date-fns';


function CheckoutForm({ petName, petId, handleClose }) {
  const axiosSecure = useAxiosSecure();
  
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [error, setError] = useState('');
  const [donationAmount, setDonationAmount] = useState(0); 
 
  const stripe = useStripe();
  const elements = useElements();

  // useEffect to fetch clientSecret on render and when donationAmount changes
  useEffect(() => {
    if (donationAmount > 0) {
      // Create payment intent when donation amount is set and greater than 0
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
  }, [axiosSecure, donationAmount]);

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
        console.log("Inside paymentIntent", paymentIntent)
        setTransactionId(paymentIntent.id);
        toast.success(`Thank you for donating $${donationAmount} for ${petName}!`);
        // now save the info in the database
        const donationInfo = {
          petName: petName,
          petId: petId,
          transactionId: paymentIntent.id,
          donatorName: user?.displayName,
          donatorEmail: user?.email,
          donationAmount: parseInt(donationAmount),
          donationDate : format(new Date(), 'P')
        }
        const res = await axiosSecure.post('/payments', donationInfo)
        console.log("payment saved", res.data);
      
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full">
        <TextField
          name="donationAmount"
          type="number"
          helperText="Please enter the donation amount first"
          id="donation-amount-input"
          fullWidth
          label="Donation Amount"
          onChange={(e) => setDonationAmount(e.target.value)} 
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
        variant='outlined'
        fullWidth
        type="submit"
        disabled={!stripe || !clientSecret}  
        className='!my-2'
      >
        Donate Now
      </Button>
      <p className='text-red-500'>{error}</p>
      {transactionId && <p className='my-5'>Your Transaction ID: <span className='text-green-500'> {transactionId}</span></p>}
    </form>
  );
}

export default CheckoutForm;
