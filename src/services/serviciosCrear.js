import { useContext } from "react";
import { ProductoContext } from "../context/productos";
import { useCrearProducto } from "../hooks/useCrearProducto";
import { useMapeandoProductos } from "../hooks/useMapeandoProductos";

export const ServiciosCrear = (reset) => {

    const { crearProducto } = useContext(ProductoContext);

    const { crearProductoReal } = useCrearProducto();

    const onSubmit = async (data) => {
        const nuevoProducto = { data };
        await crearProductoReal(nuevoProducto);
        reset()
    }

    return { onSubmit }

}