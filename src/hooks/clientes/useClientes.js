import { useContext, useEffect, useState } from "react"
import { ClienteContext } from "../../context/cliente"

export const useClientes = ()=> {
   //  const [clientesRetornados, setClientesRetornados] = useState([])
    const {state,guardarClientes} = useContext(ClienteContext)
    useEffect(()=>{
        fetch("http://localhost:8092/api/v1/clientes")
          .then(response =>{
             if(!response.ok){
                throw new Error('Error' + response.status)
             }
             return response.json()
          })
          .then(data => guardarClientes(data.object))
          .catch(error => console.error(error))
    },[state.clienteCreadoNuevo])
}