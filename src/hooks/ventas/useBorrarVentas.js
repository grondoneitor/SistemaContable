import { useContext } from "react"
import { VentasContext } from "../../context/ventas"

export const useBorrarVentas = () => {

    const token = localStorage.getItem("tokenLogin")
    const { guardarMensajeExito, guardarMensajeError } = useContext(VentasContext)

    const borrarVentas = async (ids) => {
        guardarMensajeError("")
        guardarMensajeExito("")
        try {
            const response = await fetch("http://localhost:8092/api/v1/venta", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(ids)
            })
            const data = await response.json()
            console.log("data ", data)
            if (!response.ok) {
                throw data
            }
            guardarMensajeExito(data.mensaje)
            return response
        } catch (data) {
            guardarMensajeError(data.mensaje)
        }

    }

    return { borrarVentas }
}