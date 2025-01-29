import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Modal,
  Box,
} from "@mui/material";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";
import AdoptPetsForm from "../AdoptPetForm/AdoptPetsForm";
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
function PetDetails() {
  const pet = useLoaderData();
  const [open, setOpen] = useState(false);
  const [selectedPets,setSelectedPets] = useState(null);
  const handleOpen = (review) => {
   setSelectedPets(review);
    setOpen(true);
  };
  const handleClose = () => {
    setSelectedPets(null);
    setOpen(false);
  };
  return (
    <div className="min-h-screen bg-base-100 p-6 flex justify-center items-center ">
      <Card className="shadow-lg rounded-2xl w-full max-w-4xl overflow-hidden bg-white">
        <Grid container>
          {/* Pet Image Section */}
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              height="100%"
              image={pet.image}
              alt={pet.name}
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
                {pet.name}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                className="!text-lg !text-gray-700 !mb-2 !font-display"
              >
                Age: {pet.age} years
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                className="!flex !items-center !text-gray-700 !mb-2"
              >
                <FaMapMarkerAlt className="!mr-2" />
                Location: {pet.location}
              </Typography>
              {/* Short Description */}
              <Typography
                variant="body1"
                className="!text-gray-600 mt-4 !font-semibold !font-display"
              >
                {pet.shortDescription}
              </Typography>

              {/* Long Description */}
              <Typography
                variant="body2"
                className="!text-gray-600 !mt-4 !leading-relaxed !font-display"
              >
                {pet.longDescription}
              </Typography>

              {/* Adopt Button */}
              <Button
                variant="contained"
                className="!bg-green-500 hover:!bg-green-600 !mt-6 !font-display"
                onClick={() => handleOpen(pet)}
                aria-label="edit"
              >
                Adopt {pet.name}
              </Button>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
      {/* // Modal use state for save service  */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         {selectedPets && <AdoptPetsForm key={pet._id} pet={pet} handleClose={handleClose}></AdoptPetsForm>}
        </Box>
      </Modal>
    </div>
  );
}

export default PetDetails;
