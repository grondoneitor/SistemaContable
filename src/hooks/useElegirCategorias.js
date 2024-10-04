import { useContext, useEffect } from "react";
import { CategoriaContext } from "../context/categorias";
import { useMapeandoCategorias } from "./useMapeandoCategorias";
import { useMapeandoCategoriasPorNombre } from "./useMapeandoCategoriaPorNombre";

export const useElegirCategorias = () => {
    const { allCategorias, error } = useMapeandoCategorias()
    const { state, mostrarCategorias, mostrarCategoriasBuscados } = useContext(CategoriaContext);
    const { categoriasNombre } = useMapeandoCategoriasPorNombre()

    useEffect(() => {

        console.log(state.nombreCategoriaBuscado + " categoria")

        if (allCategorias.length > 0) {
            mostrarCategorias(allCategorias);

            mostrarCategorias(allCategorias);
            mostrarCategoriasBuscados([])

            if (state.nombreCategoriaBuscado !== "") {
                console.log(state.nombreCategoriaBuscado + " nombree2")
                mostrarCategoriasBuscados(categoriasNombre);
                mostrarCategorias([]);
            } else {
                mostrarCategoriasBuscados([]); // Si no hay búsqueda, limpiar
            }

        }

    }, [allCategorias,categoriasNombre,state.nombreCategoriaBuscado]);

    return { state: state, error }
}