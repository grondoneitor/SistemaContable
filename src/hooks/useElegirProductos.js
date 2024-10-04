import { useContext, useEffect } from "react";
import { useMapeandoProductos } from "./useMapeandoProductos";
import { useMapeandoProductosPorNombre } from "./useMapeandoProductosPorNombre";
import { ProductoContext } from "../context/productos";

export const useElegirProductos = ()=>{
    const { state, mostrarProductos, mostrarProductosBuscados } = useContext(ProductoContext);
const { allProducts, error } = useMapeandoProductos()
const { productosNombre } = useMapeandoProductosPorNombre()


useEffect(() => {
    console.log("desde elegir producto")
    if (allProducts.length > 0) {
        mostrarProductos(allProducts); // Despachar productos al contexto
        mostrarProductosBuscados([])

        if (state.nombreProductoBuscado !== "") {
            mostrarProductosBuscados(productosNombre);
            mostrarProductos([]);
        } else {
            mostrarProductosBuscados([]); // Si no hay búsqueda, limpiar
        }

    }
}, [allProducts, productosNombre, state.nombreProductoBuscado]);

return {state: state, error}
}