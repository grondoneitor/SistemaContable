import { useContext } from "react"
import { ComprasContext } from "../../context/compras"

export const useCrearCompra = () => {
    const { guardarMensajeExito, guardarMensajeError } = useContext(ComprasContext)
    const token = localStorage.getItem("tokenLogin")
    const crearCompraReal = async (compra) => {
        guardarMensajeExito("")
        guardarMensajeError("")
        try {
            const response = await fetch("http://localhost:8092/api/v1/compra", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(compra)
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

    return { crearCompraReal }
}