// useModificarrProducto.js
import { useState } from 'react';

export const useModificarProducto = () => {
    const [error, setError] = useState(null);
    const modificarProducto = async ( idProd, producto ) => {
        try {
            console.log(`Intentando modificar producto con ID: ${idProd}`);
            console.log("Datos a enviar:", producto);

            const response = await fetch(`http://localhost:8092/api/v1/producto/${idProd}`, {
                method: 'PUT',
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "estado": producto.estado,
                    "stock": producto.stock,
                    "precio": producto.precio,
                    "descripcion": producto.descripcion,
                    "stock_Min": producto.stock_Min,
                    "producto": producto.producto
                })
            });

            if (!response.ok) {
                const responseBody = await response.text();
                console.error(`Error del servidor: ${responseBody}`);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            console.log("Producto actualizado con éxito");
            return true;
        } catch (err) {
            setError(err.message);
            console.error('Error al actualizado el producto:', err);
            return false;
        }
    };

    return { modificarProducto, error };
};
