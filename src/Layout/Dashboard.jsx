import { Search } from "@mui/icons-material";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

function Dashboard() {
    const {user} = useAuth();
  return (
    <div className="flex">
      <div className="w-64 min-h-screen bg-teal-500 p-4">
        <ul className="menu  my-5 text-[16px] font-display font-medium">
          <li>
            <NavLink to="/addPet">Add a pet</NavLink>
          </li>
          <li>
            <NavLink to="myAddedPets">My Added Pets</NavLink>
          </li>
          <li>
            <NavLink to="dashboard/adoptionRequest">Adoption Request</NavLink>
          </li>
          <li>
            <NavLink to="dashboard/createDonationCampaign">
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
        </ul>
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
        <div className="w-full h-16 bg-gray-100 flex items-center justify-between px-4 shadow-sm">
          <div className="flex items-center space-x-4">
            <Search className="text-gray-600" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-200 rounded-lg p-2 outline-none focus:bg-white focus:ring-2"
            />
          </div>
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
