import { useState } from "react";
import PetsCard from "../../Components/PetsCard/PetsCard";
import UseFetch from "../../Hooks/UseFetch";
import { FormControl, IconButton, InputBase, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { IoSearchCircleOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";

function PetListing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [pets] = UseFetch(searchQuery, category);
  console.log(pets);

  return (
    <div className="w-11/12 mx-auto">
      <div className="flex justify-evenly items-center">
        <FormControl sx={{ m: 3, minWidth: 300 }}>
          <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"Dog"}>Dog</MenuItem>
            <MenuItem value={"Rabbit"}>Rabbit</MenuItem>
            <MenuItem value={"Cat"}>Cat</MenuItem>
            <MenuItem value={"Bird"}>Bird</MenuItem>
          </Select>
        </FormControl>
        <div className="relative w-full">
        <TextField id="outlined-basic" label="Search Name..."  value={searchQuery} variant="outlined" fullWidth onChange={(e) => setSearchQuery(e.target.value)} />
         <FaSearch className="absolute right-3 top-5"/>
        </div>
      </div>
      PetListing:{pets.length}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap5">
        {pets.map((pet) => (
          <PetsCard key={pet._id} pet={pet}></PetsCard>
        ))}
      </div>
    </div>
  );
}

export default PetListing;
