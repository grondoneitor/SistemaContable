// useBorrarProducto.js
import {  useState } from 'react';

export const useBorrarProducto = () => {
    const [error, setError] = useState(null);
    const borrarProducto = async (id ) => {
        try {
            console.log(`Intentando eliminar producto con ID: ${id}`);
            const response = await fetch(`http://localhost:8092/api/v1/producto/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    
            if (!response.ok) {
                const responseBody = await response.text();
                console.error(`Error del servidor: ${responseBody}`);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            console.log("Producto eliminado con éxito");
            return true;
        } catch (err) {
            setError(err.message);
            console.error('Error al eliminar el producto:', err);
            return false;
        }
    };
    
    return { borrarProducto, error };
};
