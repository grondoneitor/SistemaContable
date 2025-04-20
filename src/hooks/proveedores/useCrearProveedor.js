import { useContext } from "react"
import { ProveedoresContext } from "../../context/proveedores"


export function useCrearProveedor() {
    const { mensajeExito, mensajeError } = useContext(ProveedoresContext)
    const crearProveedorReal = async (proveedor) => {
        mensajeExito("")
        mensajeError("")
        const token = localStorage.getItem('tokenLogin')
        try {
            const response = await fetch("http://localhost:8092/api/v1/proveedor", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(proveedor)
            })

            const data = await response.json()
            if (!response.ok) {
                throw data
            }
            console.log("mensaje ", data.mensaje )
            mensajeExito(data.mensaje)
            return {response, data};

        } catch (data) {
            mensajeError(data.mensaje)
        }
    }

    return { crearProveedorReal }
} 