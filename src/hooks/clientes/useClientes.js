import { useEffect, useState } from "react"

export const useClientes = ()=> {
    const [clientesRetornados, setClientesRetornados] = useState([])

    useEffect(()=>{
        fetch("http://localhost:8092/api/v1/clientes")
          .then(response =>{
             if(!response.ok){
                throw new Error('Error' + response.status)
             }
             return response.json()
          })
          .then(data => setClientesRetornados(data.object))
          .catch(error => console.error(error))
    },[])
    return{clientesRetornados}
}