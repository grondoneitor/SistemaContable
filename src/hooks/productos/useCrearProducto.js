import { useState } from "react";

export const  useCrearProducto = () => {
    const [error, setError] = useState(null)
    const crearProductoReal = async (producto) => {
        console.log(producto)
        const token = localStorage.getItem("tokenLogin")
        try {
            const response = await fetch('http://localhost:8092/api/v1/producto', {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(producto),
            });
            

            const datita = await response.json();
            if (!response.ok) {
                throw datita
            }
            return datita; 
        } catch (error) {
            setError(error)
            console.log(error)
        }
    };
    // useMapeandoProductos()

    return {crearProductoReal, error};
};