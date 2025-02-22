import { useNavigate } from "react-router-dom"
import { useSignUp } from "../../hooks/auth/useSignUp"
import { useLogIn } from "../../hooks/auth/useLogIn"
import { useState } from "react"


export const AuthServicios = () => {

    // const {registrar} = useContext(AuthContext);
    const [isMoved, setIsMoved] = useState(false)
    const [isMistake, setIsMistake] = useState(false)
    const navigate = useNavigate()

    const { registrar } = useSignUp()
    const { login } = useLogIn()

    const signUp = async (usuario) => {
        const success = await registrar(usuario)
        if (success) {
            isSuccess()
            setTimeout(()=>{
                navigate("/login")
            },[1500])
        }else{
            isUnseccess()
        }
    }

    const logIn = async (usuario) => {
        const success = await login(usuario)
        if (success) {
            isSuccess()
            setTimeout(()=>{
                navigate("/");
            },[1500])
        }else{
            isUnseccess()
        } 
    }

    const isSuccess = ( ) =>{
        if(isMoved === false){
            setIsMoved(true)
            setTimeout(()=>{
                setIsMoved(false)
            },[1400])
        }
    }
    const isUnseccess = ( ) =>{
        if(isMistake === false){
            setIsMistake(true)
            setTimeout(()=>{
                setIsMistake(false)
            },[2000])
        }
    }

    return { signUp, logIn, isMoved,  isMistake }
}