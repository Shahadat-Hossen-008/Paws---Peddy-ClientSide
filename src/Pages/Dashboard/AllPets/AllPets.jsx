import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import AllPetsTable from "../../../Components/AllPetsTable/AllPetsTable";

function AllPets() {
  const axiosSecure = useAxiosSecure();
  const { data: pets = [], refetch } = useQuery({
    queryKey: ["pets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-pets");
      return res.data;
    },
  });
  const handleUpdate = (pet) => {
    console.log("Update Pet:", pet);
    // Update logic here
  };

  const handleDelete = (id) => {
    console.log("Delete pet", id);
  };
  const deleteConfirmation = (id) => {
    toast((t) => (
      <div>
        <p className="font-poppins font-semibold my-2">Are you sure</p>
        <div className="flex items-center gap-2">
          <Button
            className="!bg-red-500"
            variant="contained"
            onClick={() => {
              toast.dismiss(t.id);
              handleDelete(id);
            }}
          >
            Delete
          </Button>
          <Button
            className="!bg-green-500"
            variant="contained"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </Button>
        </div>
      </div>
    ));
  };
  return (
    <div>
      <h1 className="text-2xl font-display my-10 mx-10">
        Total Pets : {pets.length}
      </h1>
      <div>
        <AllPetsTable pets={pets} handleUpdate={handleUpdate} handleDelete={handleDelete} />
      </div>
    </div>
  );
}

export default AllPets;
