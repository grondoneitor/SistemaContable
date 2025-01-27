import { useContext, useState } from "react"
import { useBorrarCliente } from "../../hooks/clientes/useBorrarCliente"
import { ClienteContext } from "../../context/cliente"



export default function ServiciosBorrarCliente () {
    const {borrarClienteReal} = useBorrarCliente()
    const {borrarCliente} = useContext(ClienteContext)
    const [isMoved, setIsMoved] = useState(false)
     
    const BorrarCliente = async (ids) =>{
         console.log(ids)
        const succes = await borrarClienteReal(ids)
        console.log(succes)
        if(succes.ok){
            console.log("Salio bien")
            borrarCliente(ids)
            setIsMoved(true)
            functionMoved()
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
    return {BorrarCliente, isMoved}
}