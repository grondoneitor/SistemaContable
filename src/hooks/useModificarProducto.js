// useModificarrProducto.js
import { useState } from 'react';

export const useModificarProducto = () => {
    const [error, setError] = useState(null);
    const modificarProducto = async ( idProd, producto ) => {
        try {
            const response = await fetch(`http://localhost:8092/api/v1/producto/${idProd}`, {
                method: 'PUT',
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "estado": producto.estado,
                    "stock": Number(producto.stock),
                    "precio": producto.precio,
                    "descripcion": producto.descripcion,
                    "categoria":Number(producto.categoria),
                    "stock_Min": Number(producto.stock_Min),
                    "producto": producto.producto
                })
            });

            if (!response.ok) {

                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return true;
        } catch (err) {
            setError(err.message);
            return false;
        }
    };

    return { modificarProducto, error };
};
