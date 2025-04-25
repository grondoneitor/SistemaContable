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
  const clienteParaEditar = (cliente) =>{
    dispatch({type:"cliente_para_editar", payload:cliente})
  }
  const mensajeError = (mensajeError) => {
    dispatch({type:"mensaje_error", payload:mensajeError})
  }
  const mensajeExito = (mensajeExito) => {
    dispatch({type:"mensaje_exito", payload:mensajeExito})
  }
    return(

        <ClienteContext.Provider 
          value={{
            state,
            dispatch,
            guardarClientes,
            crearCliente,
            borrarCliente,
            clienteParaEditar,
            mensajeError,
            mensajeExito
          }}  
        >
        {children}
        </ClienteContext.Provider>
    )
}