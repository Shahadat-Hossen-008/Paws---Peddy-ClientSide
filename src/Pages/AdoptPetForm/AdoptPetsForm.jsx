import useAuth from "../../Hooks/useAuth";
import { Button, TextField } from "@mui/material";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
function AdoptPetsForm({ pet, handleClose }) {
  
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure()
  const handleSubmit = async(e) => {
    const { _id, image, name, user_Email } = pet;
    e.preventDefault();
    const phoneNumber = e.target.phone.value;
    const location = e.target.location.value
    const adoptPetInformation = {
      userName: user.displayName,
      userEmail: user.email,
      petId: _id,
      petName: name,
      image,
      phoneNumber,
      location
    };
    if(user?.email === user_Email)
      return toast.error("Action not permitted!")
    
    try {
      const { data } = await axiosSecure.post('/adopt-pet', adoptPetInformation);
      toast.success("Adoption request sent successfully");
      console.log(data);
    } catch (err) {
      // Check if there's a response from the server
      if (err.response) {
        const errorMessage = err.response.data; 
        
        // Show the server error message to the client using toast
        toast.error(errorMessage || "An error occurred. Please try again.");
        
        // Log additional info for debugging (optional)
        console.error("Server responded with error:", err.response);
      } else if (err.request) {
        // Request was made but no response was received
        toast.error("Network error. Please check your connection.");
        console.error("No response received:", err.request);
      } else {
        // Something else happened in setting up the request
        toast.error("An unexpected error occurred.");
        console.error("Error:", err.message);
      }
    }
    
    handleClose();
  };

  return (
    <div>
      <h2 className="text-2xl font-display text-center my-5">
        Get ready to adopt: <span className="font-bold">{pet.name}</span>
      </h2>
      <form onSubmit={handleSubmit}>
        <TextField
          className="!my-5"
          required
          fullWidth
          disabled
          id="outlined"
          label="User Name"
          defaultValue={user?.displayName}
        />
        <TextField
          required
          fullWidth
          disabled
          id="outlined"
          label="User Email"
          defaultValue={user?.email}
        />
        <TextField
          name="phone"
          className="!my-5"
          required
          type="number"
          id="outlined"
          label="Enter your phone number"
          fullWidth
        />
        <TextField
          name="location"
          required
          fullWidth
          id="outlined"
          label="Enter Your Location"
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          className="!my-5 !bg-teal-500"
        >
          Adopt
        </Button>
      </form>
    </div>
  );
}

export default AdoptPetsForm;
