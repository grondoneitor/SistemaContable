import { useContext, useEffect } from "react"
import { UltimasTransaccionesContext } from "../../context/ultimasTransacciones"
import { VentasContext } from "../../context/ventas"

export const useUltimasTransacciones =  () => {

    const token = localStorage.getItem("tokenLogin")
    const {guardarUltimasTransacciones} = useContext(UltimasTransaccionesContext)
    const {state} = useContext(VentasContext)
    useEffect(()=>{
         fetch('http://localhost:8092/api/v1/transacciones', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Contet-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => guardarUltimasTransacciones(data.object))
        .catch(error => console.error(error))
        // const data = await response.json()

        // if(!response.ok){
        //     throw data
        // }

        // return response
    },[state.ventaCreada, state.vantaModificada,state.ventaEliminada])

 



}