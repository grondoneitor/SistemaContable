// useModificarrProducto.js
import { useContext } from 'react';
import { CategoriaContext } from '../../context/categorias';

export const useModificarCategoria = () => {
    const {mensajeError, mensajeExito} = useContext(CategoriaContext)
    const modificarCategoria = async ( objectFinal ) => {
        mensajeError("")
        mensajeExito("")
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
                    "id": objectFinal.id,
                    "categoria": objectFinal.categoria
                })
            });

            const data = await response.json()

            if (!response.ok) {
                throw data
            }
            mensajeExito(data.mensaje)
            return response;
        } catch (err) {
            mensajeError(err.mensaje);
            return false;
        }
    };

    return { modificarCategoria};
};
