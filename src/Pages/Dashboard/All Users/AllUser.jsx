import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "../../../Hooks/useAxiosSecure"
import AllUserTable from "../../../Components/AllUserTable/AllUserTable"


function AllUser () {
    const axiosSecure = useAxiosSecure()
const {data: users=[]} = useQuery({
    queryKey:['users'],
    queryFn: async()=>{
        const res = await axiosSecure.get('/users')
        return res.data
    }
})


  return (
    <div><h1 className="text-2xl font-display my-10 mx-10">Total User:  {users.length}</h1>
    <div>
        <AllUserTable users={users} />
    </div></div>
  )
}

export default AllUser