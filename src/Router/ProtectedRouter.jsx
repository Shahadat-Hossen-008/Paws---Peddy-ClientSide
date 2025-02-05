
import { Navigate, useLocation } from 'react-router-dom'
import Loading from '../Loading/Loading';
import useAuth from '../Hooks/useAuth';


function ProtectedRouter ({children}) {
  const {user, loading} = useAuth()
  const location = useLocation()
   if(loading){
    return <Loading></Loading>
   }
   if(user && user?.email){
    return children
   }
  return <Navigate to='/login' state={location.pathname} replace></Navigate>
}

export default ProtectedRouter