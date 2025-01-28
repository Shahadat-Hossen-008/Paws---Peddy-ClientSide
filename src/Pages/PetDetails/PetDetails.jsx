import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from "@mui/material";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";

function PetDetails() {
  const { image, name, age, location, shortDescription, longDescription } =
    useLoaderData();

  return (
    <div className="min-h-screen bg-base-100 p-6 flex justify-center items-center ">
      <Card className="shadow-lg rounded-2xl w-full max-w-4xl overflow-hidden bg-white">
        <Grid container>
          {/* Pet Image Section */}
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              height="100%"
              image={image}
              alt={name}
              className="w-full object-cover h-full"
            />
          </Grid>

          {/* Pet Details Section */}
          <Grid item xs={12} md={6}>
            <CardContent className="p-8 !flex !flex-col !justify-center">
              <Typography
                variant="h4"
                component="div"
                className="!font-bold !text-3xl !mb-2 !font-display"
              >
                {name}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                className="!text-lg !text-gray-700 !mb-2 !font-display"
              >
                Age: {age} years
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                className="!flex !items-center !text-gray-700 !mb-2"
              >
                <FaMapMarkerAlt className="!mr-2" />
                Location: {location}
              </Typography>
              {/* Short Description */}
              <Typography
                variant="body1"
                className="!text-gray-600 mt-4 !font-semibold !font-display"
              >
                {shortDescription}
              </Typography>

              {/* Long Description */}
              <Typography
                variant="body2"
                className="!text-gray-600 !mt-4 !leading-relaxed !font-display"
              >
                {longDescription}
              </Typography>

              {/* Adopt Button */}
              <Button
                variant="contained"
                className="!bg-green-500 hover:!bg-green-600 !mt-6 !font-display"
                onClick={() =>
                  document.getElementById("my_modal_5").showModal()
                }
              >
                Adopt {name}
              </Button>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default PetDetails;
