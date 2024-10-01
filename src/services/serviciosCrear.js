import { useContext, useState } from "react";
import { ProductoContext } from "../context/productos";
import { useCrearProducto } from "../hooks/useCrearProducto";

export const ServiciosCrear =( )=> {
    const [producto, setProducto] = useState({
        producto: "",
        precio: "",
        descripcion: "",
        stock: "",
        stock_Min: ""
    });
    const { crearProducto} = useContext(ProductoContext);

    const {crearProductoReal} = useCrearProducto();

    const handleOnSubmit = async (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto

        const nuevoProducto = { ...producto }; // Usa el estado directamente

        // Llama a la función para crear el producto
        await crearProductoReal(nuevoProducto);
        crearProducto(nuevoProducto)
        // Resetea el estado del formulario
        setProducto({
            producto: "",
            precio: "",
            descripcion: "",
            stock: "",
            stock_Min: ""
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto((prevState) => ({
            ...prevState, // Mantén el estado anterior
            [name]: value // Actualiza solo el campo que cambió
        }));
    };

  return{handleOnSubmit, handleChange,producto}
}
