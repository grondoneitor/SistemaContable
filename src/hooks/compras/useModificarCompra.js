import { useContext } from "react"
import { ComprasContext } from "../../context/compras"


export  const  useModificarCompra = () =>{

    const token = localStorage.getItem("tokenLogin")
    const {guardarMensajeExito ,guardarMensajeError } = useContext(ComprasContext)
    const modificarCompra = async (compra) =>{
        console.log(compra)
        guardarMensajeExito("")
        guardarMensajeError("")
        try{
            const response = await fetch(`http://localhost:8092/api/v1/compra/${compra.id}`,{
                method: 'PUT',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(compra),
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

    return {modificarCompra}
}