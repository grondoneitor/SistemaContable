/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";
import { ProductReducer,InitialState } from "../reducer/ProductosReducer";

export const ProductoContext = createContext();

export function ProductoProvider({ children }) {

    const [state, dispatch] = useReducer(ProductReducer, InitialState)

    const mostrarProductos = (products) => {
        dispatch({ type: 'mostrar_productos', payload: products })
    }
    const mostrarProductosBuscados = (products) => {
        dispatch({ type: 'buscador_productos', payload: products })
    }
    const guardarNombreProBuscados = (nombre) => {
        dispatch({ type: 'guardar_pro_buscado', payload: nombre })
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
    return (
        <ProductoContext.Provider value={{
            state,
            mostrarProductos,
            mostrarProductosBuscados,
            guardarNombreProBuscados,
            crearProducto,
            borrarProductoI,
            editarProducto,
            detalleProducto
        }}>
            {children}
        </ProductoContext.Provider>
    );
}
