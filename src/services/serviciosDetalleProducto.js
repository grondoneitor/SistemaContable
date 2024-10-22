import { useContext } from "react";
import { ProductoContext } from "../context/productos";
import { useNavigate } from "react-router-dom";
import { useMapeandoProductosPorId } from '../hooks/useMapeandoPorId'
import { useBorrarProducto } from '../hooks/useBorrarProducto'
import { useModificarProducto } from '../hooks/useModificarProducto'

export const ServiciosDetalleProducto = (id) => {
    const navigate = useNavigate()
    const { productosId } = useMapeandoProductosPorId(id)
    const { modificarProducto,error } = useModificarProducto()
    const { borrarProducto } = useBorrarProducto()
    const { borrarProductoI, editarProducto } = useContext(ProductoContext)


    const handleDelete = async (event) => {
        event.preventDefault();
        await borrarProducto(id)
        borrarProductoI(productosId)
        navigate("/productos")
    };

    const onSubmitModificar = async (data) =>{
        const success = await modificarProducto(id, data); 
        if (success) {
            editarProducto(data);
            navigate("/productos");
        }
    }

    return {  handleDelete, productosId: productosId, error, onSubmitModificar }
}