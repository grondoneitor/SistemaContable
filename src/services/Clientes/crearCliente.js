import { useContext, useEffect, useState } from "react"
import { useCrearCliente } from "../../hooks/clientes/useCrearCliente"
import { ClienteContext } from "../../context/cliente"

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


export default function ServiciosCrearCliente(reset) {
const { crearClienteReal } = useCrearCliente()
const {crearCliente} = useContext(ClienteContext)
const [isMoved, setIsMoved] = useState(false)

  const CrearCliente = async (cliente) => {
  const clienteFinal = convertidor(cliente)
  const suucces =  await crearClienteReal(clienteFinal)
    if(suucces.ok){
      crearCliente(clienteFinal)
      setIsMoved(true)
      console.log(isMoved)
      functionMoved()
    }
    reset()
  }
  
  const functionMoved = () => {
    if (isMoved === false ) {
        setIsMoved(true)
        setTimeout(() => {
            setIsMoved(false)
        }, 2000)
    }
}






  return { CrearCliente,isMoved }
}
