import { useContext, useEffect } from "react";
import { VentasContext } from "../../context/ventas";


export default function useMapeandoVenta() {
    const{guardarVentas, state} = useContext(VentasContext)
    const token = localStorage.getItem("tokenLogin")
    console.log(state.filtersVentas)
    if(state.filtersVentas.start == null) state.filtersVentas.start = ""
    if(state.filtersVentas.end == null) state.filtersVentas.end = ""
    useEffect(() => {
        fetch(`http://localhost:8092/api/v1/ventas?start=${state.filtersVentas.start}&end=${state.filtersVentas.end}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        })
            .then(response => response.json())
            .then(data => guardarVentas(data.object))
            .catch(err => console.log(err))
    }, [state.ventaCreada, state.vantaModificada, state.ventaEliminada, state.filtersVentas])


}