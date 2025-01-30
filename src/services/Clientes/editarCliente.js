import { useState } from "react"
import { useClienteById } from "../../hooks/clientes/useCLienteById"
import { useEditarCliente } from "../../hooks/clientes/useEditarCliente"


export default function ServiciosEditarCliente () {
    const {EditarClienteReal} = useEditarCliente()
    const {ClienteById} = useClienteById()
    const [cliente, setCliente] = useState(null)
    const EditarCliente  = async (id)=>{
          const clienteId = await ClienteById(id)
          const succes = await EditarClienteReal(clienteId)
          console.log(succes)
    }
    // const BuscarClienteById =  (id) =>{
    //     const clienteId =  ClienteById(id)
    //      return clienteId
    // }

    return {EditarCliente}
}