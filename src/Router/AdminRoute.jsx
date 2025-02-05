
import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../Hooks/useAuth'
import Loading from '../Loading/Loading'
import useAdmin from '../Hooks/useAdmin'

function AdminRoute ({children}) {
    const {user, loading} = useAuth()
    const[isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation()
     if(loading || isAdminLoading){
      return <Loading></Loading>
     }
     if(user && isAdmin){
      return children
     }
    return <Navigate to='/login' state={location.pathname} ></Navigate>
  }
  

export default AdminRoute