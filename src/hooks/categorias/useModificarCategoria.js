// useModificarrProducto.js
import { useState } from 'react';

export const useModificarCategoria = () => {
    const [error, setError] = useState(null);
    const modificarCategoria = async ( objectFinal ) => {
        const token = localStorage.getItem("tokenLogin")
        try {

            const response = await fetch(`http://localhost:8092/api/v1/categoria`, {
                method: 'PUT',
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "id_Categoria": objectFinal.id_Categoria,
                    "categoria": objectFinal.categoria
                })
            });

            if (!response.ok) {
                const responseBody = await response.text();
                console.error(`Error del servidor: ${responseBody}`);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            console.log("Categoria actualizada con éxito");
            return true;
        } catch (err) {
            setError(err.message);
            console.error('Error al actualizar la categoria:', err);
            return false;
        }
    };

    return { modificarCategoria, error };
};
