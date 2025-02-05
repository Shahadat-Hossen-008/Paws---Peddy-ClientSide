import axios from "axios";
import { useEffect, useState } from "react"


function UseFetch (searchQuery, category) {
    const [pets, setPets]= useState([]);
    useEffect(()=>{
        const fetchData = async()=>{
          try{
            const {data} = await axios.get('http://localhost:5000/all-pets', {
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
  return [pets, setPets]
}

export default UseFetch