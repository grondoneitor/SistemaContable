import { useContext, useEffect } from "react";
import { CategoriaContext } from "../context/categorias";
import { useMapeandoCategorias } from "./useMapeandoCategorias";
import { useMapeandoCategoriasPorNombre } from "./useMapeandoCategoriaPorNombre";

export const useElegirCategorias = () => {
    const { allCategorias, error } = useMapeandoCategorias()
    const { state, mostrarCategorias, mostrarCategoriasBuscados } = useContext(CategoriaContext);
    const { categoriasNombre } = useMapeandoCategoriasPorNombre()

    useEffect(() => {

        if (allCategorias.length > 0) {

            mostrarCategorias(allCategorias);
            mostrarCategoriasBuscados([])

            if (state.nombreCategoriaBuscado !== "") {
                mostrarCategoriasBuscados(categoriasNombre);
                mostrarCategorias([]);
            } else {
                mostrarCategoriasBuscados([])
            }

        }

    }, [allCategorias,categoriasNombre,state.nombreCategoriaBuscado]);

    return { state: state, error }
}