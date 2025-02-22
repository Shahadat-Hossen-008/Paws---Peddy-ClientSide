import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth"
import useAxiosSecure from "./useAxiosSecure";


function useAdmin () {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data : isAdmin, isPending: isAdminLoading} = useQuery({
        queryKey:[user?.email, "isAdmin"],
        queryFn: async()=>{
          if (!user?.email) return false;
          const res = await axiosSecure.get(`/users/admin/${user?.email}`)
          
          return res.data?.admin
        },
        enabled: !!user?.email,
        retry: false,
        staleTime: 5 * 60 * 1000,
        
    })
  return [isAdmin, isAdminLoading]
}

export default useAdmin