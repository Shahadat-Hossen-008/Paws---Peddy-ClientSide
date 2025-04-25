import { Button, FormHelperText, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import useAuth from "../../../Hooks/useAuth";
import { format } from "date-fns";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import DynamicTitle from "../../../Dynamic Title/DynamicTitle";
const options = [
  { value: "dog", label: "Dog" },
  { value: "cat", label: "Cat" },
  { value: "rabbit", label: "Rabbit" },
  { value: "bird", label: "Bird" },
];
const image_hosting_key = import.meta.env.VITE_Image_Hosting_Key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
function AddPet() {
  const axiosPublic= useAxiosPublic();
  const {user} = useAuth()
  const [isClearable, setIsClearable] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) => {
    //image upload to imagebb and then get url
    const imageFile ={image: data.file[0]}
    const res = await axiosPublic.post(image_hosting_api, imageFile,{
      headers:{
        'content-type':'multipart/form-data'
      }
    })
    if(res.data.success){

      const addPetInfo = {
        name: data.name,
        age: data.age,
        category: selectedOption?.label, 
        location: data.petLocation,
        shortDescription: data.shortNote,
        longDescription: data.longDescription,
        adopted: false,                    
        dateAdded: format(new Date(), 'P'),              
        user_Email: user?.email ,
        image: res.data.data.display_url         
      };
      const petsRes = await axiosPublic.post('/all-pets', addPetInfo);
      if(petsRes.data.acknowledged){
        toast.success(`${addPetInfo.name} added successfully`)
        reset();
      }
      
    }
      
  };
  return (
    <div className="bg-white">
    <DynamicTitle title={`Add Pet | Paws & Tails`} />
      <h2 className="text-2xl font-bold font-display my-5 mx-10">
        Add Your Pet
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
              <span className="text-red-500 text-sm">
                {errors.age.message}
              </span>
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
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
        isClearable={isClearable}
        className="p-5"
      /> 
          <FormHelperText className="!ml-5">Select your pet category</FormHelperText>
        </div>
       </div>
       <div className="w-full my-5">
      {/* short description */}
       <TextField
          helperText="A small note from the pet owner"
          id="outlined-multiline-flexible"
          label="Short description"
          multiline
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
       <div>
       {/* file input */}
       <input type="file" className="file-input"
        {...register("file", {
                required: "file is required",
              })}
        />
        {errors.file &&  (
              <span className="text-red-500 text-sm block">
                {errors.file.message}
              </span>
            )}
       </div>
        {/* Register Button */}
        <div className="my-4">
          <Button variant="contained" type="submit">
            Add Pet
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddPet;
