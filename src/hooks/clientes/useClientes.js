import { useContext, useEffect } from "react"
import { ClienteContext } from "../../context/cliente"

export const useClientes = ()=> {
    const {state,guardarClientes} = useContext(ClienteContext)
    useEffect(()=>{
        fetch("http://localhost:8092/api/v1/clientes")
          .then(response =>{
             return response.json()
          })
          .then(data => guardarClientes(data.object))
          .catch(error => console.error(error))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[state.clienteCreadoNuevo, state.clientesBorrados, state.clienteParaEditar])
}