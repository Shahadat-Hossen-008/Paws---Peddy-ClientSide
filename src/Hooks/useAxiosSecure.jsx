import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});
function useAxiosSecure() {
  const {signOutUser} = useAuth()
  const navigate = useNavigate()
  axiosSecure.interceptors.request.use(
    function (config) {
      //request interceptor to add authorization header for every secure call to the api
      const token = localStorage.getItem("access-token");
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  //intercept 401 and 403 error
  // Add a response interceptor
  axiosSecure.interceptors.response.use(
    (response)=> {
      return response;
    },
    async(error) => {
      const status = error.response.status;
      console.log("Status interceptors ", error);
      
      if (status === 401 || status === 403) {
        await signOutUser();
        navigate('/login')
      }
        return Promise.reject(error);
    }
  );

  return axiosSecure;
}

export default useAxiosSecure;
