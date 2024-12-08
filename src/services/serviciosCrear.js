import { useContext, useState } from "react";
// import { ProductoContext } from "../context/productos";
import { useCrearProducto } from "../hooks/useCrearProducto";
import { useMapeandoProductos } from "../hooks/useMapeandoProductos";
import { ProductoContext } from "../context/productos";
import { fetchCategoriaPorId } from "./fetchCategoriaPorId";

export const ServiciosCrear = (reset) => {

     const { crearProducto,state } = useContext(ProductoContext);

    const { crearProductoReal, error } = useCrearProducto();
    const [respons, setRespons] = useState()
    useMapeandoProductos()
   
    const onSubmit = async (data) => {
       const nuevoProducto = { data };
       const categoria = await fetchCategoriaPorId(Number(data.categoria))
       const dataFinal = { ...data, categoria }
       const datita = await crearProductoReal(nuevoProducto);
       if(datita && datita !== undefined) {
        setRespons(datita.ok)
        crearProducto(dataFinal)
    } 
       reset()
    }


    return { onSubmit, respons, error }

}