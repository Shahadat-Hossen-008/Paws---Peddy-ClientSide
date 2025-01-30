import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, LinearProgress } from '@mui/material';
import { useLoaderData } from 'react-router-dom';

const DonationDetails = () => {

  const {
    petName,
    petImage,
    highestDonationAmount,
    donatedAmount,
    lastDateOfDonation,
    shortDescription,
    longDescription,
    campaignCreatedDateTime,
  } = useLoaderData();

  const donationPercentage = (donatedAmount / highestDonationAmount) * 100;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="rounded-lg shadow-lg bg-white">
        <CardMedia
          component="img"
          image={petImage}
          alt={`${petName}`}
          className="h-96 object-cover rounded-t-lg"
        />
        <CardContent className="!p-6">
          <Typography variant="h3" className="!text-3xl !font-bold !mb-4 !font-display" >
            {petName}
          </Typography>
          <Typography variant="body1" className="!mb-4 !text-gray-600 !font-display">
            {shortDescription}
          </Typography>

          <Typography variant="h6" className="!font-bold !mb-2 !font-display">
            Campaign Details:
          </Typography>
          <Typography variant="body2" className="!mb-2 !text-gray-700 !font-display">
            Campaign Created: {campaignCreatedDateTime}
          </Typography>
          <Typography variant="body2" className="!mb-2 !text-gray-700 !font-display">
            Last Date of Donation: {lastDateOfDonation}
          </Typography>

          <Typography variant="body1" className="!my-4 !font-display">
            {longDescription}
          </Typography>

          <Typography variant="h6" className="!font-bold !mb-2 !font-display">
            Donation Progress:
          </Typography>
          <Typography variant="body2" className="!mb-2 !text-gray-700">
            Donated Amount: ${donatedAmount} / ${highestDonationAmount}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={donationPercentage}
            className="!h-2 !mb-4 !bg-gray-300 !rounded-lg"
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            className="!bg-teal-500 !hover:bg-teal-600"
          >
            Donate Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DonationDetails;
