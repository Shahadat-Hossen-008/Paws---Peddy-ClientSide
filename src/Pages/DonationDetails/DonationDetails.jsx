import { Card, CardContent, CardMedia, Typography, Button, LinearProgress, Modal, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Use useParams to get the id from the route
import DonationPayment from './DonationPayment';
import { compareDesc } from 'date-fns';
import toast from 'react-hot-toast';
import useDonationCampaigns from '../../Hooks/useDonationCampaigns';
import RandomDonationCard from '../../Components/RandomDonationCard/RandomDonationCard';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
  maxHeight: "90vh",
};

const DonationDetails = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [pets, refetch] = useDonationCampaigns(); 
  const [currentPet, setCurrentPet] = useState(null); 

  // Find the pet using the id from the params
  useEffect(() => {
    if (pets && id) {
      const foundPet = pets.find(pet => pet._id === id);
      setCurrentPet(foundPet);
    }
  }, [pets, id]);

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

  const donationPercentage = (donatedAmount / highestDonationAmount) * 100;

  const handleOpen = () => {
    if (compareDesc(new Date(), lastDateOfDonation) === -1) {
      return toast.error('Donation Time Over');
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    refetch(); 
  };

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
          <Typography variant="h3" className="!text-3xl !font-bold !mb-4 !font-display">
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
            disabled={pause || donatedAmount===highestDonationAmount}
            onClick={handleOpen}
            className="!bg-teal-500 !hover:bg-teal-600"
          >
           Donate Now
          </Button>
        </CardContent>
      </Card>

      {/* Modal for donation payment */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <DonationPayment currentPet={currentPet} />
        </Box>
      </Modal>
      <RandomDonationCard petId={_id}/>
    </div>
  );
};

export default DonationDetails;
