import { useContext, useState } from "react";
import { ProductoContext } from "../context/productos";
import { useCrearProducto } from "../hooks/useCrearProducto";

export const ServiciosCrear = () => {
    const [producto, setProducto] = useState({
        producto: "",
        precio: "",
        descripcion: "",
        categoria: "",
        stock: "",
        stock_Min: ""
    });
    const { crearProducto } = useContext(ProductoContext);

    const { crearProductoReal } = useCrearProducto();

    const handleOnSubmit = async (e) => {
        e.preventDefault(); 
        const nuevoProducto = { ...producto }; 

        await crearProductoReal(nuevoProducto);
        crearProducto(nuevoProducto)
        setProducto({
            producto: "",
            precio: "",
            descripcion: "",
            categoria: "",
            stock: "",
            stock_Min: ""
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto((prevState) => ({
            ...prevState, 
            [name]: value 
        }));
    };

    return { handleOnSubmit, handleChange, producto }
}
