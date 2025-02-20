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
import DonationDetails from "../Pages/DonationDetails/DonationDetails";
import Dashboard from "../Layout/Dashboard";
import MyAddedPets from "../Pages/Dashboard/MyAddedPets/MyAddedPets";
import AddPet from "../Pages/Dashboard/AddAPet/AddPet";
import CreateDonation from "../Pages/Dashboard/CreateDonationCampaign/CreateDonation";
import AllUser from "../Pages/Dashboard/All Users/AllUser";
import AdminRoute from "./AdminRoute";
import AllPets from "../Pages/Dashboard/AllPets/AllPets";
import UpdatePetInfo from "../Components/UpdatePetInfo/UpdatePetInfo";
import AdoptionRequest from "../Pages/Dashboard/AdoptionRequest/AdoptionRequest";
import MyDonationPetUpdate from "../Components/DonationPetUpdate/MyDonationPetUpdate";
import MyDonations from "../Pages/Dashboard/MyDonations/MyDonations";
import MyDonationCampaign from "../Pages/Dashboard/MyDonationCampaign/MyDonationCampaign";
import AllDonationCampaign from "../Pages/Dashboard/AllDonationCampiagn/AllDonationCampaign";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "petListing",
        element: <PetListing></PetListing>,
      },
      {
        path: "donationCampaign",
        element: <DonationCampaign></DonationCampaign>,
      },
      {
        path: "donationCampaign/:id",
        element: (
          <ProtectedRouter>
            <DonationDetails></DonationDetails>
          </ProtectedRouter>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/donation-campaign/${params.id}`),
      },
      {
        path: "petListing/:id",
        element: (
          <ProtectedRouter>
            <PetDetails></PetDetails>
          </ProtectedRouter>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/all-pets/${params.id}`),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <ProtectedRouter>
        <Dashboard></Dashboard>
      </ProtectedRouter>
    ),
    children: [
      //Admin routes
      {
        path: "allUsers",
        element: (
          <AdminRoute>
            <AllUser></AllUser>
          </AdminRoute>
        ),
      },
      {
        path: "allPets",
        element: (
          <AdminRoute>
            <AllPets></AllPets>
          </AdminRoute>
        ),
      },
      {
        path:'allDonation',
        element:<AdminRoute>
          <AllDonationCampaign/>
        </AdminRoute>
      },
      //user dashboard
      {
        path: "myAddedPets",
        element: <MyAddedPets></MyAddedPets>,
      },
      {
        path: "addPet",
        element: <AddPet></AddPet>,
      },
      {
        path: "updatePetInfo/:id",
        element: <UpdatePetInfo />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/all-pets/${params.id}`),
      },
      {
        path: "adoptionRequest",
        element: <AdoptionRequest />,
      },
      {
        path: "createDonationCampaign",
        element: <CreateDonation></CreateDonation>,
      },
      {
        path: "myDonationCampaign",
        element: <MyDonationCampaign />,
      },
      {
        path: "updateDonationPetInfo/:id",
        element: <MyDonationPetUpdate />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/donation-campaign/${params.id}`),
      },
      {
        path:'myDonation',
        element:<MyDonations/>
      }
    ],
  },
]);
export default router;
