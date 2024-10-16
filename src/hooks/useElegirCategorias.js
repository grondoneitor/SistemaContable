// import { useContext, useEffect } from "react";
// import { CategoriaContext } from "../context/categorias";
// import { MapeandoCategorias } from "./MapeandoCategorias";
// import { useMapeandoCategoriasPorNombre } from "./useMapeandoCategoriaPorNombre";

// export const useElegirCategorias = () => {
//     const {  error } = MapeandoCategorias()
//     const { state, mostrarCategorias, mostrarCategoriasBuscados } = useContext(CategoriaContext);
//     const { categoriasNombre } = useMapeandoCategoriasPorNombre()

//     useEffect(() => {

//         if (state.categorias.length > 0) {

//             mostrarCategorias(state.categorias);
//             mostrarCategoriasBuscados([])

//             if (state.nombreCategoriaBuscado !== "") {
//                 mostrarCategoriasBuscados(categoriasNombre);
//                 mostrarCategorias([]);
//             } else {
//                 mostrarCategoriasBuscados([])
//             }

//         }

//     }, [state.categorias, categoriasNombre, mostrarCategorias, mostrarCategoriasBuscados, state.nombreCategoriaBuscado]);

//     return { state: state, error }
// }