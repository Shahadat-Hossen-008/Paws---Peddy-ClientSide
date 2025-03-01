import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useAdmin from "../Hooks/useAdmin";
import logo from "../assets/logo.webp";

function Dashboard() {
  const { user } = useAuth();
  const [isAdmin] = useAdmin();

  return (
    <div className="drawer drawer-mobile lg:drawer-open">
      {/* Drawer for mobile */}
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full h-16 bg-gray-100 flex items-center justify-between px-4 shadow-sm">
          <label htmlFor="dashboard-drawer" className="btn btn-ghost lg:hidden">
            {/* Hamburger Menu Button */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <h2 className="text-xl font-bold font-display">Dashboard</h2>
          <div className="flex items-center space-x-4">
            <div title={user?.displayName} className="w-10 rounded-full">
              <img
                referrerPolicy="no-referrer"
                alt="User Profile Photo"
                src={user?.photoURL}
                className="rounded-full"
              />
            </div>
          </div>
        </div>
        {/* Main content */}
        <Outlet />
      </div>

      {/* Sidebar (Drawer) */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay lg:hidden"></label>
        <div className="bg-teal-300 w-64 lg:translate-x-0 transform transition-transform duration-300 ease-in-out lg:sticky p-4 lg:min-h-screen lg:block">
          <h1 className="text-2xl text-emerald-900 mt-5 font-bold flex font-display">
            Paws & Tails
            <sup>
              <img src={logo} alt="logo" />
            </sup>
          </h1>
          <ul className="menu my-5 text-[16px] font-display font-medium">
            {isAdmin ? (
              <>
                <li>
                  <NavLink
                    to="/dashboard/allUsers"
                    className={({ isActive }) =>
                      isActive ? "bg-emerald-500 text-white" : undefined
                    }
                  >
                    All Users
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/allPets"
                    className={({ isActive }) =>
                      isActive ? "bg-emerald-500 text-white" : undefined
                    }
                  >
                    All Pets
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/allDonation"
                    className={({ isActive }) =>
                      isActive ? "bg-emerald-500 text-white" : undefined
                    }
                  >
                    All Donations
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/dashboard/addPet"
                    className={({ isActive }) =>
                      isActive ? "bg-emerald-500 text-white" : undefined
                    }
                  >
                    Add a Pet
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/myAddedPets"
                    className={({ isActive }) =>
                      isActive ? "bg-emerald-500 text-white" : undefined
                    }
                  >
                    My Added Pets
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/adoptionRequest"
                    className={({ isActive }) =>
                      isActive ? "bg-emerald-500 text-white" : undefined
                    }
                  >
                    Adoption Requests
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/createDonationCampaign"
                    className={({ isActive }) =>
                      isActive ? "bg-emerald-500 text-white" : undefined
                    }
                  >
                    Create Donation Campaign
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/myDonationCampaign"
                    className={({ isActive }) =>
                      isActive ? "bg-emerald-500 text-white" : undefined
                    }
                  >
                    My Donation Campaigns
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/myDonation"
                    className={({ isActive }) =>
                      isActive ? "bg-emerald-500 text-white" : undefined
                    }
                  >
                    My Donations
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          <div className="divider"></div>
          <ul className="menu my-5 text-[16px] font-display font-medium">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "bg-emerald-500 text-white" : undefined
                }
              >
                Home
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
