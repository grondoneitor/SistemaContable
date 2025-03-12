import { createContext, useReducer } from "react";
import { InitialState, VentasReducer } from "../reducer/Ventas";



export const VentasContext = createContext()

// eslint-disable-next-line react/prop-types
export function VentasProvider({children}){

    const[state, dispatch] = useReducer(VentasReducer, InitialState)

    const guardarVentas = (ventas) =>{
        dispatch({type: 'guardar_ventas', payload: ventas})
    }

    const crearVentaContext = (venta)=>{
        dispatch({type: 'crear_venta_context', payload: venta})
    }
    const modificarVentaContext = (venta) =>{
        dispatch({type: 'modificar_venta_context', payload: venta})
    }
    const eliminarVentaContext = (venta) =>{
        dispatch({type: 'eliminar_venta_context', payload: venta})
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

        <VentasContext.Provider
           value={{
            state,
            dispatch,
            guardarVentas,
            crearVentaContext,
            modificarVentaContext,
            eliminarVentaContext,
            guardarMensajeExito,
            guardarMensajeError,
            filtroAddStart,
            filtroAddEnd
        
        }}
        >
            {children}
        </VentasContext.Provider>
    )

} 