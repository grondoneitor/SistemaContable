import { useState } from "react";

export const  useCrearCliente = () => {
    const [error, setError] = useState(null)
    const crearClienteReal = async (cliente) => {
        const storage = localStorage.getItem("tokenLogin")
        try {
            const response = await fetch('http://localhost:8092/api/v1/cliente', {
                method: 'POST',
                headers: {
                'Authorization': `Bearer ${storage}`,    
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(cliente),
            });
            
            if (!response.ok) {
                throw new Error('Error al crear el producto');
            }
            // const datita = await response.json();
            return response; 
        } catch (error) {
            setError(error)
            console.log(error)
        }
    };
  

    return {crearClienteReal, error};
};