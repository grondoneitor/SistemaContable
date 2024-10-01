import { useContext } from "react";
import { ProductoContext } from "../context/productos";

export const ServiciosSearch = () => {
    const {  guardarNombreProBuscados,mostrarProductosBuscados } = useContext(ProductoContext);

     const handleSubmit = (e) => {
        e.preventDefault();
        const valores = e.currentTarget;
        const data = new FormData(valores);
        const final = data.get("producto")

       guardarNombreProBuscados(final);
        

         valores.reset(); 
    };
    const handleVolver = ()=>{
      guardarNombreProBuscados("")
      mostrarProductosBuscados([])
  }

    return{ handleSubmit,handleVolver}

};
