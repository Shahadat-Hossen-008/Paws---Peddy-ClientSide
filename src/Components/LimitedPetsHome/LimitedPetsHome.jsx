
import useAxiosPublic from '../../Hooks/useAxiosPublic'
import { useQuery } from '@tanstack/react-query';
import PetsCard from '../PetsCard/PetsCard';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import '../Shared.css'
function LimitedPetsHome () {
    const axiosPublic = useAxiosPublic();
    const {data: pets=[]} = useQuery({
        queryKey: ['pet'],
        queryFn: async()=>{
          const res = await axiosPublic.get("/all-limited-pet")
          return res.data
        }
      })
  return (
    <div className='w-10/12 mx-auto my-10 md:my-20'>
        <h2 className="text-xl md:text-3xl font-display font-bold text-left md:my-4 my-2">
         See Our New Arrival Pets
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
    {pets.length === 0
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
              : pets.map((pet) => (
              <PetsCard key={pet._id} pet={pet}></PetsCard>
            ))}
        </div>
        <div className="my-6 flex justify-center">
              <Link to={"petListing"} ><Button variant="contained" className="!bg-teal-500">More Pet</Button></Link>
        </div>
    </div>
  )
}

export default LimitedPetsHome