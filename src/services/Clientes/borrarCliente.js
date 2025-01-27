import { useContext } from "react"
import { useBorrarCliente } from "../../hooks/clientes/useBorrarCliente"
import { ClienteContext } from "../../context/cliente"



export default function ServiciosBorrarCliente () {
    const {borrarClienteReal} = useBorrarCliente()
    const {borrarCliente} = useContext(ClienteContext)
    const BorrarCliente = async (ids) =>{
         console.log(ids)
        const succes = await borrarClienteReal(ids)
        console.log(succes)
        if(succes.ok){
            console.log("Salio bien")
            borrarCliente(ids)
        }
    }

    return {BorrarCliente}
}