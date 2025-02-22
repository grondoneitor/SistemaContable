import { Navigate, Outlet} from "react-router-dom"


export const PrivateRoute = () => {

    const storage = localStorage.getItem("tokenLogin")

    return storage ? <Outlet /> : <Navigate to="/login"  />

}