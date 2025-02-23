import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaRegCheckCircle, FaRegCircle } from "react-icons/fa";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import GoogleButton from "../../Components/SocialLoginButton/GoogleButton";
import toast from "react-hot-toast";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import DynamicTitle from "../../Dynamic Title/DynamicTitle";

function Register() {

  const { createUser, updateUserProfile, setUser } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic()
  const [seePassword, setSeePassword] = useState(true);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const passwordValue = watch("password", "");

  const lowerCaseValidate = /^(?=.*[a-z])/.test(passwordValue);
  const upperCaseValidate = /(?=.*[A-Z])/.test(passwordValue);
  const specialChValidate = /^(?=.*[\W_])/.test(passwordValue);
  const numberValidate = /^(?=.*\d)(?=.{8,})/.test(passwordValue);
  
  const onSubmit = (data) => {
    const { email, password, username, photoURL } = data;
    createUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateUserProfile(username, photoURL)
          .then(() => {
            toast.success("User created successfully")
            setUser(user);
            const userInfo = {
              email  ,
              name : username,
              photoURL
            }
            axiosPublic.post('/users', userInfo)
            .then(res=>{
              // console.log(res.data)
            })
            reset();
            navigate('/');
          })
          .catch((err) => toast.error(err.message));
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div className="hero min-h-screen  py-20 flex items-center justify-center">
    <DynamicTitle title={`Register | Paws & Tails`} />
      <div className="card w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full text-lg">
          
          {/* Username */}
          <div className="form-control my-2">
            <label className="label text-gray-700 font-semibold">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              className="input input-bordered w-full p-4 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400 text-lg"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
              })}
            />
            {errors.username && (
              <span className="text-red-500 text-sm">{errors.username.message}</span>
            )}
          </div>

          {/* Photo URL */}
          <div className="form-control my-2">
            <label className="label text-gray-700 font-semibold">Photo URL</label>
            <input
              type="url"
              placeholder="Enter your photo url"
              className="input input-bordered w-full p-4 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400 text-lg"
              {...register("photoURL", {
                required: "Photo url is required",
                pattern: {
                  value: /^https?:\/\/.+/,
                  message: "Enter a valid url",
                },
              })}
            />
            {errors.photoURL && (
              <span className="text-red-500 text-sm">{errors.photoURL.message}</span>
            )}
          </div>

          {/* Email */}
          <div className="form-control my-2">
            <label className="label text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full p-4 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400 text-lg"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email.message}</span>
            )}
          </div>

          {/* Password */}
          <div className="form-control mb-6 relative">
            <label className="label text-gray-700 font-semibold">Password</label>
            <input
              type={seePassword ? "password" : "text"}
              placeholder="Enter your password"
              className="input input-bordered w-full p-4 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400 text-lg"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must contain 6 characters",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                  message:
                    "Password must include uppercase, lowercase, number, and special character",
                },
              })}
            />
            <button
              onClick={() => setSeePassword(!seePassword)}
              type="button"
              className="absolute right-4 top-10 text-gray-500"
            >
              {seePassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password.message}</span>
            )}

            {/* Password Validation */}
            <div className="p-4 mt-3 bg-gray-50 rounded-lg text-sm">
              <div className={`${lowerCaseValidate ? "text-green-600" : "text-black"} flex items-center gap-3`}>
                {lowerCaseValidate ? <FaRegCheckCircle /> : <FaRegCircle />} At least one lowercase
              </div>
              <div className={`${upperCaseValidate ? "text-green-600" : "text-black"} flex items-center gap-3`}>
                {upperCaseValidate ? <FaRegCheckCircle /> : <FaRegCircle />} At least one uppercase
              </div>
              <div className={`${specialChValidate ? "text-green-600" : "text-black"} flex items-center gap-3`}>
                {specialChValidate ? <FaRegCheckCircle /> : <FaRegCircle />} At least one special character
              </div>
              <div className={`${numberValidate ? "text-green-600" : "text-black"} flex items-center gap-3`}>
                {numberValidate ? <FaRegCheckCircle /> : <FaRegCircle />} At least one number and length of 6
              </div>
            </div>
          </div>

          {/* Register Button */}
          <div className="form-control my-4">
            <Button variant="contained" type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-purple-700">
              Register
            </Button>
          </div>

          <p className="text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Sign In
            </Link>
          </p>
        </form>
        <GoogleButton></GoogleButton>
      </div>
    </div>
  );
}

export default Register;
