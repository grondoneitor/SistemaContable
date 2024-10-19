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

    const handleModificar = async (e) => {

        e.preventDefault(); 
        const valores = e.currentTarget;
        const data = new FormData(valores);
       
        const formDataObj = {};
        data.forEach((value, key) => {
            formDataObj[key] = value;
        });
        
        const success = await modificarProducto(id, formDataObj); 

        if (success) {
            editarProducto(formDataObj);
            navigate("/productos");
        }
    }
    return {  handleDelete, handleModificar, productosId: productosId, error }
}