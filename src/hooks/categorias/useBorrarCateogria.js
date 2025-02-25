import {  useContext} from 'react';
import { CategoriaContext } from '../../context/categorias';

export const useBorrarCategoria = () => {
    const {mensajeError, mensajeExito} = useContext(CategoriaContext)
    const borrarCategoriaR = async (ids ) => {
       mensajeError("")
       mensajeExito("")
        const token = localStorage.getItem("tokenLogin")

        try {
            const response = await fetch(`http://localhost:8092/api/v1/categoria`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ids)
            });
    
            const data = await response.json()
             console.log("desde arriba ",response)
            if (!response.ok) {
                throw data;
            }
    
            console.log(response)
            mensajeExito(data.mensaje)
            return response;
        } catch (err) {
            console.log(err)
            mensajeError(err.mensaje);
            return err;
        }
    };
    
    return { borrarCategoriaR };
};
