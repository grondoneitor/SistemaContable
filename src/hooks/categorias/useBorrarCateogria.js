import {  useState } from 'react';

export const useBorrarCategoria = () => {
    const [error, setError] = useState(null);
    const borrarCategoriaR = async (ids ) => {
        console.log( ids)
        try {
            const response = await fetch(`http://localhost:8092/api/v1/categoria`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ids)
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            return response;
        } catch (err) {
            setError(err.message);
            return false;
        }
    };
    
    return { borrarCategoriaR, error };
};
