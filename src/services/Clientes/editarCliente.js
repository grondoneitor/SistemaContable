import { useContext, useState } from "react"
import { useClienteById } from "../../hooks/clientes/useCLienteById"
import { useEditarCliente } from "../../hooks/clientes/useEditarCliente"
import { ClienteContext } from "../../context/cliente"


export default function ServiciosEditarCliente () {
    const {EditarClienteReal} = useEditarCliente()
   const {clienteParaEditar} = useContext(ClienteContext)
    const EditarCliente  = async (cliente)=>{
        console.log(cliente)
          const succes = await EditarClienteReal(cliente)
          console.log(succes)
          if(succes) {
            clienteParaEditar(cliente)
          }
    }


    return {EditarCliente}
}