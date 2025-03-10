import { createContext,  useReducer } from "react";
import { InitialState, UltimasTransaccionesReducer } from "../reducer/UltimasTransacciones";

export const UltimasTransaccionesContext = createContext()

// eslint-disable-next-line react/prop-types
export const UltimasTransaccionesProvider = ({ children }) => {

    const [state, dispatch] = useReducer(UltimasTransaccionesReducer, InitialState)

    const guardarUltimasTransacciones = (transacciones) => {
        dispatch({ type: 'guardar_transacciones', payload: transacciones })
    }

    return (
        <UltimasTransaccionesContext.Provider
            value={{
                state,
                guardarUltimasTransacciones
            }}>
            {children}
        </UltimasTransaccionesContext.Provider>
    )
}