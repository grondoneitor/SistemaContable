import { createContext, useEffect, useReducer, useState } from "react";
import { AuthReducer, InititalState } from "../reducer/AuthReducer";



export const AuthContext = createContext()

// eslint-disable-next-line react/prop-types
export function AuthProvider({children}){

    const [ state, dispatch ] = useReducer(AuthReducer, InititalState)

    const [token, setToken] = useState(state.tokenLogIn)

    // useEffect(()=>{
    //     if(token){
    //         localStorage.setItem("tokenLogin", token)
    //     }else{
    //         localStorage.removeItem("tokenLogin")
    //     }
    // },[token])

    const registrar = (usuario) =>{

        dispatch({type: "registrar", payload:usuario})
    }

    const guardarTokenLogin = (token) =>{

        dispatch({type: "guardar_token_login", payload:token})
    }
    const guardarMensajeError = (error) =>{
        dispatch({type: "guardar_error_message", payload:error})
    }
    const guardarMesnajeExito = (success) =>{
        dispatch({type: "guardar_success_message", payload:success})
    }


    return(
        <AuthContext.Provider value={{
            state,
            registrar,
            guardarTokenLogin,
            setToken,
            guardarMensajeError,
            guardarMesnajeExito
        }}>
            {children}
        </AuthContext.Provider>
    )
}