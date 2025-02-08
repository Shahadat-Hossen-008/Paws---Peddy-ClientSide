
import { useEffect, useState } from "react"
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";


function UseFetch (searchQuery, category) {
  const axiosPublic = useAxiosPublic()
    const [pets, setPets]= useState([]);
    const {user} = useAuth();
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
            console.log(error.message);
        }
    }
     fetchData()
}, [searchQuery, category]) 
const {data: usersPets=[], refetch} = useQuery({
  queryKey: ['userPet', user?.email],
  queryFn: async()=>{
    const res = await axiosPublic.get(`/all-pets/email/${user?.email}`)
    return res.data
  }
})
  return [pets, usersPets, refetch]
}

export default UseFetch