
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure"


function useDonationCampaigns () {
  const axiosSecure = useAxiosSecure();
  const {data: pets=[], refetch} = useQuery({
    queryKey: ['pet'],
    queryFn: async()=>{
      const res = await axiosSecure.get('/donation-campaign')
      return res.data
    }
  })
  return [pets, refetch]
}

export default useDonationCampaigns