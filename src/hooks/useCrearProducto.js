import { useState } from "react";
import { useMapeandoProductos } from "./useMapeandoProductos";

export const  useCrearProducto = () => {
    const [error, setError] = useState(null)
    const crearProductoReal = async (producto) => {
        try {
            const response = await fetch('http://localhost:8092/api/v1/producto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(producto.data),
            });
            
            if (!response.ok) {
                throw new Error('Error al crear el producto');
            }
            const datita = await response.json();
            return response; 
        } catch (error) {
            setError(error)
        }
    };
    useMapeandoProductos()

    return {crearProductoReal, error};
};