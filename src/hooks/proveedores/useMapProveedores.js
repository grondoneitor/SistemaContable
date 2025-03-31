import { useContext, useEffect } from "react";
import { ProveedoresContext } from "../../context/proveedores";

export default function useMapeandoProveedores(){
   const {guardarProveedores, state} = useContext(ProveedoresContext)
    useEffect(()=>{
        fetch(`http://localhost:8092/api/v1/proveedores`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('tokenLogin')
            },})
        .then(response =>{
            if(!response.ok){
                throw new Error(response.status)
            }
            return  response.json()
        } )
        .then(data => guardarProveedores(data.object))
        .catch(error=> console.log(error))    
    } ,[state.proveedorCreado, state.proveedorEliminado, state.proveedorEditado])
} 