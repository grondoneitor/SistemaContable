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
    const [isMistake, setIsMistake] = useState(false)
    const { EditarClienteReal } = useEditarCliente()


    const BorrarCliente = async (ids) =>{
        const success = await borrarClienteReal(ids)
        console.log(success)
        if(success){
          console.log("Se borrooo")
            borrarCliente(ids)
            functionMoved()
        }else{
          functionMistake()
        }
    }

      const CrearCliente = async (cliente) => {
      const clienteFinal = convertidor(cliente)
      const success =  await crearClienteReal(clienteFinal)
        if(success.ok ){
          crearCliente(clienteFinal)
          reset()
           functionMoved()
        }else{
          functionMistake()
        } 
      
      }
      



    const EditarCliente = async (cliente) => {
        const success = await EditarClienteReal(cliente)
        console.log(success)
        if (success.ok) {
            clienteParaEditar(cliente)
            reset()
            console.log("exito")
            functionMoved()
        }else{
          functionMistake()
          console.log("error")
        }
       
    }

    const functionMoved = () =>{
        if(isMoved === false){
            setIsMoved(true)
            setTimeout(() => {
                setIsMoved(false)
            },[2000])
        }

    }
    const functionMistake = () =>{
      if(isMistake === false){
          setIsMistake(true)
          setTimeout(() => {
              setIsMistake(false)
          },[2000])
      }

  }
    return {BorrarCliente,CrearCliente,EditarCliente, isMoved, isMistake}
}