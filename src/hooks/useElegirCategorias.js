import { useContext, useEffect } from "react";
import { CategoriaContext } from "../context/categorias";
import { useMapeandoCategorias } from "./useMapeandoCategorias";
import { useMapeandoCategoriasPorNombre } from "./useMapeandoCategoriaPorNombre";

export const useElegirCategorias = ()=>{
    const { state, mostrarCategorias,mostrarCategoriasBuscados } = useContext(CategoriaContext);
const { allCategorias, error } = useMapeandoCategorias()
const { categoriasNombre } = useMapeandoCategoriasPorNombre()

useEffect(() => {
    if (allCategorias.length > 0) {
        mostrarCategorias(allCategorias); 
        mostrarCategoriasBuscados([])

         if (state.nombreCategoriaBuscado !== "") {
            mostrarCategoriasBuscados(categoriasNombre);
            mostrarCategorias([]);
         } else {
            mostrarCategoriasBuscados([]); // Si no hay búsqueda, limpiar
         }

    }
}, [allCategorias,categoriasNombre]);

return {state: state, error}
}