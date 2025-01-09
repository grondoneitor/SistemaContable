import { createContext, useEffect, useReducer } from "react";
import { ClienteReducer, InitialState } from "../reducer/ClienteReducer";
import { useClientes } from "../hooks/clientes/useClientes";


export  const ClienteContext = createContext()

export function ClienteProvider ({children}) {
  const [state, dispatch] = useReducer(ClienteReducer,InitialState )

  const {clientesRetornados} = useClientes()

  useEffect(() =>{
    dispatch({type:"guardar_clientes",payload:clientesRetornados })
  },[clientesRetornados])
    return(

        <ClienteContext.Provider 
          value={{
            state
          }}  
        >
        {children}
        </ClienteContext.Provider>
    )
}