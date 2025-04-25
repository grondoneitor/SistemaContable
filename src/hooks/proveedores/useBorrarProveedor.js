import { useContext } from "react"
import { ProveedoresContext } from "../../context/proveedores"


export default function useBorrarProveedor() {

    const {mensajeExito, mensajeError} = useContext(ProveedoresContext)

    const borrarProveedorReal = async (ids) => {
       mensajeError("")
       mensajeExito("")
        try {
            const response = await fetch(`http://localhost:8092/api/v1/proveedores`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('tokenLogin')}`
                },
                body: JSON.stringify(ids)
            })

            const data = await response.json()
            if(!response.ok ){
                throw data
            }
            mensajeExito(data.mensaje)
            return response
        } catch (data) {
            console.log(data)
            mensajeError(data.mensaje)
             return data
        }
    }

    return {borrarProveedorReal}
}