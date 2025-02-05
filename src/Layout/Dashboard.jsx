import { Search } from "@mui/icons-material";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useAdmin from "../Hooks/useAdmin";

function Dashboard() {
    const {user} = useAuth();
    //todo: get admin value from database
    const [isAdmin] = useAdmin()
    
  return (
    <div className="flex">
      <div className="w-64 min-h-screen bg-teal-500 p-4">
       {isAdmin ?  
       <ul className="menu  my-5 text-[16px] font-display font-medium">
          <li>
            <NavLink to="/dashboard/allUsers">All Users</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/allPets">All Pets</NavLink>
          </li>
          <li>
            <NavLink to="dashboard/allDonation">All Donation</NavLink>
          </li>
        </ul>: 
        <ul className="menu  my-5 text-[16px] font-display font-medium">
          <li>
            <NavLink to="/dashboard/addPet">Add a pet</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/myAddedPets">My Added Pets</NavLink>
          </li>
          <li>
            <NavLink to="dashboard/adoptionRequest">Adoption Request</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/createDonationCampaign">
              Create Donation Campaign
            </NavLink>
          </li>
          <li>
            <NavLink to="dashboard/myDonationCampaign">
              My Donation Campaigns
            </NavLink>
          </li>
          <li>
            <NavLink to="dashboard/myDonation">My Donations</NavLink>
          </li>
        </ul>}
        <div className="divider"></div>
           <ul className="menu  my-5 text-[16px] font-display font-medium">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
            </ul>
      </div>
      {/* todo: add search functionality require field */}
      {/* navbar content */}
      <div className="flex-1">
        <div className="w-full h-16 bg-gray-100 flex items-center justify-end px-4 shadow-sm">
          <div className="flex items-center space-x-4 mr-6">
            <div title={user?.displayName} className='w-10 rounded-full'>
                <img
                  referrerPolicy='no-referrer'
                  alt='User Profile Photo'
                  src={user?.photoURL}
                  className="rounded-full"
                />
              </div>
          </div>
        </div>
        {/* Dashboard content  */}
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
