import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, LinearProgress } from '@mui/material';
import { Link } from 'react-router-dom';

const PetCard = ({ pet }) => {
  const { petName, petImage, highestDonationAmount, donatedAmount, _id } = pet;
  const donationPercentage = (donatedAmount / highestDonationAmount) * 100;

  return (
    <Card className="!rounded-lg !shadow-md !p-4 !max-w-xs !bg-white">
      <CardMedia
        component="img"
        image={petImage}
        alt={`${petName}`}
        className="h-48 object-cover rounded-md"
      />
      <CardContent>
        <Typography variant="h5" className="!text-xl !font-display !font-bold !mb-2">
          {petName}
        </Typography>
        <Typography variant="body2" className="!text-gray-600 !mb-2">
          Maximum Donation: ${highestDonationAmount}
        </Typography>
        <Typography variant="body2" className="!text-gray-600 !mb-4">
          Donated Amount: ${donatedAmount}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={donationPercentage}
          className="!h-2 !mb-4 !bg-gray-300 !rounded-lg"
        />
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={`/pets/${petName}`}
          className="w-full !bg-blue-500 !hover:bg-blue-600"
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default PetCard;
