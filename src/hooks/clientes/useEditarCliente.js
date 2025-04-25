import { useContext } from "react"
import { ClienteContext } from "../../context/cliente"

export const useEditarCliente = () => {

    const { mensajeError, mensajeExito } = useContext(ClienteContext)

    const EditarClienteReal = async (cliente) => {
        mensajeError("")
        mensajeExito("")
        const storage = localStorage.getItem("tokenLogin")
        try {
            if (cliente !== null) {
                const response = await fetch(`http://localhost:8092/api/v1/cliente/${cliente.id}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${storage}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "direccion": cliente.direccion,
                        "dni": cliente.dni,
                        "mail": cliente.mail,
                        "nombre_Completo": cliente.nombre,
                        "telefono": cliente.telefono
                    })
                })
                const data = await response.json()
                if (!response.ok) {throw data}
                mensajeExito(data.mensaje)
                return response;
            }
        } catch (data) {
            mensajeError(data.mensaje)
            return data
        }
    }

    return { EditarClienteReal }
}