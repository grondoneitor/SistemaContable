import { useContext, useEffect } from "react";
import { ProductoContext } from "../context/productos";
import { useNavigate } from "react-router-dom";
import { useMapeandoProductosPorId } from '../hooks/useMapeandoPorId'
import { useBorrarProducto } from '../hooks/useBorrarProducto'
import { useModificarProducto } from '../hooks/useModificarProducto'
import { useMapeandoProductos } from "../hooks/useMapeandoProductos";
import { useMapeandoProductosPorNombre } from "../hooks/useMapeandoProductosPorNombre";
import { fetchCategoriaPorId } from "./fetchCategoriaPorId";
export const ServiciosDetalleProducto = (id) => {
    const { productosId } = useMapeandoProductosPorId(id)
    const { modificarProducto, error } = useModificarProducto()
    const { borrarProducto } = useBorrarProducto()
    const { state, borrarProductoI, editarProducto } = useContext(ProductoContext)


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

        const categoria = await fetchCategoriaPorId(Number(data.categoria))

        const dataFinal = { ...data, categoria }
        console.log(dataFinal)
        const success = await modificarProducto(id, dataFinal);
        if (success) {
            editarProducto({ ...dataFinal, id });  // Llama a actualizarProducto para refrescar el estado

        }
    };


    return { handleDelete, error, productosId, onSubmitModificar }
}