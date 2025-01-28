import PetsCard from "../../Components/PetsCard/PetsCard";
import UseFetch from "../../Hooks/UseFetch"


function PetListing () {
    const[pets] = UseFetch();
    console.log(pets);
    
  return (
    <div className="w-11/12 mx-auto">PetListing:{pets.length}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap5">
        {pets.map(pet=><PetsCard key={pet._id} pet={pet}></PetsCard>)}
    </div>
    </div>
  )
}

export default PetListing