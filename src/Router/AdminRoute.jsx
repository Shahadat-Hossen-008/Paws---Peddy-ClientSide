
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../Hooks/useAuth'
import Loading from '../Loading/Loading'
import useAdmin from '../Hooks/useAdmin'


function AdminRoute ({children}) {
    const {user, loading} = useAuth()
    const[isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation()

    if (loading || isAdminLoading) {
      return <Loading />;
    }
    if(user && isAdmin){
      return children
    }
  
    return <Navigate to="/" state={{ from: location }} replace></Navigate>
  }
  
  

export default AdminRoute