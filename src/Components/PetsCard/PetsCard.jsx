import React from 'react';
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';

function PetsCard({ pet }) {
  const { image, name, age, location, _id } = pet  || {};

  return (
    <Card className="shadow-lg rounded-2xl overflow-hidden m-4 bg-base-100">
      <CardMedia
        component="img"
        height="200"
        image={image}
        alt={name}
        className="w-full object-cover"
      />
      <CardContent className="flex flex-col items-start p-4">
        <Typography gutterBottom variant="h5" component="div" className="font-bold text-lg">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="text-gray-600 mb-2">
          Age: {age}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="flex items-center text-gray-600">
          <FaMapMarkerAlt className="mr-2" />
          {location}
        </Typography>
        <div className="mt-4">
          <Link to={`/petListing/${_id}`}>
            <Button variant="contained" className="!bg-blue-500 hover:!bg-blue-700">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default PetsCard;
