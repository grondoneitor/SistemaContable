import { useState } from "react";

export const  useSignUp = () => {
    const [error, setError] = useState(null)
    const registrar = async (usuario) => {
        try {
            const response = await fetch('http://localhost:8092/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuario),
                
            });
            if (!response.ok) {
                throw new Error('Error al crear el producto');
            }
            const data = await response.json(); // 🔥 Extrae el JSON de la respuesta
            return data; 
        } catch (error) {
            setError(error)
        }
    };
  

    return {registrar, error};
};