import { useContext } from "react";
import { AuthContext } from "../../context/auth";

export const  useSignUp = () => {
        const { guardarMensajeError,guardarMesnajeExito} = useContext(AuthContext)
    const registrar = async (usuario) => {
        guardarMesnajeExito("")
        guardarMensajeError("")
        try {
            const response = await fetch('http://localhost:8092/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuario),
                
            });

            const data = await response.json(); // 🔥 Extrae el JSON de la respuesta

            if (!response.ok) {
                throw data
            }
            guardarMesnajeExito(data.mensaje)
            return data; 
        } catch (error) {
            guardarMensajeError(error.mensaje)
        }
    };
  

    return {registrar};
};