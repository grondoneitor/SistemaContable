import { useContext } from "react"
import { useCrearCliente } from "../../hooks/clientes/useCrearCliente"
import { ClienteContext } from "../../context/cliente"
import { useClientes } from "../../hooks/clientes/useClientes"

const prototypeCliente = {
  nombre_Completo: null,
  telefono: null,
  direccion: null,
  dni: null,
  mail: null,
}

const convertidor = (cliente) => {
  prototypeCliente.nombre_Completo = cliente.nombre
  prototypeCliente.telefono = cliente.telefono
  prototypeCliente.direccion = cliente.direccion
  prototypeCliente.dni = cliente.dni
  prototypeCliente.mail = cliente.mail
  return prototypeCliente
}


export default function ServiciosCrearCliente() {
const { crearClienteReal } = useCrearCliente()
const {crearCliente} = useContext(ClienteContext)
  const CrearCliente = async (cliente) => {
    const clienteFinal = convertidor(cliente)
  const suucces =  await crearClienteReal(clienteFinal)
    if(suucces ){
      crearCliente(clienteFinal)
    }
  }
  
  return { CrearCliente }
}
