import { useContext, useState } from "react"
import { useBorrarCliente } from "../../hooks/clientes/useBorrarCliente"
import { ClienteContext } from "../../context/cliente"
import { useCrearCliente } from "../../hooks/clientes/useCrearCliente"
import { useEditarCliente } from "../../hooks/clientes/useEditarCliente"


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

export default function ServiciosCliente (reset) {
    const {borrarClienteReal} = useBorrarCliente()
    const {borrarCliente,crearCliente,clienteParaEditar} = useContext(ClienteContext)
    const { crearClienteReal } = useCrearCliente()
    const [isMoved, setIsMoved] = useState(false)
    const { EditarClienteReal } = useEditarCliente()


    const BorrarCliente = async (ids) =>{
        const succes = await borrarClienteReal(ids)
        if(succes.ok){
            borrarCliente(ids)
            setIsMoved(true)
            functionMoved()
        }
    }

      const CrearCliente = async (cliente) => {
      const clienteFinal = convertidor(cliente)
      console.log(cliente)
      const success =  await crearClienteReal(clienteFinal)
        if(success){
          console.log(success)
          crearCliente(clienteFinal)
          setIsMoved(true)
          functionMoved()
        }
        reset()
      }
      



    const EditarCliente = async (cliente) => {
        const succes = await EditarClienteReal(cliente)
        if (succes) {
            clienteParaEditar(cliente)
            functionMoved()
        }
        reset()
    }

    const functionMoved = () =>{
        if(isMoved === false){
            setIsMoved(true)
            setTimeout(() => {
                setIsMoved(false)
            },[2000])
        }

    }
    return {BorrarCliente,CrearCliente,EditarCliente, isMoved}
}