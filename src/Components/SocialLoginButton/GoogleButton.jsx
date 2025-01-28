import { Button } from "@mui/material";
import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";





function GoogleButton() {
  const { googleSignIn, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/";
   const handleSignIn = () => {
    googleSignIn()
      .then((result) => {
        setUser(result.user);
        // navigate(from);
      })
      .catch((error) => {
        console.log(error.message);
        
        // toast.error(error.message);
      });
  };
 
  return (
    <div>
      <div className="divider">OR</div>
      <Button
      onClick={handleSignIn}
        variant="outlined"
        fullWidth
      >
        <FcGoogle className="text-2xl" /> Sign In With Google
      </Button>
    </div>
  );
}

export default GoogleButton;
