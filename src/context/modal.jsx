/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";
import { InitialState, ModalReducer } from "../reducer/ModalReducer";
import { useMapeandoProductos } from "../hooks/useMapeandoProductos";

export const ModalContext = createContext();

export function ModalProvider({ children }) {

    const [state, dispatch] = useReducer(ModalReducer, InitialState)
    const {allProducts} = useMapeandoProductos()
     const openModal = (productoSelected) => {
        dispatch({ type: 'open_modal', payload: {productoSelected, allProducts} })
    }
    const closeModal = () => {
        dispatch({ type: 'close_modal' })
    }

    return (
        <ModalContext.Provider value={{
            state,
            openModal,
            closeModal
        }}>
            {children}
        </ModalContext.Provider>
    );
}
