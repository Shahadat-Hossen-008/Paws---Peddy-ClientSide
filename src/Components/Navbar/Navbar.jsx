import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import { FaArrowRightToBracket } from "react-icons/fa6";
import logo from "../../assets/logo.webp";
import toast from "react-hot-toast";
import useAdmin from "../../Hooks/useAdmin";
function Navbar() {
  // const [isAdmin, isAdminLoading] = useAdmin();
  const { user, signOutUser } = useContext(AuthContext);
  const li = (
    <>
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
      <li>
        <NavLink
          to="petListing"
          className={({ isActive }) =>
            isActive ? "bg-emerald-500 text-white" : undefined
          }
        >
          Pet Listing
        </NavLink>
      </li>
      <li>
        <NavLink
          to="donationCampaign"
          className={({ isActive }) =>
            isActive ? "bg-emerald-500 text-white" : undefined
          }
        >
          Donation Campaigns
        </NavLink>
      </li>
    </>
  );
  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        toast.success("Sign out successfully");
      })
      .catch((err) => {
        toast.error("Error Occur");
      });
  };
  return (
    <div className="navbar bg-base-100 shadow-sm w-11/12 mx-auto sticky mt-6 z-20">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
          </div>
          <ul
            tabIndex={0}
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {li}
          </ul>
        </div>
        <h1 className="text-2xl text-emerald-500 font-bold flex font-display">
          Paws & Tails
          <sup>
            <img src={logo} />
          </sup>
        </h1>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{li}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end z-50 text-lg">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div title={user?.displayName} className="w-10 rounded-full">
                <img
                  referrerPolicy="no-referrer"
                  alt="User Profile Photo"
                  src={user?.photoURL}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link
                  to={"/dashboard/addPet"}
                >
                  Dashboard
                </Link>
              </li>
              <li className="!mt-2">
                <button
                  onClick={handleSignOut}
                  className="btn btn-outline !bg-emerald-500"
                >
                  <FaArrowRightToBracket />
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Button variant="contained" className="!bg-teal-500">
            <Link to="/login">Login</Link>
          </Button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
