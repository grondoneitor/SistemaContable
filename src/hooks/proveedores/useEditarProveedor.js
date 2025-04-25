import { useContext } from "react"
import { ProveedoresContext } from "../../context/proveedores"


export default function useEditarProveedor() {
    
    const {mensajeExito, mensajeError} = useContext(ProveedoresContext)

    const editarProveedorReal = async (proveedor) =>{

        mensajeError("")
        mensajeExito("")
        try{

            const response = await fetch(`http://localhost:8092/api/v1/proveedor/${proveedor.id}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('tokenLogin'),
                    },
                    body: JSON.stringify({
                        "nombre":proveedor.nombre,
                        "contacto":proveedor.contacto,
                        "rubro": proveedor.rubro
                    }),
            })
  
            const data = await response.json()

            if(!response.ok){
                throw data
            }
            mensajeExito(data.mensaje)
            return response

        }catch(data){
            console.log(data)
            mensajeError(data.mensaje)
            return data
        }
    }

    return {editarProveedorReal}
}