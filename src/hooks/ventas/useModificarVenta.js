import { useContext } from "react"
import { VentasContext } from "../../context/ventas"


export const useModificarVenta = () =>{

    const token = localStorage.getItem("tokenLogin")
    const {guardarMensajeExito ,guardarMensajeError } = useContext(VentasContext)
    const modificarVenta = async (venta) =>{
        console.log(venta)
        guardarMensajeExito("")
        guardarMensajeError("")
        try{
            const response = await fetch(`http://localhost:8092/api/v1/venta/${venta.id}`,{
                method: 'PUT',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(venta),
            })

            const data = await response.json()
            console.log(data)
            if(!response.ok){
                throw data
            }
            guardarMensajeExito(data.mensaje)
            return response
        }catch(err){
            console.log(err)
            guardarMensajeError(err.mensaje)
        }

    }

    return {modificarVenta}
}