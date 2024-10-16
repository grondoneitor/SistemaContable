/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";
import { CategoriaReducer, InitialState } from "../reducer/CategoriasReducer";

export const CategoriaContext = createContext();

export function CategoriaProvider({ children }) {

    const [state, dispatch] = useReducer(CategoriaReducer, InitialState)

    const mostrarCategorias = (categorias) => {
        dispatch({ type: 'mostrar_categorias', payload: categorias })
    }
     const mostrarCategoriasBuscados = (categorias) => {
         dispatch({ type: 'buscar_categoria', payload: categorias })
     }
     const guardarNombreCatBuscados = (nombre) => {
         dispatch({ type: 'guardar_cat_categoria', payload: nombre })
     }
     const crearCategoria = (categoria)=>{
         dispatch({ type: 'crear_categoria', payload: categoria })
     }
     const borrarCategoria = (categoria) =>{
         dispatch({ type: 'borrar_categoria', payload: categoria })
     }
     const editarCategoria = (categoria) =>{
         dispatch({ type: 'editar_categoria', payload: categoria })
     }
     const categoriaCreada = (categ) =>{
        dispatch({ type: 'categoria_creada', payload: categ })
     }

    return (
        <CategoriaContext.Provider value={{
            state,
            mostrarCategorias,
            mostrarCategoriasBuscados,
            guardarNombreCatBuscados,
            crearCategoria,
            borrarCategoria,
            editarCategoria,
            categoriaCreada
        }}>
            {children}
        </CategoriaContext.Provider>
    );
}
