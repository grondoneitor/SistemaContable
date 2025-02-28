import { useContext } from 'react';
import { ProductoContext } from '../../context/productos';

export const useBorrarProducto = () => {
    const { mensajeError, mensajeExito } = useContext(ProductoContext)
    const borrarProducto = async (ids) => {
        console.log(ids)
        mensajeError("")
        mensajeExito("")
        const token = localStorage.getItem("tokenLogin")
        try {
            const response = await fetch(`http://localhost:8092/api/v1/producto`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ids)

            });
            const data = await response.json()
            if (!response.ok) {
                throw data
            }
            mensajeExito(data.mensaje)
            return response;
        } catch (error) {
            mensajeError(error.mensaje);
            return error;
        }
    };

    return { borrarProducto };
};
