import { useContext } from "react";
import { CategoriaContext } from "../../context/categorias";

export const useCrearCategoria = () => {
    const { mensajeError, mensajeExito } = useContext(CategoriaContext)
    const crearCategoriaReal = async (categoria) => {
        mensajeError("")
        mensajeExito("")
        const token = localStorage.getItem("tokenLogin")
        try {
            const response = await fetch('http://localhost:8092/api/v1/categoria', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "categoria": categoria }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw data
            }
            mensajeExito(data.mensaje)
            return response;
        } catch (error) {
            mensajeError(error.mensaje);
            return error
        }
    };

    return { crearCategoriaReal };
};