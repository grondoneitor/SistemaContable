import { useContext, useEffect } from "react";
import { VentasContext } from "../../context/ventas";


export default function useMapeandoVenta() {
    const{guardarVentas} = useContext(VentasContext)
    const token = localStorage.getItem("tokenLogin")

    useEffect(() => {
        fetch("http://localhost:8092/api/v1/ventas", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        })
            .then(response => response.json())
            .then(data => guardarVentas(data.object))
            .catch(err => console.log(err))
    }, [])


}