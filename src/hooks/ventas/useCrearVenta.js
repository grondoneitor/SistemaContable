import { useContext } from "react"
import { VentasContext } from "../../context/ventas"

export const useCrearVenta = () => {
    const { guardarMensajeExito, guardarMensajeError } = useContext(VentasContext)
    const token = localStorage.getItem("tokenLogin")
    const crearVentaReal = async (venta) => {
        guardarMensajeExito("")
        guardarMensajeError("")
        try {
            const response = await fetch("http://localhost:8092/api/v1/venta", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(venta)
            })

            const data = await response.json()
            console.log(data)
            if (!response.ok) {
                throw data
            }
            guardarMensajeExito(data.mensaje)
            return response;

        } catch (Err) {
            guardarMensajeError(Err.mensaje)
        }

    }

    return { crearVentaReal }
}