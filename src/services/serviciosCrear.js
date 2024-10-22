import { useContext } from "react";
import { ProductoContext } from "../context/productos";
import { useCrearProducto } from "../hooks/useCrearProducto";

export const ServiciosCrear = (reset) => {

    const { crearProducto } = useContext(ProductoContext);

    const { crearProductoReal } = useCrearProducto();


    const onSubmit = async (data) => {
        const nuevoProducto = { data };
        const succes = await crearProductoReal(nuevoProducto);
        if (succes)crearProducto(nuevoProducto) 
        reset()
    }

    return { onSubmit }

}