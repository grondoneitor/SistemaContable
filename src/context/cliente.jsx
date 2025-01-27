import { createContext, useReducer } from "react";
import { ClienteReducer, InitialState } from "../reducer/ClienteReducer";


export  const ClienteContext = createContext()

// eslint-disable-next-line react/prop-types
export function ClienteProvider ({children}) {
  const [state, dispatch] = useReducer(ClienteReducer,InitialState )

  // const {clientesRetornados} = useClientes()
  
  const guardarClientes = (clientesRetornados)=>{
    dispatch({type:"guardar_clientes",payload:clientesRetornados })

  }
  const crearCliente = (cliente) =>{
    dispatch({type:"crear_cliente", payload: cliente})
  }
  const borrarCliente = (clientes) =>{
    dispatch({type:"borrar_cliente", payload:clientes})
  }
    return(

        <ClienteContext.Provider 
          value={{
            state,
            dispatch,
            guardarClientes,
            crearCliente,
            borrarCliente
          }}  
        >
        {children}
        </ClienteContext.Provider>
    )
}