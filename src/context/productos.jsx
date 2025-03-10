/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";
import { ProductReducer,InitialState } from "../reducer/ProductosReducer";

export const ProductoContext = createContext();

export function ProductoProvider({ children }) {

    const [state, dispatch] = useReducer(ProductReducer, InitialState)

    const mostrarProductos = (products) => {
        dispatch({ type: 'mostrar_productos', payload: products })
    }
    const crearProducto = (producto)=>{
        dispatch({ type: 'crear_producto', payload: producto })
    }
    const borrarProductoI = (producto) =>{
        dispatch({ type: 'borrar_producto', payload: producto })
    }
    const editarProducto = (producto) =>{
        dispatch({ type: 'editar_producto', payload: producto })
    }
    const detalleProducto = (id) =>{
        dispatch({ type: 'detalle_producto', payload: id })
    }
    const mensajeError = (error) =>{
        dispatch({ type: 'mensaje_error', payload: error })
    }
    const mensajeExito = (exito) =>{
        dispatch({ type: 'mensaje_exito', payload: exito })
    }
    const agregarFiltroCategoria = (categoria) =>{
        dispatch({ type: 'add_filter_categoria', payload: categoria })
    }
    const agregarFiltroNombre = (nombre) =>{
        dispatch({ type: 'add_filter_nombre', payload: nombre })
    }
    
    return (
        <ProductoContext.Provider value={{
            state,
            mostrarProductos,
            crearProducto,
            borrarProductoI,
            editarProducto,
            detalleProducto,
            mensajeError,
            mensajeExito,
            agregarFiltroCategoria,
            agregarFiltroNombre
        }}>
            {children}
        </ProductoContext.Provider>
    );
}
