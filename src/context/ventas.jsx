import { createContext, useReducer } from "react";
import { InitialState, VentasReducer } from "../reducer/ventas";



export const VentasContext = createContext()

export function VentasProvider({children}){

    const[state, dispatch] = useReducer(VentasReducer, InitialState)

    const guardarVentas = (ventas) =>{
        dispatch({type: 'guardar_ventas', payload: ventas})
    }

    return(

        <VentasContext.Provider
           value={{
            state,
            dispatch,
            guardarVentas
        
        }}
        >
            {children}
        </VentasContext.Provider>
    )

} 