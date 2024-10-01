import { useContext, useEffect, useState } from "react";
import { ProductoContext } from "../context/productos";
import { useNavigate } from "react-router-dom";
import {useMapeandoProductosPorId} from '../hooks/useMapeandoPorId'
import {useBorrarProducto} from '../hooks/useBorrarProducto'
import {useModificarProducto} from '../hooks/useModificarProducto'

export const ServiciosDetalleProducto = (id)=>{
    const navigate = useNavigate()
    const { productosId } = useMapeandoProductosPorId(id)
    const { borrarProducto } = useBorrarProducto()
    const { borrarProductoI,editarProducto } = useContext(ProductoContext)
    const {modificarProducto} = useModificarProducto()

    const handleDelete = async (event) => {
        event.preventDefault();
        await borrarProducto(id)
        borrarProductoI(productosId)
        navigate("/productos")
    };

    const [producto, setProducto] = useState({
        id: id,
        stock_Min: "",
        descripcion: "",
        producto: "",
        stock: "",
        categoria:"",
        estado: "",
        precio: ""
    })
    // Cargar el producto al montar el componente
    useEffect(() => {
        if (productosId) {
            setProducto({
                id: productosId.id,
                stock_Min: productosId.stock_Min,
                descripcion: productosId.descripcion,
                producto: productosId.producto,
                stock: productosId.stock,
                categoria: productosId.categoria,
                estado: productosId.estado,
                precio: productosId.precio
            });
        }
        console.log(productosId.categoria + " viendo categoria")
    }, [productosId]);

    const handleModificar = async (event) => {
        event.preventDefault()
        const nuevoProducto = {...producto}
        console.log(nuevoProducto.producto + " nombre del producto  actualizao")
        const success = await modificarProducto(nuevoProducto.id, nuevoProducto); // Asegúrate de pasar el ID correctamente

        if (success) {
            editarProducto(nuevoProducto);
            navigate("/productos");
        }

        setProducto({
            id: "",
            stock_Min: "",
            descripcion: "",
            producto: "",
            stock: "",
            categoria:"",
            estado: "",
            precio: ""
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto((prevState) => ({
            ...prevState, // Mantén el estado anterior
            [name]: value // Actualiza solo el campo que cambió
        }));
    };
 return {handleChange, handleDelete, handleModificar,productosId:productosId }
}