import { useState } from "react";
import PetsCard from "../../Components/PetsCard/PetsCard";
import UseFetch from "../../Hooks/UseFetch";
import {
  FormControl,
  IconButton,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function PetListing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [pets] = UseFetch(searchQuery, category);
  const availablePets = pets?.filter((pet) => pet.adopted === false) || [];

  return (
    <div className="w-11/12 mx-auto">
      <div className="md:flex justify-evenly items-center">
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
          <TextField
            id="outlined-basic"
            label="Search Name..."
            value={searchQuery}
            variant="outlined"
            fullWidth
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute right-3 top-5" />
        </div>
      </div>
      <h1 class="text-4xl font-bold text-emerald-500 mb-4">
        Find Your Forever Friend: Adopt a Pet Today!
      </h1>
      <p class="text-lg text-cyan-200-200 mb-6">
        Give a loving pet the chance to find a forever home. By adopting, you're
        not only saving a life but gaining a loyal companion who will bring
        endless joy to your world. Open your heart and home to a furry friend in
        need and make a difference today.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap5">
        {availablePets.length === 0
          ? Array(10)
              .fill(0)
              .map((_, idx) => (
                <div key={idx} className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  <Skeleton
                    count={20}
                    baseColor="#38b2ac"
                    highlightColor="#81e6d9"
                    height={300}
                    duration={1.2}
                    style={{ marginBottom: "20px", borderRadius: "8px" }}
                  />
                </div>
              ))
          : availablePets.map((pet) => (
              <PetsCard key={pet._id} pet={pet}></PetsCard>
            ))}
      </div>
    </div>
  );
}

export default PetListing;
