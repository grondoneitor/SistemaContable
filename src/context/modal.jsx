/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";
import { InitialState, ModalReducer } from "../reducer/ModalReducer";
import { ProductoContext } from "./productos";

export const ModalContext = createContext();

export function ModalProvider({ children }) {

    const [state, dispatch] = useReducer(ModalReducer, InitialState)
    const {state:statePro} = useContext(ProductoContext)
    const productos = statePro.productos
     const openModal = (productoSelected) => {
        dispatch({ type: 'open_modal', payload: {productoSelected,productos } })
    }
    const closeModal = () => {
        dispatch({ type: 'close_modal' })
    }
    const openModalCreate = () =>{
        dispatch({ type: 'open_modal_create' })
    }
    const closeModalCreate = () =>{
        dispatch({ type: 'close_modal_create' })
    }
    return (
        <ModalContext.Provider value={{
            state,
            openModal,
            closeModal,
            openModalCreate,
            closeModalCreate
        }}>
            {children}
        </ModalContext.Provider>
    );
}
