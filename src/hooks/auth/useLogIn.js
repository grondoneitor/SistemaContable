import { useContext } from "react"
import { AuthContext } from "../../context/auth"


export const useLogIn = () =>{

    const {guardarTokenLogin, guardarMensajeError,guardarMesnajeExito} = useContext(AuthContext)
    const login =  async(usuario) =>{
        guardarMesnajeExito("")
        guardarMensajeError("")
        try{
            const response = await fetch("http://localhost:8092/auth/login", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify( usuario),
            })
    
            const data = await response.json()
            if (!response.ok) {
                throw data
            }
            if(localStorage.getItem("tokenLogin")){
                  localStorage.removeItem("tokenLogin")
             }

             localStorage.setItem("tokenLogin", data.object.token)
              guardarTokenLogin(localStorage.getItem("tokenLogin"))
              guardarMesnajeExito(data.mensaje)
            return data
            }
        catch( error){
            guardarMensajeError(error.mensaje)
              console.log(error)
        }
    }


    return{login}

}