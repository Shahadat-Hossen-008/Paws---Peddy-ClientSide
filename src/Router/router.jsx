import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Login from "../Pages/Authentication Pages/Login";
import Error from "../ErrorPage/ErrorPage";
import Register from "../Pages/Authentication Pages/Register";
import Home from "../Pages/Homepage/Home";
import PetListing from "../Pages/PetListing/PetListing";
import PetDetails from "../Pages/PetDetails/PetDetails";
import ProtectedRouter from "./ProtectedRouter";
import DonationCampaign from "../Pages/DonationCampaign/DonationCampaign";

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement:<Error></Error>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'login',
            element:<Login></Login>
        },
        {
            path:'register',
            element:<Register></Register>
        },
        {
            path:'petListing',
            element:<PetListing></PetListing>
        },
        {
            path:'donationCampaign',
            element:<DonationCampaign></DonationCampaign>
        },
        {
            path:'petListing/:id',
            element:<ProtectedRouter><PetDetails></PetDetails></ProtectedRouter>,
            loader:({params})=>fetch(`http://localhost:5000/all-pets/${params.id}`)
        }
      ]
    },
  ]);
  export default router;