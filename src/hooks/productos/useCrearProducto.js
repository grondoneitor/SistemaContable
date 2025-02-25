import { useContext} from "react";
import { ProductoContext } from "../../context/productos";

export const  useCrearProducto = () => {
    const {mensajeError, mensajeExito } = useContext(ProductoContext)
    const crearProductoReal = async (producto) => {
        mensajeError("")
        mensajeExito("")
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
            mensajeExito(datita.mensaje)
            return response; 
        } catch (error) {
            mensajeError(error.mensaje)
            return error
        }
    };

    return {crearProductoReal};
};