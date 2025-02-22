
import useAuth from '../../../Hooks/useAuth';
import { Button, FormHelperText, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import toast from 'react-hot-toast';
const image_hosting_key = import.meta.env.VITE_Image_Hosting_Key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
function CreateDonation () {
  const axiosPublic = useAxiosPublic();
    const [startDate, setStartDate] = useState(new Date());
    const {user} = useAuth()
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
        petName: data.name,
        highestDonationAmount: data.donation,
        donatedAmount: 0,
        shortDescription: data.shortNote,
        longDescription: data.longDescription,
        adopted: false,                    
        lastDateOfDonation: format(new Date(startDate), 'P'), 
        campaignCreatedDateTime: format(new Date(), 'Pp'),
        userEmail: user?.email,
        petImage:  res.data.data.display_url ,
        pause: false       
      };
      
      
      const petsRes = await axiosPublic.post('/donation-campaign', addPetInfo);
      if(petsRes.data.acknowledged){
        toast.success(`Thank you! ${addPetInfo.petName} is now available for donations. Your generosity will make a difference!`);

        reset();
      }
      
    }
       
    };
    return (
      <div>
        <h2 className="text-2xl font-bold font-display my-5 mx-10">
          Create Donation Campaign
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
              {/* highest donated amount */}
              <TextField
                type="number"
                helperText="Maximum donation amount, the highest total amount of donation"
                id="demo-helper-text-misaligned"
                fullWidth
                label="Highest Donation Amount"
                {...register("donation", {
                  required: "Donation is required",
                  max: {
                    value: 50000,
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
         <div className="w-full my-5">
        {/* short description */}
         <TextField
            helperText="A small note from the pet"
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
          helperText="The detailed information about the pet condition"
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
         <div className='my-5'>
         {/* last date of time */}
        <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="border border-black pl-8"
              required
            />
             <FormHelperText className="!ml-5">Last date of donation, the last date when the donation will be closed </FormHelperText>
        </div>
          {/* Register Button */}
          <div className="my-4">
            <Button variant="contained" type="submit">
              Add Donation
            </Button>
          </div>
        </form>
      </div>
  )
}

export default CreateDonation