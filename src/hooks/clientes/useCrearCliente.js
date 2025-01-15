import { useState } from "react";

export const  useCrearCliente = () => {
    const [error, setError] = useState(null)
    const crearClienteReal = async (cliente) => {
        console.log(cliente)
        try {
            const response = await fetch('http://localhost:8092/api/v1/cliente', {
                method: 'POST',
                headers: {
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
        }
    };
  

    return {crearClienteReal, error};
};