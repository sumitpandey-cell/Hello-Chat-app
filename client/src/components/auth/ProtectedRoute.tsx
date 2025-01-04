import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from 'react-redux'

const ProtectedRoute = ({children, redirect="/login"}) => {
    const currentUser = useSelector(state => state.currentUser)

    if(!currentUser) return <Navigate to={redirect}/> 

    return children ? children : <Outlet />
}
export default ProtectedRoute;