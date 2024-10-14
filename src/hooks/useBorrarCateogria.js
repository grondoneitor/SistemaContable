// useBorrarProducto.js
import {  useState } from 'react';

export const useBorrarCategoria = () => {
    const [error, setError] = useState(null);
    const borrarCategoriaR = async (categ ) => {
        try {
            console.log(`Intentando eliminar cateogria con ID: ${categ.id_Categoria}`);
            const response = await fetch(`http://localhost:8092/api/v1/categoria`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    "id_Categoria": categ.id_Categoria,
                    "categoria":categ.categoria

                })
            });
    
            if (!response.ok) {
                const responseBody = await response.text();
                console.error(`Error del servidor: ${responseBody}`);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            console.log("Categoria eliminado con éxito");
            return true;
        } catch (err) {
            setError(err.message);
            console.error('Error al eliminar el Categoria:', err);
            return false;
        }
    };
    
    return { borrarCategoriaR, error };
};
