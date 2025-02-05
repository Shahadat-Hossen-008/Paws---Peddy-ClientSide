
import { useEffect, useState } from "react"
import useAxiosPublic from "./useAxiosPublic";


function UseFetch (searchQuery, category) {
    const [pets, setPets]= useState([]);
    const axiosPublic = useAxiosPublic();
    useEffect(()=>{
        const fetchData = async()=>{
          try{
            const {data} = await axiosPublic.get('http://localhost:5000/all-pets', {
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
  return [pets]
}

export default UseFetch