import React, { useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import { Button, FormHelperText, TextField } from "@mui/material";
import Select from "react-select";
import { useLoaderData, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import toast from "react-hot-toast";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
const options = [
  { value: "dog", label: "Dog" },
  { value: "cat", label: "Cat" },
  { value: "rabbit", label: "Rabbit" },
  { value: "bird", label: "Bird" },
];

const image_hosting_key = import.meta.env.VITE_Image_Hosting_Key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
function UpdatePetInfo() {
  const pet = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [isClearable, setIsClearable] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    //image upload to imagebb and then get url
    let imageUrl = pet.image;

    // Check if a new image file is uploaded
    if (data.file && data.file.length > 0) {
      // If a new file is uploaded, upload it to imagebb and get the new URL
      const imageFile = { image: data.file[0] };
      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
  
      if (res.data.success) {
        imageUrl = res.data.data.display_url; 
      }
    }
   
      const updatePetInfo = {
        name: data.name,
        age: data.age,
        category: selectedOption?.label,
        location: data.petLocation,
        shortDescription: data.shortNote,
        longDescription: data.longDescription,
        adopted: false,
        dateAdded: format(new Date(), "P"),
        user_Email: user?.email,
        image: imageUrl,
      };
      const petsRes = await axiosSecure.put(`/all-pets/petId/${pet._id}`, updatePetInfo);
      console.log(petsRes.data);
      if(petsRes.data.modifiedCount>0){
        toast.success(`${updatePetInfo.name} updated successfully`)
        navigate('/dashboard/myAddedPets')

      }
      console.log(updatePetInfo);
  };
  return (
    <div>
      <h2 className="text-2xl font-bold font-display my-5 mx-10">
        Update Your Pet Information
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-10">
        <div className="my-5 flex justify-between items-center gap-10">
          <div className="w-full">
            {/* pet names */}
            <TextField
              helperText="Please enter your pet name"
              id="demo-helper-text-misaligned"
              fullWidth
              label="Pet Name"
              defaultValue={pet.name}
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
            {/* pet age */}
            <TextField
              type="number"
              helperText="Please enter your pet's age"
              id="demo-helper-text-misaligned"
              fullWidth
              defaultValue={pet.age}
              label="Pet Age"
              {...register("age", {
                required: "Age is required",
                max: {
                  value: 50,
                  message: "Pet age must be valid",
                },
                min: {
                  value: 1,
                  message: "Pet age must be valid",
                },
              })}
            />
            {errors.age && (
              <span className="text-red-500 text-sm">{errors.age.message}</span>
            )}
          </div>
        </div>
        <div className="my-5 flex justify-between items-center gap-10">
          <div className="w-full ">
            {/* pet location */}
            <TextField
              helperText="Pet location, from where the pet can be picked up when someone wants to adopt it"
              id="demo-helper-text-misaligned"
              fullWidth
              defaultValue={pet.location}
              label="Location"
              {...register("petLocation", {
                required: "Pet location is required",
                minLength: {
                  value: 3,
                  message: "Location must be valid",
                },
              })}
            />
            {errors.petLocation && (
              <span className="text-red-500 text-sm block">
                {errors.petLocation.message}
              </span>
            )}
          </div>
          {/* select */}
          <div className="w-full p-5">
            <Select
              name="category"
              required
              defaultValue={options.find(
                (option) => option.label === pet.category
              )}
              onChange={setSelectedOption}
              options={options}
              isClearable={isClearable}
              className="p-5"
            />
            <FormHelperText className="!ml-5">
              Select your pet category
            </FormHelperText>
          </div>
        </div>
        <div className="w-full my-5">
          {/* short description */}
          <TextField
            helperText="A small note from the pet owner"
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
        <div className="w-full my-5">
          {/* long description */}
          <TextField
            helperText="The detailed information about the pet"
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
            src={pet.image}
            alt="Current Pet"
            className="w-40 h-40 object-cover"
          />
        </div>

        <div>
          {/* file input */}
          <input
            type="file"
            className="file-input"
            {...register("file")}
          />
          {errors.file && (
            <span className="text-red-500 text-sm block">
              {errors.file.message}
            </span>
          )}
        </div>
        {/* Update button */}
        <div className="my-4">
          <Button variant="contained" type="submit">
            Update Pet
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UpdatePetInfo;
