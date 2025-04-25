import { createContext, useReducer } from "react";
import { ComprasReducer, InitialState } from "../reducer/ComprasReducer";
export const ComprasContext = createContext()

// eslint-disable-next-line react/prop-types
export function ComprasProvider({children}){

    const[state, dispatch] = useReducer(ComprasReducer, InitialState)

    const guardarCompras = (compras) =>{
        dispatch({type: 'guardar_compras', payload: compras})
    }

    const crearCompraContext = (compra)=>{
        dispatch({type: 'crear_compra_context', payload: compra})
    }
    const modificarCompraContext = (compra) =>{
        dispatch({type: 'modificar_compra_context', payload: compra})
    }
    const eliminarCompraContext = (compra) =>{
        dispatch({type: 'eliminar_compra_context', payload: compra})
    }
    const guardarMensajeExito = (exito) => {
        dispatch({type: 'guardar_mensaje_exito', payload: exito})
    }
   
    const guardarMensajeError = (error) =>{
        dispatch({type: 'guardar_mensaje_error', payload: error})
    }
    const filtroAddStart = (start) =>{
        dispatch({type: 'add_filter_start', payload: start})
    }

    const filtroAddEnd = (end) =>{
        dispatch({type: 'add_filter_end', payload: end})
    }
    return(

        <ComprasContext.Provider
           value={{
            state,
            dispatch,
            guardarCompras,
            crearCompraContext,
            modificarCompraContext,
            eliminarCompraContext,
            guardarMensajeExito,
            guardarMensajeError,
            filtroAddStart,
            filtroAddEnd
        
        }}
        >
            {children}
        </ComprasContext.Provider>
    )

} 