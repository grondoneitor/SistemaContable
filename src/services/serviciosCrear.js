import { useContext, useState } from "react";
import { ProductoContext } from "../context/productos";
import { useCrearProducto } from "../hooks/useCrearProducto";

export const ServiciosCrear = (reset) => {

    const { crearProducto } = useContext(ProductoContext);

    const { crearProductoReal, error } = useCrearProducto();
    const [respons, setRespons] = useState()
   
   
    const onSubmit = async (data) => {
       const nuevoProducto = { data };
       const datita = await crearProductoReal(nuevoProducto);
       console.log(datita)
       setRespons(datita.ok)
       console.log(datita.ok)
       reset()
    }


    return { onSubmit, respons, error }

}