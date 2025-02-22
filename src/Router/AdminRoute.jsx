
import { useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../Hooks/useAuth'
import Loading from '../Loading/Loading'
import useAdmin from '../Hooks/useAdmin'

function AdminRoute ({children}) {
    const {user, loading} = useAuth()
    const[isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation()
    const navigate = useNavigate();

    useEffect(() => {
      if (!loading && !isAdminLoading && (!user || !isAdmin)) {
        navigate('/login', { state: location.pathname, replace: true });
      }
    }, [loading, isAdminLoading, user, isAdmin, location.pathname, navigate]);
  
    if (loading || isAdminLoading) {
      return <Loading />;
    }
  
    return user && isAdmin ? children : null;
  }
  
  

export default AdminRoute