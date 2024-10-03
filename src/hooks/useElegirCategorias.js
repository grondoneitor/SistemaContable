import { useContext, useEffect } from "react";
import { CategoriaContext } from "../context/categorias";
import { useMapeandoCategorias } from "./useMapeandoCategorias";
import { useMapeandoCategoriasPorNombre } from "./useMapeandoCategoriaPorNombre";

export const useElegirCategorias = () => {
    const { allCategorias, error } = useMapeandoCategorias()
    const { MapearCatNomrbre } = useMapeandoCategoriasPorNombre()
    const { state, mostrarCategorias, mostrarCategoriasBuscados } = useContext(CategoriaContext);
    useEffect(() => {
        if (allCategorias.length > 0) {
            mostrarCategorias(allCategorias);
            mostrarCategoriasBuscados([])

            if (state.nombreCategoriaBuscado !== "") {
                const { categoriasNombre } = MapearCatNomrbre()
                mostrarCategoriasBuscados(categoriasNombre);
                mostrarCategorias([]);
            } else {
                mostrarCategoriasBuscados([]); // Si no hay búsqueda, limpiar
            }

        }
    }, [allCategorias]);

    return { state: state, error }
}