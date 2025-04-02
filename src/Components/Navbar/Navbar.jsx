import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import { FaArrowRightToBracket, FaMoon, FaSun } from "react-icons/fa6";
import logo from "../../assets/logo.webp";
import toast from "react-hot-toast";
import useAdmin from "../../Hooks/useAdmin";
import "../Shared.css"
function Navbar() {
  const [isAdmin] = useAdmin();
  const { user, signOutUser } = useContext(AuthContext);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
 const toggleTheme = () => {
    const newTheme = isDarkTheme ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    setIsDarkTheme(!isDarkTheme);
  };

  // On mount, check system preferences and localStorage to set the theme
  useEffect(() => {
    const localStorageTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (localStorageTheme) {
      setIsDarkTheme(localStorageTheme === "dark");
      document.documentElement.setAttribute("data-theme", localStorageTheme);
    } else if (systemPrefersDark) {
      setIsDarkTheme(true);
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      setIsDarkTheme(false);
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);
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
        toast.error("Error Occurred");
      });
  };

  return (
    <div className="bg-base-100 sticky z-50 top-0">
      <div className="navbar shadow-sm md:w-11/12 md:mx-auto py-4">
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {li}
          </ul>
        </div>
        <h1 className="md:text-2xl text-emerald-500 font-bold flex font-display">
          Paws & Tails
          <sup>
            <img src={logo} alt="Logo" />
          </sup>
        </h1>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{li}</ul>
      </div>
      <div className="navbar-end">
      <Button
          onClick={toggleTheme}
          aria-label={`Switch to ${isDarkTheme ? "light" : "dark"} theme`}
        >
          {isDarkTheme ?  <FaMoon />:<FaSun />}
        </Button>
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
              {user && isAdmin && (
                <li>
                  {" "}
                  <Link to={"/dashboard/allUsers"}>Dashboard</Link>
                </li>
              )}
              {user && !isAdmin && (
                <li>
                  {" "}
                  <Link to={"/dashboard/myAddedPets"}>Dashboard</Link>
                </li>
              )}

              <li className="!mt-2">
                <button
                  onClick={handleSignOut}
                  className="btn btn-outline  custom-btn-primary"
                >
                  <FaArrowRightToBracket />
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Button variant="contained" className=" custom-btn-primary">
            <Link to="/login">Login</Link>
          </Button>
        )}
      </div>
    </div>
    </div>
  );
}

export default Navbar;
