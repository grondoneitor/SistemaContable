import { createContext, useReducer } from "react";
import { ProveedoresReducer } from "../reducer/ProveedoresReducer";
import { InitialState } from "../reducer/CategoriasReducer";


export const ProveedoresContext = createContext()


// eslint-disable-next-line react/prop-types
export  const  ProveedoresProvider = ({children}) =>{

    const [state, dispatch ] = useReducer(ProveedoresReducer,InitialState )

    const guardarProveedores = (proveeedores) =>{
        dispatch({type: 'guardar_proveedores', payload: proveeedores})
    }
    const crearProveedor = (proveedor) =>{
        dispatch({type: 'crear_proveedor', payload: proveedor})
    }
    const editarProveedor = (proveedor) =>{
        dispatch({type: 'editar_proveedor', payload: proveedor})
    }
    const eliminarProveedor = (ids) =>{
        dispatch({type: 'eliminar_proveedor', payload: ids})
    }
    
    const mensajeExito = (exito) =>{
        console.log("mostradno desde contexxt ", exito)
        dispatch({type: 'mensaje_exito', payload: exito})
    }
    const mensajeError= (error) =>{
        dispatch({type: 'mensaje_error', payload: error})
    }

    return(
        <ProveedoresContext.Provider
        
           value={{
            dispatch,
            state,
            guardarProveedores,
            crearProveedor,
            editarProveedor,
            eliminarProveedor,
            mensajeExito,
            mensajeError
           }}
        >
            {children}
        </ProveedoresContext.Provider>
    )
}