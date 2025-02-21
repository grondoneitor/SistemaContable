import { useContext } from "react"
import { Navigate, Outlet} from "react-router-dom"
import { AuthContext } from "../../context/auth"


export const PrivateRoute = () => {

    const {token} = useContext(AuthContext)


    console.log(token, " tokennnn")

    return token ? <Outlet /> : <Navigate to="/login" replace />

}