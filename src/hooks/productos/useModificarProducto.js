// useModificarrProducto.js
import { useContext} from 'react';
import { ProductoContext } from '../../context/productos';

export const useModificarProducto = () => {
    const {mensajeError, mensajeExito} = useContext(ProductoContext)
    const modificarProducto = async ( producto ) => {
        mensajeError("")
        mensajeExito("")
        const token = localStorage.getItem("tokenLogin")
        try {
            const response = await fetch(`http://localhost:8092/api/v1/producto/${producto.id}`, {
                method: 'PUT',
                headers: {
                    'accept': '*/*',
                    'Authorization':`Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // "estado": producto.estado,
                    "stock": Number(producto.stock),
                    "precio": producto.precio,
                    "descripcion": producto.descripcion,
                    "categoria":(producto.categoria),
                    "stock_Min": Number(producto.stock_Min),
                    "producto": producto.producto
                })
            });

            const data =  await response.json()

            if (!response.ok) {

                throw data
            }
             mensajeExito(data.mensaje)
            return response;
        } catch (err) {
            mensajeError(err.mensaje);
            return err;
        }
    };

    return { modificarProducto };
};
