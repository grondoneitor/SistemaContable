import { useCrearCliente } from "../../hooks/clientes/useCrearCliente"

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
  
  const CrearCliente = async (cliente) => {

    const clienteFinal = convertidor(cliente)
    console.log(cliente)
    await crearClienteReal(clienteFinal)

  }
  
  return { CrearCliente }
}
