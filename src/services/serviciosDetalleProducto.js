import { useContext, useEffect } from "react";
import { ProductoContext } from "../context/productos";
import { useNavigate } from "react-router-dom";
import { useMapeandoProductosPorId } from '../hooks/useMapeandoPorId'
import { useBorrarProducto } from '../hooks/useBorrarProducto'
import { useModificarProducto } from '../hooks/useModificarProducto'
import { useMapeandoProductos } from "../hooks/useMapeandoProductos";
export const ServiciosDetalleProducto = (id) => {
    const { productosId } = useMapeandoProductosPorId(id)
    const { modificarProducto,error } = useModificarProducto()
    const { borrarProducto } = useBorrarProducto()
    const {state, borrarProductoI, editarProducto } = useContext(ProductoContext)
    
    // const handleDelete = async () => {
    //     console.log(state.productos  )
    //     const success = await borrarProducto(id);
    //     if (success) {
            
    //         borrarProductoI(id); // Aquí actualizas el contexto
          
    //     }
    //     console.log(state.productos)
    
    // };
    const handleDelete = async () => {
            
            const success = await borrarProducto(id)
            
            if (success) {
                borrarProductoI(id)  // Eliminar producto del contexto
                console.log("Producto eliminado correctamente del contexto.")
            }
     
        // Verifica el estado actualizado (esto puede estar duplicado si la eliminación en el contexto se realiza correctamente)
        console.log("Después de eliminar, productos: ", state.productos)
    }

    const onSubmitModificar = async (data) => {
        const success = await modificarProducto(id, data); 
        if (success) {
            editarProducto({ ...data, id });  // Llama a actualizarProducto para refrescar el estado
            
        }
    };

  
    return {  handleDelete, error,productosId, onSubmitModificar }
}