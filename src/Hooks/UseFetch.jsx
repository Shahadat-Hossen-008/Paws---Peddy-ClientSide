import axios from "axios";
import { useEffect, useState } from "react"


function UseFetch () {
    const [pets, setPets]= useState([]);
    useEffect(()=>{
        const fetchData = async()=>{
          try{
            const {data} = await axios.get('http://localhost:5000/all-pets');
            setPets(data);
          }
        catch(error){
            console.log(error.message);
        }
    }
     fetchData()
}, []) 
  return [pets]
}

export default UseFetch