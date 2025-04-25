import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "../../../Hooks/useAxiosSecure"
import AllUserTable from "../../../Components/AllUserTable/AllUserTable"
import toast from "react-hot-toast"
import DynamicTitle from "../../../Dynamic Title/DynamicTitle"
import useAuth from "../../../Hooks/useAuth"


function AllUser () {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth();
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
  const handleBan = (user) => {
    // const res = axiosSecure.patch(`/users/ban/${user._id}`)
    // .then(res=>{
    //     refetch()
    //     if(res.data.modifiedCount>0){
    //         toast.success(`${user?.name} is Ban now`)
    //     }
        
    // })
    // console.log(user);
    
  };
  const handleUnBan = (userId) => {
    // const res = axiosSecure.patch(`/users/admin/${user._id}`)
    // .then(res=>{
    //     refetch()
    //     if(res.data.modifiedCount>0){
    //         toast.success(`${user?.name} is an Admin now`)
    //     }
        
    // })
    // console.log(userId);
    
  };
  return (
    <div>
    <DynamicTitle title={`All User | Paws & Tails`} />
    <div className="flex flex-col md:flex-row justify-between md:items-center">
    <h1 className="text-2xl font-display m-5 md:m-10">Hi, Welcome {user?.displayName} </h1>
    <h1 className="text-2xl font-display m-5 md:m-10">Total User:  {users.length}</h1>
    </div>
    <DynamicTitle title={`All User | Paws & Tails`} />
    <div>
        <AllUserTable users={users} handleUpdate={handleUpdate} handleBan={handleBan} handleUnBan={handleUnBan}/>
    </div></div>
  )
}

export default AllUser