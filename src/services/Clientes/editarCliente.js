import { useContext, useState } from "react"
import { useEditarCliente } from "../../hooks/clientes/useEditarCliente"
import { ClienteContext } from "../../context/cliente"


export default function ServiciosEditarCliente() {
    const { EditarClienteReal } = useEditarCliente()
    const { clienteParaEditar } = useContext(ClienteContext)
    const [isMoved, setIsMoved] = useState(false)


    const EditarCliente = async (cliente) => {
        const succes = await EditarClienteReal(cliente)
        if (succes) {
            clienteParaEditar(cliente)
            functionMoved()
        }
    }

    const functionMoved = () => {
        if (isMoved === false) {
            setIsMoved(true)
            setTimeout(() => {
                setIsMoved(false)
            }, 2000)
        }
    }

    return { EditarCliente, isMoved}
}