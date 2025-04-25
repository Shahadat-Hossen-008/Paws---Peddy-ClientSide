import { Button, FormHelperText, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

import toast from 'react-hot-toast';
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";
const image_hosting_key = import.meta.env.VITE_Image_Hosting_Key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

function MyDonationPetUpdate() {
  const [isAdmin] = useAdmin();
  const pet = useLoaderData();
  const navigate = useNavigate();

  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [startDate, setStartDate] = useState(pet.lastDateOfDonation);
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // image upload to imagebb and then get url
    const imageFile = { image: data.file[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });

    if (res.data.success) {
      const addPetInfo = {
        petName: data.name,
        highestDonationAmount: data.donation,
        donatedAmount: 0,
        shortDescription: data.shortNote,
        longDescription: data.longDescription,
        adopted: false,
        lastDateOfDonation: format(new Date(startDate), 'P'),
        campaignCreatedDateTime: format(new Date(), 'Pp'),
        userEmail: user?.email,
        petImage: res.data.data.display_url,
        pause: false,
      };

      const petsRes = await axiosSecure.put(`/donation-campaign/petId/${pet._id}`, addPetInfo);
      if (petsRes.data.acknowledged) {
        toast.success(`${addPetInfo.petName} is now updated successfully`);

        // More explicit role-based navigation
        if (isAdmin) {
          // Admin-specific behavior
          navigate("/dashboard/allDonation");
        } else {
          // Non-admin behavior
          navigate(`/dashboard/myDonationCampaign`);
        }
      } else {
        toast.error('Failed to update pet information. Please try again.');
      }
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-4">
      <h2 className="text-2xl font-bold font-display my-5 text-center">
        Update Donation Campaign
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="w-full">
            {/* Pet Name */}
            <TextField
              helperText="Please enter your pet name"
              id="demo-helper-text-misaligned"
              fullWidth
              defaultValue={pet.petName}
              label="Pet Name"
              {...register("name", {
                required: "Pet name is required",
                minLength: {
                  value: 3,
                  message: "Pet name must be at least 3 characters",
                },
              })}
            />
            {errors.name && (
              <span className="text-red-500 text-sm block">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="w-full">
            {/* Highest Donated Amount */}
            <TextField
              type="number"
              helperText="Maximum donation amount, the highest total amount of donation"
              id="demo-helper-text-misaligned"
              fullWidth
              defaultValue={pet.highestDonationAmount}
              label="Highest Donation Amount"
              {...register("donation", {
                required: "Donation is required",
                max: {
                  value: 50000000,
                  message: "Donation must be valid",
                },
                min: {
                  value: 50,
                  message: "Donation must be valid",
                },
              })}
            />
            {errors.donation && (
              <span className="text-red-500 text-sm">
                {errors.donation.message}
              </span>
            )}
          </div>
        </div>

        <div className="w-full">
          {/* Short Description */}
          <TextField
            helperText="A small note from the pet"
            id="outlined-multiline-flexible"
            label="Short description"
            multiline
            defaultValue={pet.shortDescription}
            maxRows={4}
            {...register("shortNote", {
              required: "Short note about pet is required",
              minLength: {
                value: 10,
                message: "Short note must be 10 character long",
              },
            })}
          />
          {errors.shortNote && (
            <span className="text-red-500 text-sm block">
              {errors.shortNote.message}
            </span>
          )}
        </div>

        <div className="w-full">
          {/* Long Description */}
          <TextField
            helperText="The detailed information about the pet condition"
            id="outlined-multiline-static"
            label="Long description"
            multiline
            defaultValue={pet.longDescription}
            rows={4}
            {...register("longDescription", {
              required: "Long description about pet is required",
              minLength: {
                value: 20,
                message: "Long description  must be 20 character long",
              },
            })}
          />
          {errors.longDescription && (
            <span className="text-red-500 text-sm block">
              {errors.longDescription.message}
            </span>
          )}
        </div>

        <div className="w-full my-5">
          <p>Current Pet Image:</p>
          <img
            src={pet.petImage}
            alt="Current Pet"
            className="w-40 h-40 object-cover mx-auto"
          />
        </div>

        <div>
          {/* File Input */}
          <input
            type="file"
            className="file-input w-full"
            {...register("file", {
              required: "File is required",
            })}
          />
          {errors.file && (
            <span className="text-red-500 text-sm block">
              {errors.file.message}
            </span>
          )}
        </div>

        <div className="my-5">
          {/* Last Date of Donation */}
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="border border-black pl-8 w-full"
            required
          />
          <FormHelperText className="!ml-5">
            Last date of donation, the last date when the donation will be closed
          </FormHelperText>
        </div>

        {/* Register Button */}
        <div className="text-center">
          <Button variant="contained" type="submit">
            Update Donation
          </Button>
        </div>
      </form>
    </div>
  );
}

export default MyDonationPetUpdate;
