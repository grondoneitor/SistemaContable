import { useContext, useEffect } from "react";
import { ComprasContext } from "../../context/compras";


export default function useMapeandoCompra() {
    const{guardarCompras, state} = useContext(ComprasContext)
    const token = localStorage.getItem("tokenLogin")
    if(state.filtersCompras.start == null) state.filtersCompras.start = ""
    if(state.filtersCompras.end == null) state.filtersCompras.end = ""
    useEffect(() => {
        fetch(`http://localhost:8092/api/v1/compras`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        })
            .then(response => response.json())
            .then(data => guardarCompras(data.object))
            .catch(err => console.log(err))
    }, [state.compraCreada, state.compraModificada, state.compraEliminada, state.filtersCompras])


}