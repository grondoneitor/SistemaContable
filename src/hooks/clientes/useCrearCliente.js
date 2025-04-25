import { useContext } from "react";
import { ClienteContext } from "../../context/cliente";

export const useCrearCliente = () => {
    const { mensajeError, mensajeExito } = useContext(ClienteContext)
    const crearClienteReal = async (cliente) => {
        mensajeError("")
        mensajeExito("")
        const storage = localStorage.getItem("tokenLogin")
        try {
            const response = await fetch('http://localhost:8092/api/v1/cliente', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${storage}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cliente),
            });
            const data = await response.json();
            if (!response.ok) {
                throw data
            }
            // const datita = await response.json();
            mensajeExito(data.mensaje)
            return {response, data};
        } catch (data) {
            mensajeError(data.mensaje)
            return data
        }
    };


    return { crearClienteReal };
};