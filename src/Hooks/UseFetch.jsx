
import { useEffect, useState } from "react"
import useAxiosPublic from "./useAxiosPublic";


import toast from "react-hot-toast";

function UseFetch (searchQuery, category) {
  const axiosPublic = useAxiosPublic()
    const [pets, setPets]= useState([]);
    useEffect(()=>{
        const fetchData = async()=>{
          try{
            const {data} = await axiosPublic.get('/all-pets', {
              params:{
                query:searchQuery,
                category: category
              }
            });
            setPets(data);
          }
        catch(error){
           toast.error(error.message);
        }
    }
     fetchData()
}, [searchQuery, category]) 

  return [pets, setPets]
}

export default UseFetch