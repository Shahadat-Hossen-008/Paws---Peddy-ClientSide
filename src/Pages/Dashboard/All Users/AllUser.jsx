import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "../../../Hooks/useAxiosSecure"
import AllUserTable from "../../../Components/AllUserTable/AllUserTable"
import toast from "react-hot-toast"
import DynamicTitle from "../../../Dynamic Title/DynamicTitle"


function AllUser () {
    const axiosSecure = useAxiosSecure()
    const {data: users=[], refetch} = useQuery({
    queryKey:['users'],
    queryFn: async ()=>{
        const res = await axiosSecure.get('/users')
        return res.data
    }
})

const handleUpdate = (user) => {
    const res = axiosSecure.patch(`/users/admin/${user._id}`)
    .then(res=>{
        refetch()
        if(res.data.modifiedCount>0){
            toast.success(`${user?.name} is an Admin now`)
        }
        
    })
  };
  return (
    <div><h1 className="text-2xl font-display my-10 mx-10">Total User:  {users.length}</h1>
    <DynamicTitle title={`All User | Paws & Tails`} />
    <div>
        <AllUserTable users={users} handleUpdate={handleUpdate} />
    </div></div>
  )
}

export default AllUser