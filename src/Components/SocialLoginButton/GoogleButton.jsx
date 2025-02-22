import { Button } from "@mui/material";
import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";






function GoogleButton() {
  const { googleSignIn, setUser } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/";
   const handleSignIn = () => {
    googleSignIn()
      .then((result) => {
        setUser(result.user);
        const userInfo = {
          email : result.user?.email,
          name: result.user?.displayName,
          PhotoURL: result.user?.photoURL
        }
        axiosPublic.post('/users', userInfo)
        .then(res=>{
          // console.log(res.data);
        })
        navigate(from);
      })
      .catch((error) => {
        toast.error(error.message);
        
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
