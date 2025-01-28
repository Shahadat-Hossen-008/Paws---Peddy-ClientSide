import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { FaArrowRightToBracket } from "react-icons/fa6";

function Navbar() {
  const {user, signOutUser} = useContext(AuthContext)
    const li = <>
        <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Parent</a>
            </li>
            <li>
              <a>Item 3</a>
            </li>
    </>
    const handleSignOut = () => {
      signOutUser()
        .then(() => {
          console.log("Sign out successfully");
          
          // toast.success("Sign Out Successful");
        })
        .catch((err) => {
          console.log("Error Occur")
          // toast.error("Error occur");
        });
    };
  return (
    <div className="navbar bg-base-100 shadow-sm w-11/12 mx-auto my-5">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
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
        <a className="text-2xl text-red-400 font-bold">Paws & Tails</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
         {li}
        </ul>
      </div>
      <div className="navbar-end">
      {user  ? (
            <div className='dropdown dropdown-end z-50 text-lg'>
            <div
              tabIndex={0}
              role='button'
              className='btn btn-ghost btn-circle avatar'
            >
              <div title={user?.displayName} className='w-10 rounded-full'>
                <img
                  referrerPolicy='no-referrer'
                  alt='User Profile Photo'
                  src={user?.photoURL}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
            >
              <li>
                <Link to='/myServices' className='justify-between'>
                  My Services
                </Link>
              </li>
              <li>
                <Link to='/myReviews'>My Reviews</Link>
              </li>
              <li className='!mt-2'>
              <button onClick={handleSignOut} className="btn btn-outline text-blue-500"><FaArrowRightToBracket/>Log Out</button>
              </li>
            </ul>
          </div>
        ):
        
        (
          <Button variant="contained">
              <Link to="/login">Login</Link>
            </Button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
